import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { router } from "../../src/router";

describe("AppRouter test", () => {
  test("Debe mostrar el login si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };
    const setRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });
    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={setRouter} />
      </AuthContext.Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThan(1);
  });

  test("Debe mostrar componente marvel si está autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ABCD",
        name: "test user",
      },
    };
    const setRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });
    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={setRouter} />
      </AuthContext.Provider>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
