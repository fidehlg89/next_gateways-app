import { render, screen } from "@testing-library/react";
import ErrorPage from ".";
import { IErrorPageProps } from "@/src/types";

describe("ErrorPage", () => {
  const error = "An unexpected error occurred.";
  const props: IErrorPageProps = {
    error: error
  };

  it("renders the error message", () => {
    render(<ErrorPage {...props} />);
    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the 'Home' link", () => {
    render(<ErrorPage {...props} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });

  it("has a valid link to the home page", () => {
    render(<ErrorPage {...props} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
