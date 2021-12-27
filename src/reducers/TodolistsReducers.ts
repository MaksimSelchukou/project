import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


export const TodolistsReducers = (state: Array<TodolistType>, action: allTasksType):Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            return [{id:action.payload.newTodolistId,title:action.payload.title,filter: "all"},...state]

        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(m=>m.id === action.payload.id ? {...m,title:action.payload.title}:m)

        }

        case "CHANGE-FILTER": {
            return [...state.map(m=>m.id === action.payload.todolistId ? {...m,filter:action.payload.value}:m)]

        }
        default:
            return state
    }
};

type allTasksType = removeTodolistType | addTodolistType | changeTodolistTitleType | changeFilterType

type removeTodolistType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: id
        }
    } as const
}

type addTodolistType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string,newTodolistId:string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title:title,
            newTodolistId:newTodolistId
        }
    } as const
}

type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id:id,
            title:title
        }
    } as const
}

type changeFilterType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            value:value,
            todolistId:todolistId
        }
    } as const
}



