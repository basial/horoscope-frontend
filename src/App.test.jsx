import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        tone: "motivational",
        message: "You will conquer all challenges today!",
      }),
  })
);

describe("Horoscope App", () => {
  it("renders header correctly", () => {
    render(<App />);
    expect(
      screen.getByText(/Co szykują Ci dziś planetki/i)
    ).toBeInTheDocument();
  });

  it("shows loading state when button clicked", async () => {
    render(<App />);
    const button = screen.getByText(/✨ s p r a w d z a m ✨/i);

    fireEvent.click(button);

    expect(await screen.findByText(/Sprawdzam układ planetek/i)).toBeInTheDocument();
  });

  it("displays horoscope and percentage after fetch", async () => {
    render(<App />);
    const button = screen.getByText(/✨ s p r a w d z a m ✨/i);
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/You will conquer all challenges today!/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Układ planetek sprzyja Ci w/i)).toBeInTheDocument();
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });
});
