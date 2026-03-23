/* *********************************************************************
* Objetivo: Gerar novos retornos de dados, com base na manipulação dos dados da API open_alex.js
* Data: 18/03/2026  
* Autor: Lucas Alexandre Da Silva
* **********************************************************************/

// Import do arquivo open-alex.js
const dadosOpenAlex = require ('./open-alex')

// Crio uma variável para acessar os dados de metadados científicos
const listaDadosOpen = dadosOpenAlex.openAlex


// -------------- | FUNÇÕES AUXILIARES | -------------- 

// Função que retona a exibição do retorno padrão API erro
const mensagemErro = function(mensagem, dados){

    let erro ={
        
        success: false,
        message: mensagem,
        data   : null,
        errors : dados
    }

    return erro
}


// Função que retorna a exibição do retorno padrão API correta
const mensagemSucesso = function(mensagem, dados){

    let sucesso ={
        
        success: true,
        message: mensagem,
        data   : dados,
        errors : null
    }

    return sucesso
}


// -------------- | FUNÇÕES DO PROJETO | -------------- 

// Função que retorna a lista de artigos cientificos
const getListaArtigos = function(){

    let resultado   = null
    let erro        = null
    let dadosArtigo = []
    
    listaDadosOpen.results.forEach(function(itemResultadoArtigo){
        
        dadosArtigo.push(
            {
                titulo: itemResultadoArtigo.display_name,
                ano   : itemResultadoArtigo.publication_year,
                data  : itemResultadoArtigo.publication_date
            }
        )
    })
     
    erro = mensagemErro('Nenhum Artigo foi Encontrado', ['Lista Vazia'])

    if(dadosArtigo.length == 0){
        return erro
    }

    resultado = mensagemSucesso(
        'Lista de Artigos carregada com Sucesso', 
        {
            artigos   : dadosArtigo,
            quantidade: dadosArtigo.length
        }
    )

    return resultado
}

//console.log(getListaArtigos())

const getListaArtigos2 = function(){

    let resultado   = null
    let dadosArtigo = []
    
    listaDadosOpen.results.forEach(function(itemResultadoArtigo){
        
        dadosArtigo.push(
            {
                titulo: itemResultadoArtigo.display_name,
                ano   : itemResultadoArtigo.publication_year,
                data  : itemResultadoArtigo.publication_date
            }
        )
    })

    if(dadosArtigo.length == 0){
        return false
    }

    resultado = {
        artigo    : dadosArtigo,
        quantidade: dadosArtigo.length 
    }
    
    return resultado
}

//console.log(getListaArtigos2())
