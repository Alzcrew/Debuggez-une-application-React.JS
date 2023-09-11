import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    // Votre code pour vérifier les champs du formulaire...
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Utilisez waitFor pour attendre que le message soit affiché
      await waitFor(() => {
        expect(screen.findByText(/Message envoyé !/i)).resolves.toBeInTheDocument();
      });      
    });
  });
});
