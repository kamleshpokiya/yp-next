// store
import { RootState } from '../rootReducer';


export const getCommentsByTaskId = (state: RootState, taskId: string | null) => {
    return state.comments.filter((comment) => comment.taskId === taskId);
}