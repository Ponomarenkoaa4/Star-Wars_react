import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import icon from "./img/close.svg";

import "../index.css";
import styles from "./UiInput.module.css";

const UiInput = ({ value, handleInputChange, placeholder, classes }) => {
  return (
    <div className={cn(styles.wrapper__input, classes)}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <img
        className={cn(styles.clear, !value && styles.clear__disabled)}
        onClick={() => value && handleInputChange("")}
        src={icon}
        alt="Clear"
      />
    </div>
  );
};

UiInput.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
};

export default UiInput;
