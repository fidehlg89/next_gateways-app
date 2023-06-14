import { render, screen } from "@testing-library/react";
import HomePage from ".";

describe("Home Page", () => {
  it("renders welcome message", () => {
    render(<HomePage />);
    const welcomeMessage = screen.getByText("Welcome to Our App!");
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<HomePage />);
    const descriptionText = screen.getByText(
      "Ready to manage your gateway information? Let's get started!"
    );
    expect(descriptionText).toBeInTheDocument();
  });

  it("renders 'Manage Gateways' link", () => {
    render(<HomePage />);
    const manageGatewaysLink = screen.getByText("Manage Gateways");
    expect(manageGatewaysLink).toBeInTheDocument();
  });
});
