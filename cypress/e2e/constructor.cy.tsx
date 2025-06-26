import Cypress from 'cypress';

describe('Конструктор бургера', () => {

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  describe('Добавление булок и основной ингредиент', () => {

    it('Добавление булок и основной ингредиент', () => {

      const $constructor = () => cy.get('[data-cy=constructor]');

      cy.request('/api/ingredients');

      cy.get(`[data-cy=bun] > .common_button`).eq(1).click();
      cy.get(`[data-cy=main] > .common_button`).eq(3).click();

      $constructor()
        .find('.constructor-element_pos_top')
        .should('contain', 'Флюоресцентная булка R2-D3 (верх)');

      $constructor()
        .find('ul li .constructor-element__text')
        .should('contain', 'Говяжий метеорит (отбивная)');

      $constructor()
        .find('.constructor-element_pos_bottom')
        .should('contain', 'Флюоресцентная булка R2-D3 (низ)');

    });
  });

  describe('Открытие модального окна ингредиента', () => {

    it('Открываем', () => {
      cy.get(`[data-cy=bun]`).eq(1).click();

      const modal = cy.get('#modals > div:first-child');
      const header = modal.get('div:first-child > h3');

      header.contains('Флюоресцентная булка R2-D3');
    });

    it('Закрываем на крестик', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      modal.get('div:first-child > button > svg').click();

      cy.get('modal').should('not.exist');
    });

    it('Закрываем нажатием вне модалки', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      const overlay = modal.get('#modals > div:nth-child(2)');

      overlay.click({ force: true });

      cy.get('modal').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {

    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'orders.json' });
      window.localStorage.setItem('refreshToken', 'fi5327tgekw');
      cy.setCookie('accessToken', '3f592dsa87');
    });

    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
    });

    it('Процесс оформления заказа', () => {
      cy.get(`[data-cy=bun] > .common_button`).eq(1).click();
      cy.get(`[data-cy=main] > .common_button`).eq(3).click();

      cy.get(`[data-cy=order-button]`).click();

      cy.get('#modals > div:first-child').find('h2').contains('82062');

      cy.get(`[data-cy=constructor]`).within(() => {
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
      });
    });
  });
});
