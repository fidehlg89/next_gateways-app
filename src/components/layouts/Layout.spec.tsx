import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from ".";

describe("Layout", () => {

  it("renders the main content with the provided children", () => {
    render(<Layout>Test Content</Layout>);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const children = screen.getByText("Test Content");
    expect(children).toBeInTheDocument();
  });
});
