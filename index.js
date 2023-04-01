//express
const express = require("express")
const app = express()

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//porta servidor
const porta = process.env.PORT || 8080
app.listen(porta, function(){
    console.log("SERVIDOR ESTÁ RODANDO NA PORTA: " + porta)
})

//database
const database = require("./models/database")

//urls controller -> controller_detalhes
const controller = require("./controllers/controller")
app.get("/", controller)

//autor
app.post("/add/ator", controller)
app.get("/allAtores", controller)

//filme
app.post("/add/filme", controller)
app.get("/allFilms", controller)

//autor_filme
app.post("/Add/Vinculo", controller)
app.get("/AllVinculos", controller)
app.get("/AllVinculos/:idAtor", controller)