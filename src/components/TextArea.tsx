// packages
import { TextareaHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';


// types
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

// text area component
const TextArea: React.FC<TextAreaProps> = ({ label, ...rest }) => {
    return (
        <div className="input-box input comment">
            {label && <label htmlFor={rest.id}>{label}</label>}
            <Field as="textarea" {...rest} />
            <ErrorMessage component="div" className="error-msg" name={`${rest.name}`} />
        </div>
    );
};

export default TextArea;