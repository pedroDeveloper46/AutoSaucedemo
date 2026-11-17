export function mediaPrecos(produtos) {

    let mediaProdutos = 0.0
    
    produtos.forEach(produto => {
        mediaProdutos += produto.preco
    });

    mediaProdutos = mediaProdutos / produtos.length;

    console.log(`Média final produtos: ${mediaProdutos}`)

}

export function pegarProdutoMaisCaro(produtos) {

    let produtoMaisCaro = {nome: '', preco: 0.0}

    produtos.forEach(produto => {

        console.log('')
        console.log(`Descrição: ${produto.nome}`)
        console.log(`Preço: ${produto.preco}`)
        
        if (produto.preco > produtoMaisCaro.preco) {
            produtoMaisCaro.nome = produto.nome
            produtoMaisCaro.preco = produto.preco;
        }    
    });

    console.log('')
    console.log(`O Produto mais caro é o ${produtoMaisCaro.nome} custando ${produtoMaisCaro.preco}`)
    console.log('')

    return produtoMaisCaro
    
}

export function pegarQuantidadeProdutos(produtos){

    return produtos.length
}

export function pegarProdutoMaisBarato(produtos, produtoMaisCaro) {

    let produtoBarato = {nome: '', preco: produtoMaisCaro.preco}

    produtos.forEach(produto => {
        
        if (produto.preco < produtoBarato.preco) {
            produtoBarato.preco = produto.preco
            produtoBarato.nome = produto.nome
        }

    });

    console.log(`Produto mais barato : ${produtoBarato.nome}, Preço: ${produtoBarato.preco}`)

    return produtoBarato
    
}

export function calcularTotalPreco(produtos){

    let total = 0.0
    produtos.forEach(element => {
        total += element.preco;
    });

    return Number(total.toFixed(2));

}

export function gerarResumo(produtos){

    let objMaisCaro = pegarProdutoMaisCaro(produtos)

    let resumoProdutos = {
        quantidade: pegarQuantidadeProdutos(produtos),
        total: calcularTotalPreco(produtos),
        maisCaro: pegarProdutoMaisCaro(produtos),
        maisBarato: pegarProdutoMaisBarato(produtos, objMaisCaro)
    }

    return resumoProdutos;
}

export function gerarResumoCompra(produtos, taxa, totalFinal){
    
    let resumo = {
        quantidadesProdutos: produtos.length, 
        taxaCompra: taxa, 
        subTotal: totalFinal - taxa,
        total: totalFinal
    }

    return resumo;
}