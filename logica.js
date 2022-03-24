var custoProduto = '';
var taxaLucro = '';

function transformaEmReal(valor) {
    valor = valor.split('.');
    valor[0] = "R$ " + valor[0].split(/(?=(?:...)*$)/).join('.');
    return valor;
}

function checaNumeros(valor, campo) {
    if (isNaN(valor)) {
        document.getElementById(campo).value = "";
        document.getElementById(campo).placeholder = "Digite apenas números!"
        document.getElementById(campo).className = 'caixa-texto-errado fonte-calculadora';
        return true;
    }
    return false;
}

function mudaEstilo(identif) {
    if (identif == 'custo') {
        document.getElementById('custo').placeholder = "Custo do produto (R$):"
    } else {
        document.getElementById('taxa').placeholder = "Taxa de Lucro (%):";
        let taxaLucro = document.getElementById('taxa').value;
        if (taxaLucro != '') {
            document.getElementById('taxa').value = taxaLucro.replace(' %', '');
        }
    }
}

function numberToReal() {
    let valor = document.getElementById('custo').value;
    if (isNaN(valor)) {
        valor = valor.replace('R$ ', '');
        valor = valor.replace('.', '');
    }

    valor = parseFloat(valor.replace(',', '.'));

    if (checaNumeros(valor, 'custo')) {
        return;
    }

    document.getElementById('custo').className = 'caixa-texto fonte-calculadora';
    custoProduto = valor.toFixed(2);
    valor = transformaEmReal(valor.toFixed(2));
    document.getElementById('custo').value = valor;
}

function numberToPercentage() {
    let lucro = document.getElementById('taxa').value;
    lucro = parseFloat(lucro.replace(',', '.')).toFixed(2);
    
    if (checaNumeros(lucro, 'taxa')) {
        return;
    }
    
    document.getElementById('taxa').className = 'caixa-texto fonte-calculadora';
    taxaLucro = lucro;
    lucro = lucro + ' %';
    document.getElementById('taxa').value = lucro;
}

function limparCampos() {
    document.getElementById('custo').value = '';
    document.getElementById('taxa').value = '';
    document.getElementById('preco-venda').innerHTML = 'R$ 0,00';
    document.getElementById('lucro-venda').innerHTML = '0 %';
    document.getElementById('custo').placeholder = "Custo do produto (R$):"
    document.getElementById('taxa').placeholder = "Taxa de Lucro (%):"
    document.getElementById('custo').className = 'caixa-texto fonte-calculadora';
    document.getElementById('taxa').className = 'caixa-texto fonte-calculadora';
    custoProduto = '';
    taxaLucro = '';
}

function calcular() {
    let custo = document.getElementById('custo').value;
    let taxa = document.getElementById('taxa').value;
    if (custo == '' && taxa == '') {
        alert('Preencha os campos de Custo do Produto e Taxa de Lucro!');
        return;
    } else if (custo == '') {
        alert('Preencha o campo de Custo do Produto!');
        return;
    } else if (taxa == '') {
        alert('Preencha o campo de Taxa de Lucro!');
        return;
    } else if (taxaLucro >= 100) {
        alert('A Taxa de Lucro não pode ser maior que 100!');
        return;
    }
    let precoVenda = (custoProduto / (1 - (taxaLucro / 100))).toFixed(2);
    let lucroVenda = parseFloat(precoVenda - custoProduto);
    precoVenda = transformaEmReal(precoVenda);
    lucroVenda = transformaEmReal(lucroVenda.toFixed(2));
    document.getElementById('preco-venda').innerHTML = precoVenda;
    document.getElementById('lucro-venda').innerHTML = lucroVenda;
}