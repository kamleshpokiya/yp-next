import { InputHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const InputField: React.FC<InputProps> = ({ label, ...rest }) => {
    return (
        <div className="input-box input">
            {label && <label htmlFor={rest.id}>{label}</label>}
            <Field {...rest} />
            <ErrorMessage component="div" className="error-msg" name={`${rest.name}`} />
        </div>
    );
};

export default InputField;
