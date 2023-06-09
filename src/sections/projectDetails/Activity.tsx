// packages
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
// images
import IMAGES from '@/assets/images';
// hooks
import useToggle from '@/hooks/useToggle';
// store
import { RootState } from '@/store/rootReducer';
import { addComment } from '@/store/slices/comments';
import { getCommentsByTaskId } from '@/store/selectors/comments';
import { getAccountAvatar, getAccountFirstName, getAccountLastName } from '@/store/selectors/account';
// utils
import getAvatarName from '@/utils/getAvatarName';
import { formatDate } from '@/utils/formatDate';


// types
type ActivityProps = {
    taskId: string | null,
};

// activity component : task comments and chats
const Activity = ({ taskId }: ActivityProps) => {
    const [comment, setComment] = useState('');
    const { isOpen, onToggle } = useToggle();
    const { attachment, teamMember } = IMAGES;
    const dispatch = useDispatch();
    const userProfileImg = useSelector(getAccountAvatar);
    const firstName = useSelector(getAccountFirstName);
    const lastName = useSelector(getAccountLastName);
    const comments = useSelector((state: RootState) => getCommentsByTaskId(state, taskId));
    const fullName = `${firstName} ${lastName}`;

    // add comment on enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (comment.trim() !== '') {
                const newComment = {
                    taskId,
                    commenter: firstName + ' ' + lastName,
                    comment,
                };
                dispatch(addComment(newComment));
            }
            setComment('');
        }
    }

    return (
        <div className="Activity">
            <div className="Activity-main-box">
                <div className="des-boxs" id="activity">
                    <div className="btn-title">
                        <h4>
                            Activity:
                        </h4>
                        <a
                            href="#"
                            className="show-dis-btn pushme2"
                            onClick={() => onToggle()}
                        >
                            {isOpen ? 'Hide details' : 'Show details'}
                        </a>
                    </div>

                    <div className="comment-input-box">
                        <div
                            className="profile"
                            data-tooltip-id='1234'
                            data-tooltip-place='bottom'
                            data-tooltip-content={fullName}
                        >
                            <Image
                                src={userProfileImg ?? teamMember.src}
                                alt={teamMember.alt}
                                width={100}
                                height={100}
                            />
                        </div>

                        <Tooltip id='1234' />
                        <div className="comment-area">
                            <input
                                type="text"
                                placeholder="Write a comment…"
                                value={comment}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {isOpen && (
                        <div className="comment-box">
                            {comments.map((comment) => (
                                <div className="team-member-reply">
                                    <div className="profile" title="Sufiyan Shaikh">
                                        <span>
                                            {getAvatarName(comment.commenter)}
                                        </span>
                                    </div>
                                    <div className="comment">
                                        <div className="user-name">
                                            <a href="#">
                                                {comment.commenter}
                                            </a>
                                            <span className="time">
                                                <a href="#">
                                                    {/* {formatDateTime(comment.date)} */}
                                                    {formatDate(comment.date, 'dd-MM-yyyy hh:mm a')}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="text">
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="team-member-reply">
                                <div className="profile" title="Sufiyan Shaikh">
                                    <span>
                                        SS
                                    </span>
                                </div>
                                <div className="comment">
                                    <div className="user-name">
                                        <a href="#">
                                            Sufiyan Shaikh
                                        </a>
                                        <span className="time">
                                            <a href="#">
                                                30-2-2023 3:20 PM
                                            </a>
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p>
                                            Set different types of comments on
                                            activity,
                                            such as images, text, and links
                                            We need to complete this design
                                            within this
                                            month, and there are still various
                                            other
                                            pages that need to be completed. I
                                            hope that
                                            your performance will not affect
                                            this
                                            deadline.
                                            From now on, I will provide you with
                                            a
                                            deadline for each task, and you need
                                            to
                                            finish the task within that
                                            deadline. If you
                                            encounter any complexities related
                                            to
                                            jQuery, please inform me without
                                            wasting any
                                            time. In case you are unable to
                                            complete the
                                            task within the deadline, you can
                                            give your
                                            extra time to finish it.
                                            Please finish above all feedback by
                                            today
                                            only.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-member-reply">
                                <div className="profile" title="Hene Mahta">
                                    <span>
                                        HM
                                    </span>
                                </div>
                                <div className="comment">
                                    <div className="user-name">
                                        <a href="#">
                                            Hene Mahta
                                        </a>
                                        <span className="time">
                                            <a href="#">
                                                18-2-2023 4:15 PM
                                            </a>
                                        </span>
                                    </div>
                                    <div className="text">
                                        <p>Click this link:
                                            <a href="#">https://template.codelinkinfotech.com/yourpromate/project-details.html?search=&amp;text=#</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="team-member-reply">
                                <div className="profile" title="Sufiyan Shaikh">
                                    <span>
                                        SS
                                    </span>
                                </div>
                                <div className="comment">
                                    <div className="user-name">
                                        <a href="#">
                                            Sufiyan Shaikh
                                        </a>
                                        <span className="time">
                                            <a href="#">
                                                17-2-2023 4:15 PM
                                            </a>
                                        </span>
                                    </div>
                                    <div className="bug-img">
                                        <div className="text">
                                            <p>
                                                Attached <a href="#">image.png
                                                </a> to
                                                this card.
                                            </p>
                                        </div>
                                        <Image src={attachment.src} alt={attachment.alt} width={350} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activity;