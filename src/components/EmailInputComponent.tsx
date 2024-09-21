import React, { ChangeEvent, useState } from 'react';

interface EmailInputProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const EmailInputComponent: React.FC<EmailInputProps> = ({ label, name, value, error, onChange, required = true }) => {
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    const isValidEmail = validateEmail(inputValue);
    setIsValid(isValidEmail || inputValue.trim() === '');

    // Si el correo no es válido y no está vacío, mostramos el mensaje de error
    if (!isValidEmail && inputValue.trim() !== '') {
      onChange({
        target: { name, value: inputValue },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={`input-group ${error ? 'input-error' : ''}`}>
      <label htmlFor={name} className="font-gibson text-[24px]">{label}:</label>
      <input
        type="email"
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
      />
      {error && <p className="error-message">{error}</p>}
      {!isValid && value.trim() !== '' && (
        <p className="error-message">Por favor introduzca un correo electrónico válido.</p>
      )}
    </div>
  );
};

export default EmailInputComponent;
