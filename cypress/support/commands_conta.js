
import loc from './locators'

Cypress.Commands.add('acessarConta', ()=>{
    cy.get(loc.MENU.SETTING).click()
    cy.get(loc.MENU.SETTING_CONTA).click()
})

Cypress.Commands.add('cadastrarConta', (nomeConta) => {
    cy.get(loc.CONTA.CONTA_NOME).type(nomeConta)
    cy.get(loc.CONTA.BTN_CONTA).click()
})