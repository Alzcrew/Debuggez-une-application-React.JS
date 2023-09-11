import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(); // Vous n'avez pas besoin de retourner une valeur ici
  }, 1000);
});


const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = (fields) => {
    const newErrors = {};
    if (!fields.nom) newErrors.nom = "Ce champ est obligatoire";
    if (!fields.prenom) newErrors.prenom = "Ce champ est obligatoire";
    if (!fields.email) newErrors.email = "Ce champ est obligatoire";
    if (!fields.message) newErrors.message = "Ce champ est obligatoire";
    return newErrors;
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      const formElements = evt.target.elements;
      const fields = {
        nom: formElements.nom.value,
        prenom: formElements.prenom.value,
        email: formElements.email.value,
        message: formElements.message.value,
      };

      const newErrors = validateFields(fields);

      if (Object.keys(newErrors).length > 0) {
        setTimeout(() => {
          setSending(false); // Mettre fin à l'état "En cours" après 1 seconde de délai
          setErrors(newErrors);
          onError(newErrors);
        }, 1000); // Délai d'une seconde
        return;
      }

      try {
        await mockContactApi();
        setSending(false);
        setErrors({});
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="nom" error={errors.nom} />
          <Field
            placeholder=""
            label="Prénom"
            name="prenom"
            error={errors.prenom}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" name="email" error={errors.email} />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
            data-testid="button-test-id"
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
          {Object.keys(errors).length > 0 && (
            <div style={{ color: "red" }}>Veuillez remplir tous les champs</div>
          )}
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="message"
            type={FIELD_TYPES.TEXTAREA}
            error={errors.message}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
