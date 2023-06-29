import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe("PublicRoute test", () => {
  test("Debe mostrar el children si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta publica")).toBeTruthy();
  });

  test("Debe navegar si está autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ABC",
        name: "Test user",
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <PublicRoute>
            <h1>Ruta publica</h1>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.queryByText("Ruta publica")).toBeNull();
  });
});
