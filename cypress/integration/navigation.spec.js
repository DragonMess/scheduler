describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // target the list "li" item element that contains "Tuesday"
    cy.contains("li", "Tuesday")
      // event click to select the day
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});
