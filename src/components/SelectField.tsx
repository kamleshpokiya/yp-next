// packages
import Image from 'next/image';
import Select, { components } from 'react-select';
// images
import IMAGES from '@/assets/images';


// common style
const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 0,
        height: 10,
        width: 10,
    },
});

// select component styles config
const colorStyles = {
    control: (styles: any) => ({
        ...styles,
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#ddd',
        },
        '&:focus-within': {
            borderColor: '#ddd',
            boxShadow: '0 0 0 0px #ddd !important',
        },
        '& .css-1u9des2-indicatorSeparator': {
            backgroundColor: 'transparent',
        },
    }),
    placeholder: (styles: any) => ({
        ...styles,
        ...dot(),
        color: '#ddd',
        fontSize: '16px',
        fontWeight: 'bold'
    }),
    input: (styles: any) => ({
        ...styles,
        padding: '6px',
        cursor: 'text',
    }),
};

type SelectFieldProps<T extends React.ElementType> = React.ComponentPropsWithRef<T> & {
    options: Array<T>,
    value: T | null,
    placeholder?: string,
    onChange: (selected: T | null | Array<T> | undefined) => void,
    getOptionLabel?: (option: T) => string,
    maxWidth?: string,
    isMulti?: boolean,
    showIcon?: boolean,
};

// select field component
const SelectField = <T extends React.ElementType = 'select'>({
    options,
    value,
    onChange,
    getOptionLabel,
    placeholder,
    maxWidth,
    isMulti = false,
    showIcon = true,
}: SelectFieldProps<T>) => {
    const { SearchIcon } = IMAGES;

    // select field search icon
    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <button type='button'>
                    <Image src={SearchIcon.src} alt={SearchIcon.alt} />
                </button>
            </components.DropdownIndicator>
        );
    };

    return (
        <div className="main-search-box custom-search-box" style={{ maxWidth: maxWidth ?? '' }}>
            <div style={{ width: '100%' }}>
                <Select
                    options={options}
                    placeholder={placeholder ?? 'Search projects here...'}
                    className='selectInput'
                    isSearchable
                    components={showIcon ? { DropdownIndicator } : {}}
                    styles={colorStyles}
                    isClearable
                    getOptionValue={(option) => option?.id}
                    getOptionLabel={getOptionLabel}
                    value={value}
                    onChange={onChange}
                    isMulti={isMulti}
                />
            </div>
        </div>
    );
};

export default SelectField;
