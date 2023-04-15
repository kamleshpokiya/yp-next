import Image from 'next/image';
import { useEffect, useState } from 'react';
import Iconify from './Iconify';
import { Tooltip } from 'react-tooltip';

type Asigner = {
    id: string,
    name: string,
    avatar: string,
    description: string,
};

type Assigners = {
    assigners: Asigner[],
    isSelectable?: boolean,
    isRemovable?: boolean,
    checkedList?: string[],
    setCheckedList?: (checked: any) => void,
    onItemClick?: (id: string) => void,
    onRemove?: (id: string) => void,
};

const Assigners = ({
    assigners,
    isSelectable = false,
    isRemovable = false,
    checkedList = [],
    setCheckedList,
    onItemClick,
    onRemove
}: Assigners) => {
    const [checked, setChecked] = useState<string[]>(checkedList);

    const onChange = (isChecked: boolean, id: string) => {
        if (isChecked) {
            setChecked(prev => ([...prev, id]));
        } else {
            const updatedChecks = checked.filter(item => item !== id);
            setChecked(updatedChecks);
        }
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
                                onChange={(e) => onChange(e.target.checked, assigner.id)}
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

export const AssignerCard = ({ avatar, name, description }: Asigner) => {
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
