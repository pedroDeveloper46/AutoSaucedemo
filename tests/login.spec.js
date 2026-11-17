import {test, expect} from '@playwright/test'
import { realizarLogin, obterProdutos } from './desafios_page.js'
import { pegarProdutoMaisBarato, pegarQuantidadeProdutos, pegarProdutoMaisCaro, mediaPrecos } from './desafios_negocio.js'

test('Logando no Saucedemo', async ({ page }) =>{

   await realizarLogin(page)
     
})

test('Obtendo Produtos', async ({ page }) =>{

   await realizarLogin(page)

   const produtos = await obterProdutos(page)

   const produtoMaisCaro = pegarProdutoMaisCaro(produtos)

   mediaPrecos(produtos)

   pegarProdutoMaisBarato(produtos,produtoMaisCaro)

   pegarQuantidadeProdutos(produtos)
    
 
})



