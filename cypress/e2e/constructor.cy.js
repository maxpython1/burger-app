/// <reference types="cypress" />

const API = "https://norma.education-services.ru/api";

const SELECTORS = {
  ingredientsWrapper: '[class^="BurgerIngredients_wrapper"]',
  constructorWrapper: '[class^="BurgerConstructor_wrapper"]',
  constructorIngredients: 'ul[class^="BurgerConstructor_ingredients"]',
  modalsRoot: "#react-modals",
  modalClose: '[class*="close"]'
};

const TEST_DATA = {
  bun: "Булка тестовая",
  main: "Начинка тестовая",
  orderNumber: "12345"
};

function dragIngredientToConstructor(ingredientName, dropSelector) {
  const dataTransfer = new DataTransfer();

  cy.get(SELECTORS.ingredientsWrapper)
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
        win.document.cookie = `token=${encodeURIComponent("Bearer test-access-token")}; path=/`;
      }
    });

    cy.wait("@getIngredients");
    cy.wait("@getUser");
  });

  it("открывает и закрывает модалку ингредиента + показывает данные", () => {
    cy.contains("Булка тестовая").click();

    cy.contains("Детали ингредиента").should("exist");
    cy.get(SELECTORS.modalsRoot).contains("Булка тестовая").should("exist");

    cy.get(SELECTORS.modalsRoot).contains("Калории, ккал").should("exist");
    cy.get(SELECTORS.modalsRoot).contains("200").should("exist");

    cy.get(`${SELECTORS.modalsRoot} ${SELECTORS.modalClose}`).click();
    cy.get(SELECTORS.modalsRoot).should("be.empty");
  });

  it("перетаскивает ингредиенты, создаёт заказ, открывает/закрывает модалку заказа", () => {
    dragIngredientToConstructor("Булка тестовая", SELECTORS.constructorWrapper);

    cy.get(SELECTORS.constructorWrapper).contains("Булка тестовая (верх)");
    cy.get(SELECTORS.constructorWrapper).contains("Булка тестовая (низ)");

    dragIngredientToConstructor(
      "Начинка тестовая",
      SELECTORS.constructorIngredients
    );

    cy.get(SELECTORS.constructorWrapper).contains("Начинка тестовая");

    cy.contains("Оформить заказ").click();

    cy.wait("@createOrder");

    cy.get(SELECTORS.modalsRoot).contains("12345").should("exist");
    cy.get(SELECTORS.modalsRoot)
      .contains("идентификатор заказа")
      .should("exist");

    cy.get(`${SELECTORS.modalsRoot} ${SELECTORS.modalClose}`).click();
    cy.get(SELECTORS.modalsRoot).should("be.empty");

    cy.get(SELECTORS.constructorWrapper).should(
      "not.contain",
      "Булка тестовая (верх)"
    );
  });
});
