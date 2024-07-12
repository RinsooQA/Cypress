import * as pok_data from "../pok_data/data.json";



describe ('Покупка аватара', function () {      

   it ('Покупка нового аватара для тренера', function () {   //название теста
   
        cy.visit('https://pokemonbattle.ru/');                          //переходим на сайт https://pokemonbattle.ru/

        cy.get('input[type="email"]').type(pok_data.login);      //вводим логин
        cy.get('input[type="password"]').type(pok_data.password);    //вводим пароль
        cy.get('.auth__button').click();                        //нажимаем кнопку Подтвердить
        cy.get('[class="header__btn"]').click();              //нажимаем кнопку Магазин
        cy.get('.available > button').first().click();                  //кликаем по кнопке Купить у первого доступного аватара
        cy.get('.credit').type('4111111111111111');                     //вводим номер карты
        cy.get('.k_input_ccv').type('125');                              //вводим CVV карты
        cy.get('.k_input_date').type('1225');                        //вводим срок действия карты
        cy.get('.k_input_name').type('RINSOO');                            //вводим имя владельца действия карты
        cy.get('.pay-btn').click();                                     //нажимаем кнопку Оплатить
        cy.get('#cardnumber').type('56456');                            //вводим код подтверждения СМС
        cy.get('.payment__submit-button').click();                      //нажимаем кнопку Отправить
        cy.get('.payment__padding').contains('Покупка прошла успешно').should('be.visible');     //проверяем наличие и видимость сообщения о успешной покупке
    });
});