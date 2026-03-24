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

// Função responsável por retonar a exibição do retorno padrão API erro
const mensagemErro = function(mensagem, dados){

    let erro ={
        
        success: false,
        message: mensagem,
        data   : null,
        errors : dados
    }

    return erro
}


// Função responsável por retornar a exibição do retorno padrão API correta
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

// Função responsável por retornar a lista de artigos cientificos
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

    if(dadosArtigo.length === 0){
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

    if(dadosArtigo.length === 0){
        return false
    }

    resultado = {
        artigo    : dadosArtigo,
        quantidade: dadosArtigo.length 
    }
    
    return resultado
}

//console.log(getListaArtigos2())


// Função responsável por retornar os dados do Artigo, usando como filtro o 'Título'
const getArtigoPorTitulo = function(nomeTitulo){

    let resultado    = null
    let erro         = null
    let listaAutores = []

    listaDadosOpen.results.forEach(function(itemResultadoArtigo){

        if(String(nomeTitulo).trim().toLowerCase() == String(itemResultadoArtigo.title).trim().toLowerCase()){

            resultado = {
                filtro : nomeTitulo,
                id     : 1,
                titulo : itemResultadoArtigo.title,
                ano    : itemResultadoArtigo.publication_year
            }

            itemResultadoArtigo.authorships.forEach(function(itemResultadoAutores){
                listaAutores.push(itemResultadoAutores.author.display_name)
            })
        }
    })

    erro = mensagemErro('Nenhum título de Artigo foi encontrado', '(nomeTitulo) do parâmetro da função')

    if(resultado === null || listaAutores.length === 0){
        return erro
    }

    resultado.autores = listaAutores

    resultado = mensagemSucesso('Lista de Artigo por Titulo carregada', resultado)

    return resultado
}


// Função responsável por retornar todos os títulos das obras
const getTitulos = function(){

    let resultado   = null
    let erro        = null
    let listaTitulo = []

    listaDadosOpen.results.forEach(function(itemResultadoArtigo){
        listaTitulo.push(itemResultadoArtigo.title)
    
    })

    erro = mensagemErro('Nenhum Título encontrado', ['Lista Vazia'])

    if(listaTitulo.length === 0){
        return erro
    }

    resultado = {
        quantidade: listaTitulo.length,
        dados     : listaTitulo 
    }

    resultado = mensagemSucesso('Lista de Títulos carregada', resultado)

    return resultado
}


// Função responsável por retornar uma lista de instituições vinculadas a um artigo
const getInstituicoesPorArtigo = function(nomeArtigo){

    let resultado         = null
    let listaInstituicao  = []

    listaDadosOpen.results.forEach(function(itemResultado){
        
        if(String(nomeArtigo).trim().toLowerCase() == String(itemResultado.title).trim().toLowerCase()){
            
            itemResultado.institutions.forEach(function(itemInstituicao){
                listaInstituicao.push(itemInstituicao)
            })
        }
    })

    resultado = {
        filtro : nomeArtigo,
        quantidade: listaInstituicao.length,
        dados: listaInstituicao
    }

    return resultado 
}


console.log(getInstituicoesPorArtigo('Radiation Resistant Camera System for Monitoring Deuterium Plasma Discharges in the Large Helical Device'))