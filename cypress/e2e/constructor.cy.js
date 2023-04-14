

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("dashboard");
    cy.viewport(1280, 1024);
  });

  it("should open ingredients details", () => {
    cy.intercept(`https://norma.nomoreparties.space/api/ingredients`).as(
      "getIngredients"
    );
    cy.wait("@getIngredients");
    cy.get("a").contains("Соус традиционный галактический").click();
    cy.get("[class^=modal_container_]").should("be.visible");
    cy.get("[class^=modal_closeIcon_]").click();
    cy.get("[class^=modal_container_]").should("not.exist");
  });

  it("should drag ang drop ingredients", () => {
    
    cy.intercept(`https://norma.nomoreparties.space/api/ingredients`).as(
      "getIngredients"
    );
    cy.wait("@getIngredients");

    const dataTransfer = new DataTransfer();
    cy.get("a")
      .contains("Краторная булка")
      .trigger("dragover", { dataTransfer });
    cy.get("a").contains("Краторная булка").trigger("drag", { dataTransfer });
    cy.get("[class^=burger-constructor_section_]").trigger("drop", {
      dataTransfer,
    });

    cy.get("a")
      .contains("Соус фирменный")
      .trigger("dragover", { dataTransfer });
    cy.get("a").contains("Соус фирменный").trigger("drag", { dataTransfer });
    cy.get("[class^=burger-constructor_section_]").trigger("drop", {
      dataTransfer,
    });
    cy.get("button").contains("Оформить заказ").click();

    cy.get("[type=email]").type("123456789@111.ru");
    cy.get("[type=password]").type(123456789);
    cy.get("button").contains("Войти").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.intercept(`https://norma.nomoreparties.space/api/ingredients`).as(
      "getIngredients"
    );
    cy.wait("@getIngredients");
    cy.get("[class^=modal_container_]").should("be.visible");
    cy.get("[class^=order_number").should("be.visible");
    cy.get("[class^=modal_closeIcon_]").click();
    cy.get("[class^=modal_container_]").should("not.exist");
  });
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
