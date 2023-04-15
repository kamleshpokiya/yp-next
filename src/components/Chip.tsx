import { getColorStyles } from '@/utils/colors';
import { sample } from 'lodash';
import StatusType from '@/_mock/status';

type ChipProps = {
    categories: string[],
};

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
