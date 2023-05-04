const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const app = express()
app.use(express.json())
const porta = 3333

const mulheres = [
    {
        id: '1',
        nome: 'Simara Conceição',
        imagem: 'https://avatars.githubusercontent.com/u/109319620?s=400&u=bd7d953440abbd2f57355aebeb42ad2c09f55a9d&v=4',
        minibio: 'lorem impsujm'
    }, 
    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'https://avatars.githubusercontent.com/u/109319620?s=400&u=bd7d953440abbd2f57355aebeb42ad2c09f55a9d&v=4',
        minibio: 'lorem lorem'
    }, 
    {
        id:'3',
        nome: 'Lalala',
        imagem: 'https://avatars.githubusercontent.com/u/109319620?s=400&u=bd7d953440abbd2f57355aebeb42ad2c09f55a9d&v=4',
        minibio: 'lorem lorem iu'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}


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