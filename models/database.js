//sqlite3
const sqlite3 = require("sqlite3")
const database = new sqlite3.Database("./models/pedido.db", function(){
    console.log("BANCO CONECTADO/CRIADO")
})

module.exports = database