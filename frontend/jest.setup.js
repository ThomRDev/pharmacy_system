import "whatwg-fetch";
import "setimmediate";
import "jest-canvas-mock";

jest.mock("use-resize-observer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));
