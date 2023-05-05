// packages
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';
// components
import Iconify from './Iconify';


// types
type Assigner = {
    id: string,
    name: string,
    avatar: string,
    description: string,
};

type AssignersProps = {
    assigners: Assigner[],
    isSelectable?: boolean,
    isRemovable?: boolean,
    checkedList?: string[],
    setCheckedList?: (checked: any) => void,
    onItemClick?: (id: string) => void,
    onRemove?: (id: string) => void,
};

// Assigners Component
const Assigners = ({
    assigners,
    isSelectable = false,
    isRemovable = false,
    checkedList = [],
    setCheckedList,
    onItemClick,
    onRemove
}: AssignersProps) => {
    const [checked, setChecked] = useState<string[]>(checkedList);

    const onCheck = (isChecked: boolean, id: string) => {
        setChecked(prev => isChecked ? [...prev, id] : prev.filter(item => item !== id));
    }

    useEffect(() => {
        if (setCheckedList) {
            setCheckedList(checked);
        }
    }, [checked]);

    return (
        <div className="scroll-bar-wrap">
            <div className="yk-main-box scroll-box">
                {assigners.map((assigner, key) => (
                    <div
                        key={key}
                        className={isSelectable ? 'checkbox' : isRemovable ? 'with-removable-button' : ''}
                        onClick={() => onItemClick && onItemClick(assigner.id)}
                    >
                        {isSelectable && (
                            <input
                                type="checkbox"
                                name="scales"
                                id="YK"
                                checked={checked.includes(assigner.id)}
                                onChange={(e) => onCheck(e.target.checked, assigner.id)}
                            />
                        )}

                        {isRemovable && (
                            <div className='actions-icons-wrapper'>
                                <div
                                    className="actions-icon"
                                    data-tooltip-id='remove-member'
                                    data-tooltip-place='right'
                                    data-tooltip-content='Remove Member'
                                    onClick={() => onRemove && onRemove(assigner.id)}
                                >
                                    <Iconify icon='octicon:x-circle-24' width={25} sx={{ color: 'rgb(165 165 165)' }} />
                                </div>

                                <Tooltip id='remove-member' style={{ zIndex: 100000 }} />
                            </div>
                        )}

                        <AssignerCard
                            id={assigner.id}
                            name={assigner.name}
                            avatar={assigner.avatar}
                            description={assigner.description}
                        />
                    </div>
                ))}
            </div>
            <div className="cover-bar" />
        </div>
    )
}

export default Assigners;

// Assigner Card Component
export const AssignerCard = ({ avatar, name, description }: Assigner) => {
    return (
        <label className="team-checkbox">
            <Image src={avatar} alt="member" width={60} height={60} />
            <span className="team-mem">
                {name}
                <span className="team-dis">
                    {description}
                </span>
            </span>
        </label>
    );
};
