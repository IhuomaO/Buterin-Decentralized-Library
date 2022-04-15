import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, name, placeholder, type, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="form-label inline-block mb-1 text-white-700"
      >
        {label}:
      </label>

      <input
        type={type || "text"}
        placeholder={placeholder}
        id={name}
        name={name}
        className="w-[300px] lg:w-full px-5 py-[4px] border block rounded text-lg text-black focus:outline-double"
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["address", "amount"]),
};

Input.defaultProps = {
  placeholder: "Type in your Name",
};

export default Input;
