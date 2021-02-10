describe("Testing the cat api ", () => {
  let data = {
    image_id: "example123",
    sub_id: "my-user-1232",
    value: 1,
  };
  it("Obtener votos cuando no hay", () => {
    cy.request({
      method: "GET",
      url: "https://api.thecatapi.com/v1/votes",
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property("content-length", "2");
      expect(response.headers).to.have.property("pagination-count", "0");
      expect(response.headers).to.have.property("pagination-limit", "100");
      expect(response.body).to.be.empty;
    });
  });

  it("Crear un voto exitoso", () => {
    cy.request({
      method: "POST",
      url: "https://api.thecatapi.com/v1/votes",
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("SUCCESS");
      data = { ...data, id: response.body.id };
    });
  });

  it("Intentar crear voto sin value", () => {
    cy.request({
      method: "POST",
      url: "https://api.thecatapi.com/v1/votes",
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
      body: {
        image_id: "1",
        sub_id: "my-user-1234",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('"value" is required');
    });
  });

  it("Consultar el voto creado por id", () => {
    cy.request({
      method: "GET",
      url: "https://api.thecatapi.com/v1/votes/" + data.id,
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(data.id);
      expect(response.body.sub_id).to.eq(data.sub_id);
      expect(response.body.image_id).to.eq(data.image_id);
      expect(response.body.value).to.eq(data.value);
    });
  });

  it("Eliminar voto no existente", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.thecatapi.com/v1/votes/9876512",
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("INVALID_ACCOUNT")
    });
  })

  it("Eliminar voto creado", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.thecatapi.com/v1/votes/" + data.id,
      headers: { "x-api-key": "b0af7837-1b03-4d54-af4e-28ac79150685" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("SUCCESS");
    });
  });
});
