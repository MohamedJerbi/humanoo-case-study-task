import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "confirm", {
  value: vi.fn(() => true),
  writable: true,
});
