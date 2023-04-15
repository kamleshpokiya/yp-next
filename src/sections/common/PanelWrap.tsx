import { ReactNode } from 'react';
import IMAGES from '@/assets/img';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { onSidePanelClose } from '@/store/reducers/actionsSlice';
import { RootState } from '@/store/reducers';

type PanelWrapProps = {
    children: ReactNode
};

const PanelWrap = ({ children }: PanelWrapProps) => {
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();
    const isSidePanelOpen = useSelector((state: RootState) => state.actions.isSidePanelOpen);

    return (
        <>
            {isSidePanelOpen && (
                <div className="col-lg-2 toggle">
                    <div className="project-main-box left">
                        <div className="project-box">
                            <div className="project-btn-box">
                                {children}
                            </div>
                            <div className="arrow" onClick={() => dispatch(onSidePanelClose())}>
                                <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default PanelWrap;
