import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../pages/Header";
import "../../matchMedia";

describe("Header Component", () => {
  // Test 1: Component renders successfully
  test("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  // Test 2: Logo onClick scrolls to the top
  test("scrolls to the top on logo click", () => {
    const scrollToSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    render(<Header />);
    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollToSpy.mockRestore();
  });

  // Test 3: GitHub link has correct attributes
  test("GitHub link has correct attributes", () => {
    render(<Header />);
    const githubLink = screen.getByRole("link");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/iqbalsetiawan/sera_pokedex",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
