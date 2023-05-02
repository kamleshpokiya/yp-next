// packages
import RDatePicker from 'react-datepicker';
import { useField } from 'formik';


// types
type DatePickerProps = {
    name: string,
    label: string,
}

const DatePicker = ({ label, name, ...rest }: DatePickerProps) => {
    const [field, meta, helpers] = useField(name);

    return (
        <div className="input-box input">
            <div className="form-group">
                {label && <label htmlFor={name}>{label}</label>}
                <RDatePicker
                    {...field}
                    {...rest}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={(val) => {
                        helpers.setValue(val);
                    }}
                    onBlur={() => {
                        helpers.setTouched(true);
                    }}
                    dateFormat="dd-MM-yyyy"
                />
                {meta.touched && meta.error && (
                    <div className="error-msg">{meta.error}</div>
                )}
            </div>
        </div>
    );
};

export default DatePicker;
