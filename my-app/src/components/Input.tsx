import React, { useEffect } from "react";
import { Validation } from "../utils/Validation";

type Props = {
  type: string;
  label: string;
  textarea: boolean;
  name: string;
  maxLength?: number;
};
const validator = new Validation();

export default function Input({ type, label, textarea, name, maxLength }: Props) {
  
  const [value, setValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  useEffect(() => {
    if (type === "name") {
      setValue(value.toUpperCase());
    }
    if (type === "text") {
       
        if (value.split('').length < 1) {
            setValue("+7(")
        } else if (value.split('').length === 6) {
            setValue(value + ")")
        } else {
            setValue(value)
        }

        
    }
    validator.isRequired(value, type);

    if (validator.value === false) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    localStorage.setItem('valid', JSON.stringify(isValid))

  }, [value]);
  return (
    <div className="input__group">
      <label htmlFor={type}>{label}</label>
      {textarea ? (
        <textarea 
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)} 
            className={!isValid ? "errorInput" : ""}
        />
      ) : (
        <input
          name={name}
          value={value}
          type={type}
          onChange={(event) => setValue(event.target.value)}
          className={!isValid ? "errorInput" : ""}
          maxLength={maxLength}
        />
      )}

      {!isValid && !validator?.value ? (
        <div className="error">{validator.message}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
