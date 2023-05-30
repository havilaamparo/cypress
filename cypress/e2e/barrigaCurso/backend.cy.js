/// <reference types="cypress" />
const dayjs = require('dayjs')

import loc from '../../support/locators'
import '../../support/commands_backend'




describe('Testes funcionais do barriga react', () => {

    let token
    before(() => {

        cy.pegarToken('a@a', 'a')
            .then(tok => {
                token = tok
            })
    });

    beforeEach(() => {
        cy.resetar()
    })

    it('Inserir uma conta', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'teste'
            }
        }).as('response').its('status').should('to.be.equal', 201)

        cy.get('@response').then(resposta => {
            expect(resposta.status).to.be.equal(201)
        })
    })

    it.only('Alterar uma conta existente', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(response => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${response.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'teste'
                }

            })
            expect(response.status).to.be.equal(200)
        })
        
    })

    it('Inserir conta repetida', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response').its('status').should('to.be.equal', 400)

        cy.get('@response').then(resposta => {
            expect(resposta.status).to.be.equal(400)
        })

    });

    it('Inserir movimentação para conta', () => {
        cy.buscarConta('Conta para movimentacoes').then(contaId => {
            cy.cadastrarMovimentacao(contaId)
            .as('response').its('status').should('to.be.equal', 201)

            cy.get('@response').then(r=>{
                expect(r.status).to.be.equal(201)
            })
        })
    });

    it('Verificar saldo de uma conta', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}` }
        }).then(response => {
            let saldoConta = null
            response.body.forEach(arrayDeContas => {
                if (arrayDeContas.conta == 'Conta para saldo') {
                    saldoConta = arrayDeContas.saldo
                    console.log(saldoConta)
                }
            })
            expect(response.status).to.be.equal(200)
            expect(saldoConta).to.be.equal('534.00')
        })
    });

    it('Excluir uma movimentação', () => {

        cy.consultarExtrato().then((idMov) => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${idMov}`,
                headers: { Authorization: `JWT ${token}` }
            }).as('response').its('status').should('to.have.equal', 204)

            cy.get('@response').then(r=>{
                expect(r.status).to.be.equal(204)
            })
        })
    })
})