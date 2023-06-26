// packages
import { InputHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';


// types
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    divClasses?: string;
}

// input field
const InputField: React.FC<InputProps> = ({ label, divClasses, ...rest }) => {
    return (
        <div className={`input-box input ${divClasses}`}>
            {label && <label htmlFor={rest.id}>{label}</label>}
            <Field {...rest} />
            <ErrorMessage component="div" className="error-msg" name={`${rest.name}`} />
        </div>
    );
};

export default InputField;
