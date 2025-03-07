import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc || '/images/default.png'} alt={imageAlt || 'default image'} />
        <div className="EventCard__label">{label || 'Default label'}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title || 'Default Title'}</div>
        <div className="EventCard__month">{getMonth(date || new Date())}</div>
      </div>
    </div>
  );

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  title: 'Default Title',
  label: 'Default Label',
  date: new Date(),
  imageSrc: '/images/default.png',
}

export default EventCard;
