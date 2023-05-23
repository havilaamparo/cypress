/// <reference types="cypress" />

describe('Testes funcionais do barriga react', () => {

    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.get('[data-test="email"]').type('a@a')
        cy.get('[data-test="passwd"]').type('a')
        cy.get('.btn').click()
        cy.get('.toast-message').should('to.have', 'Bem vindo, a!')
    });

    it('Inserir uma conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('novaConta')
        cy.get('.btn').click()
        cy.get('.toast-success').should('to.have', 'Conta inserida com sucesso!')
    });

    it.only('', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('novaConta')
        cy.get('.btn').click()
        cy.get('.toast-success').should('to.have', 'Conta inserida com sucesso!')
        cy.xpath('//table[@class="table"]/tbody/tr[contains(., "novaConta")]//i[@class="far fa-edit"]')
    });
});