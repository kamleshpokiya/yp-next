// packages
import IMAGES from '@/assets/images';
import { ChangeEvent } from 'react';
// images
import Image from 'next/image';


// types
type SearchFieldProps<T> = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
} & T;

// search field
const SearchField = <T,>(props: SearchFieldProps<T>) => {
    const { SearchIcon } = IMAGES;

    return (
        <div className="main-search-box search-field-component">
            <form>
                <input
                    className="search"
                    type="search"
                    name="search"
                    placeholder="Search here..."
                    {...props}
                />
                <button className='search-field-icon'>
                    <Image src={SearchIcon.src} alt={SearchIcon.alt} width={20} height={20} />
                </button>
            </form>
        </div>
    );
};

export default SearchField;