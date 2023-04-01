//express
const express = require("express")
const controller = express.Router()

//database
const database = require("../models/database")

//geral
controller.get("/", function(req, res){
    res.send("bem vindo")
})


//autor
controller.post("/add/ator", function(req, res){

    let nome_ator = req.body.nome_ator

    database.run(`insert into ator (nome_ator) values("${nome_ator}")`, function(erro){
        if(erro){
            console.log(erro)
        }
        else{
            res.redirect("/allAtores")
        }
    })
})

controller.get("/allAtores", function(req, res){
    database.all(`select * from ator`, function(erro, ator){
        res.send(ator)
    })
})

//filme
controller.post("/add/filme", function(req, res){

    let filme = req.body.filme

    database.run(`insert into filme (filme) values("${filme}")`, function(erro){
        if(erro){

        }
        else{
            res.redirect("/allFilms")
        }
    })
})

controller.get("/allFilms", function(req, res){
    database.all(`select * from filme`, function(erro, filme){
        res.send(filme)
    })
})

//vinculo
controller.post("/Add/Vinculo", function(req, res){
    let id_ator = req.body.id_ator
    let id_filme = req.body.id_filme

    database.run(`insert into filme_ator (id_ator, id_filme) values("${id_ator}", "${id_filme}")`, 
    function(erro){
        if(erro){
            console.log(erro)
        }
        else{
            res.redirect("/AllVinculos")
        }
    })
})

controller.get("/AllVinculos", function(req, res){
    database.all(`select * from filme_ator join ator on ator.id = filme_ator.id_ator
    join filme on filme.id = filme_ator.id_filme`, function(erro, result){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(result)
        }
    })
})

controller.get("/AllVinculos/:idAtor", function(req, res){

    let ator = req.params.idAtor

    database.all(`select * from filme_ator join ator on ator.id = filme_ator.id_ator
    join filme on filme.id = filme_ator.id_filme where ator.id = "${ator}"`, function(erro, result){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(result)
        }
    })
})

module.exports = controller