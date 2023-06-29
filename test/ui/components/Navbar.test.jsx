import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Navbar test", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "1234",
      name: "Test User",
    },
    logout: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());
  const { name } = contextValue.user;

  test("Debe aparecer el nombre del usuario", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getAllByText(name).length).toBeGreaterThanOrEqual(1);
  });

  test("Debe llamar logout y a navigate cuando se hace click en el boton logout ", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
