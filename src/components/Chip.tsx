// packages
import { sample } from 'lodash';
// utils
import { getColorStyles } from '@/utils/colors';
// _mock
import StatusType from '@/_mock/status';


// types
type ChipProps = {
    categories: string[],
};

// chip component
const Chip = ({ categories }: ChipProps) => {
    return (
        <div className="button-box">
            {categories?.length && categories.map((category, key) => (
                <div className="btn-box" key={key} >
                    <span className="label" style={{ ...getColorStyles(sample(StatusType) || 'success') }}>{category}</span>
                </div>
            ))}
        </div>
    );
}

export default Chip;
