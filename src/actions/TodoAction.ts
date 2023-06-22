import axios from "axios";
import { Dispatch } from "redux";
import { Todo } from '../type';

import {
    FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, SET_DATA_STATE
} from './actionTypes';
import { FetchDataSuccessAction, FetchDataRequestAction, FetchDataFailureAction } from './FetchAction';
import { SetStateDataAction } from './SetStateAction';
export type TodoTypesAction = SetStateDataAction | FetchDataRequestAction | FetchDataSuccessAction | FetchDataFailureAction;
//these all are thunk function
export const getAllTodo = () => async (dispatch: Dispatch<TodoTypesAction>) => {
    dispatch({
        type: FETCH_DATA_REQUEST,

    });

    try {
        const response = await axios.get('https://localhost:44340/api/Task');
        dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: response.data.data,

        });
    } catch (error: any) {
        dispatch({
            type: FETCH_DATA_FAILURE,
            payload: error.message
        });
    }
};

export const setTodoByFilter = (query: string) => async (dispatch: Dispatch<TodoTypesAction>) => {

    const response = await axios.get('https://localhost:44340/api/Task');
    const FilterData = response.data.data.filter((x: any) => x.task.toLowerCase().includes(query) || x.createdDateTime.toLowerCase().includes(query))
    dispatch({
        type: SET_DATA_STATE,
        payload: FilterData
    }
    )

}



export const addTodo = (data: Todo) => {
    return async () => {
        try {
            const response = await axios.post("https://localhost:44340/api/Task/AddTask", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response?.data?.msg

        } catch (e: any) {

            return e.message
        }
    };
};


//update action
export const updateTodo = (data: Todo) => {
    return async () => {
        try {
            const response = await axios.post("https://localhost:44340/api/Task/EditTask", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response?.data?.msg

        } catch (e: any) {

            return e.message
        }
    };

}


export const deleteTodo = (data: number) => {
    return async () => {
        try {
            const response = await axios.get("https://localhost:44340/api/Task/DeleteTask?id=" + data);
            return response?.data?.msg
        } catch (e: any) {
            return e.message
        }
    }
}



//get by id
export const getTodoById = (id: number) => {
    return async () => {
        try {
            const response = await axios.get("https://localhost:44340/api/Task/GetTaskById?id=" + id);
            return response?.data;
        } catch (error: any) {
            return error.message;
        }

    }
}