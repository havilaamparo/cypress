const dayjs = require('dayjs')

Cypress.Commands.add('pegarToken', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: usuario,
            senha: senha,
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetar', () => {
    cy.pegarToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}` }
        }).as('response').its('status').should('to.have.equal', 200)
    })
})

Cypress.Commands.add('buscarConta', nomeConta => {
    cy.pegarToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: nomeConta
            }
        }).then(response => {
            return response.body[0].id
        })
    })
})

Cypress.Commands.add('cadastrarMovimentacao', idConta => {
    cy.pegarToken('a@a', 'a').then(token => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/transacoes',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                conta_id: idConta,
                data_transacao: dayjs().format('DD/MM/YYYY'),
                data_pagamento: dayjs().format('DD/MM/YYYY'),
                descricao: "teste",
                envolvido: "eu",
                status: true,
                tipo: "REC",
                valor: 10,

            }
        }).as('response')
        .its('status').should('to.be.equal', 201)
    })
})

Cypress.Commands.add('consultarExtrato',() => {
    cy.pegarToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/extrato/202305',
            headers: { Authorization: `JWT ${token}` },
        }).then(response =>{
            let idMovimentacao = null 

            response.body.forEach(arrayDeMovimentacoes => {
                if(arrayDeMovimentacoes.descricao == 'Movimentacao para exclusao'){
                    idMovimentacao = arrayDeMovimentacoes.id
                    console.log(idMovimentacao)
                }
            })           
            return idMovimentacao
        })     
    })
})
