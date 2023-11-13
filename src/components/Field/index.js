import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label,
  name,
  placeholder,
  errorMessage,
  testId, // Ajouter la prop testId
}) => {
  let component;
  const inputClassName = errorMessage ? "input-error" : "";

  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          className={inputClassName}
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid={testId} // Utiliser la prop testId
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          className={inputClassName}
          name={name}
          data-testid={testId} // Utiliser la prop testId
        />
      );
      break;
    default:
      component = (
        <input
          className={inputClassName}
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid={testId} // Utiliser la prop testId
        />
      );
  }
  
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  testId: PropTypes.string, // Ajouter testId aux propTypes
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  errorMessage: null,
  testId: "field-testid", // Définir une valeur par défaut pour testId
};

export default Field;
