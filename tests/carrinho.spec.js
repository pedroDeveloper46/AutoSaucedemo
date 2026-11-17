import {test, expect} from '@playwright/test'
import { abrirCheckout, finalizarCheckout, realizarLogin, verificarCarrinhoPopulado } from './desafios_page.js'
import { obterProdutos } from './desafios_page.js'
import { adicionarProdutosCarrinho } from './desafios_page.js'
import { obterProdutosCarrinho } from './desafios_page.js'
import { calcularTotalPreco, gerarResumo } from './desafios_negocio.js'



test('Adicionando produtos no carrinho', async ({page}) =>{

    await realizarLogin(page)

    const produtos = await obterProdutos(page)

    const quant = await adicionarProdutosCarrinho(page)

    await verificarCarrinhoPopulado(page, quant)

})

test('Validar produtos no carrinho', async ({page}) =>{
  
    await realizarLogin(page)

    const produtos = await obterProdutos(page)

    const quant = await adicionarProdutosCarrinho(page)

    await verificarCarrinhoPopulado(page, quant)

    await obterProdutosCarrinho(page, produtos)

    const resumoProdutos = gerarResumo(produtos)

    console.log(resumoProdutos)
    

})

test('Abrir e finalizar Checkout', async ({page}) =>{
    
    await realizarLogin(page)

    const produtos = await obterProdutos(page)

    const quant = await adicionarProdutosCarrinho(page)

    await verificarCarrinhoPopulado(page, quant)

    await obterProdutosCarrinho(page, produtos)
 
    await abrirCheckout(page)

    await finalizarCheckout(page, produtos)
})