import { types } from "../../../src/auth/";

describe("types test", () => {
  test("Debe regresar estos types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
