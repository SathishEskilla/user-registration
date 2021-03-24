import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("testing app component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders logo on the DOM", () => {
    const imgElement = screen.getByAltText(/logo/gim);
    expect(imgElement.nodeName).toEqual("IMG");
  });

  test("renders <Registration> component on the DOM", () => {
    const imgElement = screen.getAllByText("Register");
    expect(imgElement.length).toEqual(1);
  });
});
