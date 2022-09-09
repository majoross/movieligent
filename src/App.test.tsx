import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

test("App renders", () => {
  render(<App />);
  const appElement = screen.getByTestId("app-testid");
  expect(appElement).toBeInTheDocument();
});

test("matches snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
