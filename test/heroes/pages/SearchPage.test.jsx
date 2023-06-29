import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("SearchPage test", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrar los valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("Debe mostrar a batman y el input con el valor de la queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");
    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
    const searchAHeroDiv = screen.getByLabelText("searchAHeroDiv");
    expect(searchAHeroDiv.style.display).toBe("none");
  });

  test("Debe mostrar un error si no se encuentra el heroe(Batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=Batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const noResultDiv = screen.getByLabelText("noResultDiv");
    expect(noResultDiv.style.display).toBe("");
  });

  test("Debe llamar el navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const valueToSearch = "Wolverine".toLowerCase();
    const input = screen.getByRole("textbox");
    const form = screen.getByLabelText("form");
    fireEvent.change(input, {
      target: { name: "searchText", value: valueToSearch },
    });
    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${valueToSearch}`);
  });
});
