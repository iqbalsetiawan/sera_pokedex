global.fetch = jest.fn();

describe("API Call Tests for PokemonList", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("receives a mocked response from the Pokémon REST API", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            results: [
              {
                name: "pikachu",
                url: "https://pokeapi.co/api/v2/pokemon/pikachu",
              },
              {
                name: "charizard",
                url: "https://pokeapi.co/api/v2/pokemon/charizard",
              },
            ],
          }),
      }),
    );

    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0",
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/pikachu" },
        {
          name: "charizard",
          url: "https://pokeapi.co/api/v2/pokemon/charizard",
        },
      ],
    });
  });
});
