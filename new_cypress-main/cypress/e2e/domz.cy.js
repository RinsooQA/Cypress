import * as main from "../locators/main.json";
import * as recovery from "../locators/recovery_pass.json"
import * as result from "../locators/result.json"
import * as data from "../data/default_data.json"
import * as text from "../data/text.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () { 
         cy.visit('https://login.qa.studio');
           })

   it('Верный пароль и верный логин', function () {
        cy.get(main.email).type(data.login);
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.successful_authorization);
        cy.get(result.close).should('be.visible');
    })

    it('Восстановление пароля', function () {
        cy.get(main.forgot_email_button).click();
        cy.get(recovery.email).type(data.login);
        cy.get(recovery.send_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.send_pass);
        cy.get(result.close).should('be.visible');
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main.email).type(data.login);
        cy.get(main.password).type(data.incorrect_password);
        cy.get(main.login_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.incorrect_data);
        cy.get(result.close).should('be.visible');
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main.email).type(data.incorrect_login);
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.incorrect_data);
        cy.get(result.close).should('be.visible');
    })

    it('Валидация на наличие @', function () {
        cy.get(main.email).type(data.invalid_login);
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.validation_problem);
    })

     it('Приведение к строчным буквам в логине', function () {
        cy.get(main.email).type('GerMan@Dolnikov.ru');
        cy.get(main.password).type(data.password);
        cy.get(main.login_button).click();
        cy.get(result.title).should('be.visible');
        cy.get(result.title).contains(text.successful_authorization);
        cy.get(result.close).should('be.visible');
    })
})
