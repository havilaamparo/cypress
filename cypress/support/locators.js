const loc = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn',
        MENSAGEM_SUCESSO_LOGIN: '.toast-message'

    },
    MENU: {
        SETTING: '[data-test="menu-settings"]',
        SETTING_CONTA: '[href="/contas"]',
        SETTING_RESET: '[href="/reset"]'
    },
    CONTA:{
        CONTA_NOME: '[data-test="nome"]',
        BTN_CONTA: '.btn',
        MENSAGEM_SUCESSO_CONTA: '.toast-success'
    }
}

export default loc;