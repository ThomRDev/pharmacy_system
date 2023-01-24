import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import {
  act,
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { useAppDispatch } from "../src/store";
import { authSlice } from "../src/store/auth";
import { notAuthenticatedState } from "./fixtures/authFixtures";
import App from "../src/App";
import { expect } from "@jest/globals";
import "jest";
const mockStartLoginWithUsernamePassword = jest.fn();

interface LoginProps {
  username: string;
  password: string;
}

jest.mock("../src/store/auth/thunks", () => ({
  ...jest.requireActual("../src/store/auth/thunks.ts"),
  startLogin: ({ username, password }: LoginProps) => {
    return () => mockStartLoginWithUsernamePassword({ username, password });
  },
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

jest.mock("../src/store/store.ts", () => ({
  ...jest.requireActual("../src/store/store.ts"),
  useDispatch: () => (fn: any) => fn(),
}));

describe("Test al component <App />", () => {
  beforeEach(() => jest.clearAllMocks());
  test('Deberia hacer match con el snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
  test("Debe de renderizar el componente <LoginPage /> cuando no esta autenticado", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });
  test("Debe de llamar a startLogin para inicar sesion", async () => {
    const username = "thomtwd";
    const password = "13456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByLabelText("username");
    fireEvent.change(usernameField, {
      target: { name: "username", value: username },
      preventDefault() {},
    });
    const passwordField = screen.getByLabelText("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });
    const submitFormLogin = screen.getByLabelText("submit-form-login");
    fireEvent.submit(submitFormLogin, { preventDefault() {} });
    await waitFor(() =>
      expect(mockStartLoginWithUsernamePassword).toHaveBeenCalledWith({
        password: "13456",
        username: "thomtwd",
      })
    );
  });
});
