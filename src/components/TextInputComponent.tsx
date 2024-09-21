import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    validate: RegExp;
    errmsg:string;
    required: true;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onLocalErrorChange?: (name: string, error: string | undefined) => void;
}

const TextInputComponent: React.FC<TextInputProps> = ({
    label,
    name,
    value,
    validate,
    errmsg,
    onChange,
    onLocalErrorChange,
}) => {
    const [localError, setLocalError] = useState<string | undefined>(undefined);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.trim();
        onChange(e); // Propagate the change event

        let newError;

        // Validar que solo se permitan letras y acentos (áéíóú) en el campo
        if (!validate.test(inputValue)) {
            newError = errmsg;
        } else {
            newError = undefined;
        }

        setLocalError(newError); // Update local error state

        // Propagate the error to the parent component (if the callback is provided)
        if (onLocalErrorChange) {
            onLocalErrorChange(name, newError);
        }
    };

    return (
        <div className={`input-group ${localError ? 'input-error' : ''}`}>
            <label htmlFor={name} className="font-gibson text-[24px]">{label}:</label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                required
            />
            {localError && <p className="error-message">{localError}</p>}
        </div>
    );
};

export default TextInputComponent;
