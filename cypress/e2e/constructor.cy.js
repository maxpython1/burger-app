/// <reference types="cypress" />

const API = "https://norma.education-services.ru/api";

function dragIngredientToConstructor(ingredientName, dropSelector) {
  const dataTransfer = new DataTransfer();

  cy.get('[class^="BurgerIngredients_wrapper"]')
    .contains(ingredientName)
    .closest("article")
    .trigger("dragstart", { dataTransfer, force: true });

  cy.get(dropSelector)
    .trigger("dragover", { dataTransfer, force: true })
    .trigger("drop", { dataTransfer, force: true });
}

describe("Страница Конструктор", () => {
  beforeEach(() => {
    cy.intercept("GET", `${API}/ingredients`, {
      fixture: "ingredients.json"
    }).as("getIngredients");
    cy.intercept("GET", `${API}/auth/user`, { fixture: "user.json" }).as(
      "getUser"
    );
    cy.intercept("POST", `${API}/orders`, { fixture: "order.json" }).as(
      "createOrder"
    );

    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("refreshToken", "test-refresh-token");
        win.document.cookie = "token=Bearer test-access-token";
      }
    });

    cy.wait("@getIngredients");
    cy.wait("@getUser");
  });

  it("открывает и закрывает модалку ингредиента + показывает данные", () => {
    cy.contains("Булка тестовая").click();

    cy.contains("Детали ингредиента").should("exist");
    cy.get("#react-modals").contains("Булка тестовая").should("exist");

    cy.get("#react-modals").contains("Калории, ккал").should("exist");
    cy.get("#react-modals").contains("200").should("exist");

    cy.get('#react-modals [class*="close"]').click();
    cy.get("#react-modals").should("be.empty");
  });

  it("перетаскивает ингредиенты, создаёт заказ, открывает/закрывает модалку заказа", () => {
    dragIngredientToConstructor(
      "Булка тестовая",
      '[class^="BurgerConstructor_wrapper"]'
    );

    cy.get('[class^="BurgerConstructor_wrapper"]').contains(
      "Булка тестовая (верх)"
    );
    cy.get('[class^="BurgerConstructor_wrapper"]').contains(
      "Булка тестовая (низ)"
    );

    dragIngredientToConstructor(
      "Начинка тестовая",
      'ul[class^="BurgerConstructor_ingredients"]'
    );

    cy.get('[class^="BurgerConstructor_wrapper"]').contains("Начинка тестовая");

    cy.contains("Оформить заказ").click();

    cy.wait("@createOrder");

    cy.get("#react-modals").contains("12345").should("exist");
    cy.get("#react-modals").contains("идентификатор заказа").should("exist");

    cy.get('#react-modals [class*="close"]').click();
    cy.get("#react-modals").should("be.empty");

    cy.get('[class^="BurgerConstructor_wrapper"]').should(
      "not.contain",
      "Булка тестовая (верх)"
    );
  });
});
