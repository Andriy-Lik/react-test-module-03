import React from "react";
import './Filter.css';

const Filter = ({ value, onChange }) => (
    <div className="Filter">
        <label className="Filter__label">
            Фильтр по имени
            <br />
            <input className="Filter__input" type="text" value={value} onChange={onChange} />
        </label>
    </div>

);

export default Filter;