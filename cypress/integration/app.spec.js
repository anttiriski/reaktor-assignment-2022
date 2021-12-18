describe("Homepage", () => {
  it("Should render the homepage", () => {
    cy.visit("http://localhost:3000");

    cy.get("h1").contains("Game history");
  });
});

describe("API: api/history", () => {
  it("Should return the game history with correct fields", () => {
    cy.request("http://localhost:3000/api/history").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("games", "latency", "nextCursor");
      expect(response.body.games[0]).to.have.all.keys(
        "gameId",
        "playerA",
        "playerAMove",
        "playerB",
        "playerBMove",
        "winner",
        "timestamp"
      );
    });
  });
});

describe("API: api/live", () => {
  it("Should return the current live games", () => {
    cy.request("http://localhost:3000/api/live").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("games", "latency");
      expect(response.body.games[0]).to.have.all.keys(
        "gameId",
        "playerA",
        "playerB",
        "timestamp"
      );
    });
  });
});

describe("API: api/players", () => {
  it("Should return the players", () => {
    cy.request("http://localhost:3000/api/players").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("players");
    });
  });
});

describe("API: api/statistics", () => {
  it("Should return error if no player is selected", () => {
    cy.request("POST", "http://localhost:3000/api/statistics", {
      selectedPlayer: null,
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("error");
    });
  });
});
