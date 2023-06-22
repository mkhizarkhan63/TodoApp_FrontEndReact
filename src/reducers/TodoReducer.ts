import { Todo } from '../type';
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/actionTypes';
import { TodoTypesAction } from '../actions/TodoAction';
interface TodoState {
    todos: Todo[],
    isLoading: boolean
}

const initialState: TodoState = {
    todos: [],
    isLoading: false
};

const TodoReducer = (state: TodoState = initialState, action: TodoTypesAction) => {

    switch (action.type) {

        case "FETCH_DATA_REQUEST":
            return { ...state, isLoading: true };
        case "FETCH_DATA_SUCCESS":
            return { ...state, isLoading: false, todos: action.payload };

        case "FETCH_DATA_FAILURE":
            return { ...state, isLoading: false };

        case "SET_DATA_STATE":
            return { ...state, todos: action.payload, isLoading: false };
        // case 'ADD_TODO_SUCCESS':
        //     return {
        //         ...state,
        //         loading: false,
        //         todos: [...state.todos, action.payload],

        //     };
        default:
            return state;
    }


}

// const reducer = (
//     state: TodoTaskState = initialState,
//     action: TodoTaskAction
// ): TodoTaskState => {
//     switch (action.type) {
//         case actionTypes.GETALL_TODO:
//             const allTasks : ITodoTask[] = action.data;
//         // case actionTypes.ADD_TODO:

//         // case actionTypes.REMOVE_ARTICLE:
//         //     const updatedArticles: IArticle[] = state.articles.filter(
//         //         article => article.id !== action.article.id
//         //     )
//         //     return {
//         //         ...state,
//         //         articles: updatedArticles,
//         //     }
//     }
//     return state
// }

export default TodoReducer