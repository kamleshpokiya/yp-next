// packages
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
// hooks
import useToggle from '@/hooks/useToggle';


// types
type FormatedCategory = {
    id: string,
    label: string,
    value: string,
};

type AddCategoryProps = {
    selectedCategories: FormatedCategory[],
    setSelectedCategories: (selected: FormatedCategory[]) => void,
};

const AddCategory = ({ selectedCategories, setSelectedCategories }: AddCategoryProps) => {
    const [newCategory, setNewCategory] = useState('');
    const { isOpen, onClose, onToggle } = useToggle();

    const onAddNewCategory = () => {
        setSelectedCategories([...selectedCategories, {
            id: newCategory,
            label: newCategory,
            value: newCategory,
        }]);

        setNewCategory('');
        onClose();
    }

    return (
        <div className="add-more">
            <OutsideClickHandler onOutsideClick={onClose}>
                <button
                    className="add-more_button star-btn"
                    type='button'
                    onClick={onToggle}
                >
                    Add More
                </button>

                {isOpen && (
                    <div className="add-your-category">
                        <h5>
                            Add your category
                        </h5>
                        <input
                            className="add-search"
                            type="text"
                            name="text"
                            placeholder="Name of category"
                            value={newCategory}
                            onChange={(e: any) => setNewCategory(e.target.value)}
                        />
                        <button className="add-button star-btn" type='button' disabled={newCategory === ''} onClick={onAddNewCategory}>Add</button>
                    </div>
                )}
            </OutsideClickHandler>
        </div>
    );
};

export default AddCategory;
