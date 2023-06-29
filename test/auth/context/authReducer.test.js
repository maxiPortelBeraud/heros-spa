import { authReducer, types } from "../../../src/auth";

describe("authReducer test", () => {
  const user = {
    id: "ABC",
    name: "Test user",
  };

  test("Debe retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("(login) debe llamar el login autenticar y establecer user", () => {
    const action = { type: types.login, payload: user };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, user: action.payload });
  });

  test("(logout) debe borrar el name del usuario y logged false", () => {
    const action = { type: types.logout };
    const state = authReducer({ logged: true, payload: user }, action);
    expect(state).toEqual({ logged: false });
  });
});
