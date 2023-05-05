const express = require("express") //aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid');

//Aqui estou ligando ao arquivo banco de dados
const conectaBancoDeDados = require('./bancoDeDados');

// Aqui estou chamando a função que conecta o banco de dados
conectaBancoDeDados()

const app = express() // aqui estou iniciando o app
app.use(express.json())
const porta = 3333 // aqui estou criando a porta

//Get
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//post
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio

    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}
function corrigeMulher(request, response) {
    function encontraMulher(mulher){
        if (mulher.id === request.params.id){
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }
    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response){
    function todasMenosEla(mulher){
        if(mulher.id !== request.params.id){
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota delete/mulheres

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ",  porta)
}

app.listen(porta, mostraPorta)