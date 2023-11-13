import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("and a click is triggered on the submit button", () => {
  it("the success action is called", async () => {
    const onSuccess = jest.fn();
    render(<Form onSuccess={onSuccess} />);

    fireEvent.change(screen.getByTestId("nom-field"), {
      target: { value: "Test Nom", name: "nom" },
    });
    fireEvent.change(screen.getByTestId("prenom-field"), {
      target: { value: "Test Prénom", name: "prenom" },
    });
    fireEvent.change(screen.getByTestId("email-field"), {
      target: { value: "test@email.com", name: "email" },
    });
    fireEvent.change(screen.getByTestId("message-field"), {
      target: { value: "Test message", name: "message" },
    });

    fireEvent.click(await screen.findByTestId("button-test-id"));

    await screen.findByText("En cours");
    await screen.findByText("Envoyer");
    expect(onSuccess).toHaveBeenCalled();
  });
});
