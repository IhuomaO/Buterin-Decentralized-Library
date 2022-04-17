import { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    const { type, name } = e.target;
    console.log(name, type, e.target.selectedOptions);

    const getValue = () => {
      if (type === "checkbox") {
        return e.target.checked;
      } else if (type === "select-multiple") {
        return Array.from(e.target.selectedOptions).map((o) => o.value);
      }
      return e.target.value;
    };

    const value = getValue();

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return { onChange, values, setValues };
};

export default useForm;
