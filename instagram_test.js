const fs = require("fs")

fs.readFileSync("teste.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data)
})