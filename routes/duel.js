const express = require("express")
const router = express.Router()
const fetch = require("node-fetch");

const users = ["dev_shajid", "ovi_xar"]
const CF_URL = "https://codeforces.com/api"


router.get("/duel/new", async (req, res) => {
    try {
        // const problemSet = await findSubmissions(["dev_shajid", "ovi_xar"], 800)
        const data = await createProblem(["dev_shajid", "ovi_xar"], 800)

        const link = `https://codeforces.com/problemset/problem/${data.contestId}/${data.index}`

        res.status(200).json({ link })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router

//TODO: find all submission of all user
const findSubmissions = async (users, rating) => {
    var subs = [];

    for (let i = 0; i < users.length; i++) {
        const re = await fetch(`${CF_URL}/user.status?handle=${users[i]}`)
        let data = await re.json()
        data = data.result.filter(p => p.problem.rating == rating)
        subs = [...subs, ...data]
    }

    const message = subs.filter((v, i, a) => a.findIndex(v2 => (v2.problem.name === v.problem.name)) === i)
    return message
}

// TODO: Create a problem
const createProblem = async (users, rating) => {
    var problemSet = [];

    for (let i = 0; i < users.length; i++) {
        const re = await fetch(`${CF_URL}/user.status?handle=${users[i]}`)
        let d = await re.json()
        d = d.result.filter(p => p.problem.rating == rating)
        problemSet = [...problemSet, ...d]
    }

    const message = problemSet.filter((v, i, a) => a.findIndex(v2 => (v2.problem.name === v.problem.name)) === i)
    // Set of submission already done 

    const problems = await fetch(`${CF_URL}/problemset.problems`)
    let data = await problems.json()
    data = data.result.problems.filter(p => p.rating == rating)

    for (let i = 0; i < problemSet.length; i++) {
        data = data.filter(e => e.name != problemSet[i].problem.name)
    }

    return data[Math.floor(Math.random() * data.length)];
}