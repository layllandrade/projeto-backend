const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Simara Conceição',
        imagem: 'https://avatars.githubusercontent.com/u/109319620?s=400&u=bd7d953440abbd2f57355aebeb42ad2c09f55a9d&v=4'
    })
}

function mostraPorta() {
    console.log ("Servidor criado e rodando na porta " ,  porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)