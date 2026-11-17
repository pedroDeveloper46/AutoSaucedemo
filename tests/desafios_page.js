import { expect } from "@playwright/test"
import { calcularTotalPreco, gerarResumoCompra } from "./desafios_negocio"

export async function realizarLogin(page) {

    await page.goto('https://www.saucedemo.com/')

    await page.fill('[data-test="username"]', 'standard_user')
    await page.fill('[data-test="password"]', 'secret_sauce')

    await page.click('[data-test="login-button"]')

    await expect(page).toHaveURL(/inventory.html/);

}

export async function obterProdutos(page) {

    let produtos = []

    let produtoMaisCaro = { nome: '', preco: 0.0 }

    await expect(page.locator('.inventory_list')).toBeVisible();

    const nomes = await page.locator('.inventory_item_name').allTextContents();
    const precos = await page.locator('.inventory_item_price').allTextContents();

    for (let index = 0; index < nomes.length; index++) {

        produtos.push(
            {
                nome: nomes[index],
                preco: Number(precos[index].replace('$', ''))
            })

    }


    console.log(`Quantidade de produtos: ${produtos.length}`)



    return produtos

}

export async function adicionarProdutosCarrinho(page) {

    const botoes = page.locator(
        '[data-test^="add-to-cart"]'
    );

    const quantidade = await botoes.count();

    for (let i = 0; i < quantidade; i++) {

        await page.locator(
            '[data-test^="add-to-cart"]'
        ).first().click();

    }

    console.log(`${quantidade} Produtos adicionados no carrinho`)

    return quantidade


}

export async function verificarCarrinhoPopulado(page, quantidade) {

    console.log('Verificando se o carrinho está com produto')

    await expect(page.locator('.shopping_cart_badge')).toBeVisible();

    const quant = await page.locator('.shopping_cart_badge').textContent()

    if (Number(quant) === quantidade) {
        console.log('Carrinho populado com sucesso!')
    }

}


export async function obterProdutosCarrinho(page, produtos) {

    console.log('Entrando no carrinho...')

    await page.click('.shopping_cart_link')

    await expect(page.locator('.cart_list')).toBeVisible();

    const nomes = await page.locator('.inventory_item_name').allTextContents();

    const precos = await page.locator('.inventory_item_price').allTextContents();

    let produtosCarrinho = []

    for (let index = 0; index < nomes.length; index++) {
       
        produtosCarrinho.push(
            {
                nome: nomes[index],
                preco: Number(precos[index].replace('$', ''))
            })
    }

    if (produtosCarrinho.length === produtos.length) {

        for (let index = 0; index < produtos.length; index++) {

            expect(produtos[index].nome).toBe(produtosCarrinho[index].nome)
            expect(produtos[index].preco).toBe(produtosCarrinho[index].preco)

        }

    }else{
        console.error('Algo deu errado na validação do carrinho')
    }






}

export async function abrirCheckout(page) {

    console.log('Checkout Iniciado!')
    
    await page.click('[data-test="checkout"]')
}

export async function finalizarCheckout(page, produtos) {

    preencherInfoCheckout(page)

    console.log('Informações populadas para o checkout!')

    await page.click('[data-test="continue"]')

    await expect(page.locator('.cart_list')).toBeVisible();

    console.log('Overview do Checkout aberto');

    const subTotalTela = await obterSubTotalTela(page)

    const subTotalCalculcado = calcularTotalPreco(produtos)

    expect(subTotalTela).toBe(subTotalCalculcado);

    console.log('O preço de subTotal está batendo')

    const taxaTela = await pegarTaxaTotal(page)

    const totalTela = await pegarTotalTela(page)

    const totalEsperado = subTotalTela + taxaTela

    expect(totalTela).toBe(totalEsperado);

    console.log('O SubTotal está batendo')

    await page.click('[data-test="finish"]')
    
    await expect(page.locator('.complete-header')).toBeVisible();

    console.log('Checkout finalizado!')

    console.log('Gerando resumo...')

    let resumo = gerarResumoCompra(produtos, taxaTela, totalTela)

    console.log(resumo)
    
    
}

async function obterSubTotalTela(page) {

    let texto = await page.locator('.summary_subtotal_label').textContent();

    let subTotal = Number(texto.replace('Item total: $', ''))

    return subTotal

    
}

async function pegarTaxaTotal(page) {

    let texto = await page.locator('.summary_tax_label').textContent();

    let taxa = Number(texto.replace('Tax: $', ''))

    return taxa
    
}

async function pegarTotalTela(page) {
 
    let texto = await page.locator('.summary_total_label').textContent();

    let total = Number(texto.replace('Total: $', ''))

    return total
}

async function preencherInfoCheckout(page) {
   
    await expect(page.locator('.checkout_info_container')).toBeVisible();

    await page.fill('[data-test="firstName"]', 'Pedro')

    await page.fill('[data-test="lastName"]', 'Cavalcante')
   
    await page.fill('[data-test="postalCode"]', '05116000')
}