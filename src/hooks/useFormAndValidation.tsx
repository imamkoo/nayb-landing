import React, { useState } from "react";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const useFormAndValidation = (inputs: FormValues) => {
  const [values, setValues] = useState<FormValues>(inputs);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
    setIsValid(e?.target?.closest("form")?.checkValidity() ?? false);
  };

  const resetForm = (
    values: FormValues = inputs,
    errors: FormErrors = {},
    isValid: boolean = false
  ) => {
    setValues(values);
    setErrors(errors);
    setIsValid(isValid);
  };

  return { values, errors, isValid, handleChange, resetForm };
};

export default useFormAndValidation;
