import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex + 1 < data?.focus.length ? prevIndex + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  const byDateAsc = data?.focus.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {index === idx && (
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateAsc.map((e, radioIdx) => (
                  <input
                    key={e.id}
                    type="radio"
                    name="radio-button"
                    defaultChecked={idx === radioIdx}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
