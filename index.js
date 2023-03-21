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

//pedido <->  produto
app.get("/GetPedidosProdutos/:id_produto", function(req, res){
    let id_produto = req.params.id_produto //Celular Samsung 

    database.all(`select produto.nome, pedido.id_pedido, pedido.total, pedido.dataPedido, pedido.titular  
    from produto
    full join pedido_detalhes on pedido_detalhes.id_produto = produto.id_produto 
    full join pedido on pedido_detalhes.id_pedido = pedido.id_pedido
    where produto.id_produto = "${id_produto}"`, 
    function(erro, relatorio){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            res.send(relatorio)
        }
    })

})

app.get("/geral", function(req, res){
    
    database.all(`select produto.nome, pedido.id_pedido, pedido.total, pedido.dataPedido, pedido.titular  
    from produto
    full join pedido_detalhes on pedido_detalhes.id_produto = produto.id_produto 
    full join pedido on pedido_detalhes.id_pedido = pedido.id_pedido`, 
    function(erro, relatorio){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            res.send(relatorio)
        }
    })

})



//urls pedido -> pedido_detalhes
const pedido = require("./controllers/pedido")
app.get("/", pedido)
app.get("/Pedido/:id_pedido", pedido)
app.post("/createPedido", pedido)