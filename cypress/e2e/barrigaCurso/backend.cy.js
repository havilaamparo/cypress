/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands_conta'



describe('Testes funcionais do barriga react', () => {

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "a@a",
                senha: "a",
                redirecionar: false
            }
        }).its('body.token2').should('not.be.empty')
        // then(response=>{
        //     console.log(response)
        // })
    });

    it('Inserir uma conta', () => {

    });

    it('Alterar uma conta existente', () => {

    });

    it('Inserir conta repetida', () => {

    });

    it('Inserir movimentação para conta', () => {

    });

    it('Verificar saldo de uma conta', () => {

    });

    it('Excluir uma movimentação', () => {


    });


})