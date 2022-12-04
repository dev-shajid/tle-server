const express = require("express")
// require("./db/connect")()

const app = express()
const port = process.env.PORT || 8000

// app.use("/api", require('./routes/auth'))
app.use("/api", require("./routes/duel"))

app.listen(port, ()=> console.log(`Server is listening at http://localhost:${port}`))