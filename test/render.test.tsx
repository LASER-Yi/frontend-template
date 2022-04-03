import { render } from "@testing-library/react";
import { StrictMode } from "react";
import { describe, it } from "vitest";
import App from "../src/App";

describe("render test", () => {
  it("render without crashing", () => {
    render(
      <StrictMode>
        <App></App>
      </StrictMode>
    );
  });
});
