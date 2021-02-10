describe("Test Suite Space & Beyond", () => {
  it("Validar login de un usuario", () => {
    const userName = "Julian Novoa";
    const password = "123456789";

    cy.visit("http://demo.testim.io/");
    cy.findByText("Log in").should("exist").click();
    //Valida url y titulo de la pantalla login
    cy.url().should("include", "/login");
    cy.get("h2").contains("Login").should("have.text", "Login");
    //Inicia sesión
    cy.get("#login").find("input").eq(0).type(userName);
    cy.get("#login").find("input").eq(1).type(password);
    cy.get("[form='login']").click();
    //Se valida que se redireccione al home
    cy.url().should("include", "http://demo.testim.io/");
    //Validar que en el home salga el user name ingresado en login
    //Nota: Esta validación será fallida, ya que hay un error en el aplicativo, para ser success debe ser 'John'
    cy.get(".mui-btn > :nth-child(1)").should("contain", userName);
  });
});
