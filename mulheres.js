const express = require("express") //aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota

//Aqui estou ligando ao arquivo banco de dados
const conectaBancoDeDados = require('./bancoDeDados');

// Aqui estou chamando a função que conecta o banco de dados
conectaBancoDeDados()

const Mulher = require('./mulherModel')
const app = express() // aqui estou iniciando o app
app.use(express.json())
const porta = 3333 // aqui estou criando a porta

//Get
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro) {
        console.log(erro)
    }
}

//post
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch (erro){
        console.log(erro)
    }
}
//patch
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    }catch (erro){
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({messagem: 'Mulher deletada com sucesso!'})
    }catch (erro){
        console.log(erro)
    }

}

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota delete/mulheres

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ",  porta)
}

app.listen(porta, mostraPorta)