/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands_conta'



describe('Testes funcionais do barriga react', () => {

    beforeEach(() => {
        cy.login('a@a', 'a')
        cy.resetarApp()
    });

    it('Inserir uma conta', () => {
        cy.acessarConta()
        cy.cadastrarConta('NovaConta')
        cy.get(loc.CONTA.MENSAGEM_SUCESSO_CONTA).should('to.have', 'Conta inserida com sucesso!')
    });

    it('Alterar uma conta existente', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('novaConta')
        cy.get('.btn').click()
        cy.get('.toast-success').should('to.have', 'Conta inserida com sucesso!')
        cy.xpath('//table[@class="table"]/tbody/tr[contains(., "novaConta")]//i[@class="far fa-edit"]').click()
        cy.get('[data-test="nome"]').clear().type('conta Alterada')
        cy.wait(3000)
        cy.get('.btn').click()
        cy.get('.animated').should('to.have', 'Conta atualizada com sucesso!')
        
    });

    it('Inserir conta repetida', () => {
        cy.acessarConta()
        cy.cadastrarConta('conta Alterada')
        cy.wait(1000)
        cy.get('[data-test="nome"]').type('conta Alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'status code 400')
    });

    it('Inserir movimentação para conta', () => {
        cy.get('[data-test="menu-movimentacao"]').click()
        cy.get('[data-test="descricao"]').type('nova movimentacao')
        cy.get('[data-test="valor"]').type(100)
        cy.get('[data-test="envolvido"]').type('eu')
        cy.get('[data-test="conta"]').select('Conta para movimentacoes')
        cy.get('[data-test="status"]').click()
        cy.get('.btn-primary').click()
         cy.get('.animated > .toast-message').should('to.have', 'Movimentação inserida com sucesso!')
         cy.xpath('//div[@class="list-group"]//span[contains(., "nova movimentacao")]/following-sibling::small[contains(., 100)]').should('exist')
    });

    it('Verificar saldo de uma conta', () => {
        cy.xpath('//table[@class="table table-hover table-bordered"]/tbody/tr[contains(., "Conta para saldo")]/td/following-sibling::td[contains(., 534)]')
    });

    it('Excluir uma movimentação', () => {
        cy.get('[data-test="menu-extrato"] > .fas').click()
        cy.xpath(loc.EXTRATO.BTN_EXCLUIR('Movimentacao para exclusao')).click()
        cy.get(':nth-child(1) > .toast-message').should('to.have', 'Movimentação removida com sucesso!')
        
    });


});