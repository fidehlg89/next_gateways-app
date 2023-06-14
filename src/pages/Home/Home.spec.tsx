import { render, screen } from "@testing-library/react";
import HomePage from ".";

test("renders welcome message", () => {
  render(<HomePage />);
  const welcomeMessage = screen.getByText("Welcome to Our App!");
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders description text", () => {
  render(<HomePage />);
  const descriptionText = screen.getByText("Ready to manage your gateway information? Let's get started!");
  expect(descriptionText).toBeInTheDocument();
});

test("renders 'Manage Gateways' link", () => {
  render(<HomePage />);
  const manageGatewaysLink = screen.getByText("Manage Gateways");
  expect(manageGatewaysLink).toBeInTheDocument();
});
