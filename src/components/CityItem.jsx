import React from "react";

function CityItem({
  city,
  index,
  isSelected,
  onDragStart,
  onDragOver,
  onDrop,
  onUpdateDays,
  onRemove,
  onAdd,
}) {
  if (isSelected) {
    return (
      <div
        key={city.id}
        className="city-item selected-city"
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, index)}
      >
        <div className="drag-handle">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="city-info">
          <div className="city-name">{city.name}</div>
          <div className="city-region">{city.region}</div>
        </div>
        <div className="city-controls">
          <div className="days-selector">
            <button
              className="days-btn"
              onClick={() => onUpdateDays(city.id, city.days - 1)}
              disabled={city.days <= 1}
            >
              −
            </button>
            <span className="days-count">{city.days} days</span>
            <button
              className="days-btn"
              onClick={() => onUpdateDays(city.id, city.days + 1)}
              disabled={city.days >= 20}
            >
              +
            </button>
          </div>
          <button className="remove-btn" onClick={() => onRemove(city.id)}>
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={city.id} className="city-item other-city">
      <div className="city-info">
        <div className="city-name">{city.name}</div>
        <div className="city-region">{city.region}</div>
      </div>
      <button className="add-btn" onClick={() => onAdd(city)}>
        +
      </button>
    </div>
  );
}

export default CityItem;
