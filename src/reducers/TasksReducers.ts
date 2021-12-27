import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


export const TasksReducers = (state: TasksStateType, action: allTasksType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)
            }
            //setTasks({...tasks, [TodoID]: tasks[TodoID].filter(f => f.id !== taskID)})
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
            //  let newTask = {id:v1(),title:title,isDone:false}
            //           setTasks({...tasks,[TodoID]: [newTask,...tasks[TodoID]]})

        }
        case "ADD-EMPTY-TASK": {
            return {
                ...state,
                [action.payload.newTodolistId]:state[action.payload.newTodolistId]=[]
            }

        }

        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }

        }

        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    title: action.payload.newTitle
                } : m)
            }
        }

        default:
            return state
    }
};

type allTasksType = removeTaskType | addTaskType | changeStatus | changeTaskTitle | addEmptyArrOfTaskType

type removeTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}

type addTaskType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}

type changeStatus = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            id: id,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}

type changeTaskTitle = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id: id,
            newTitle: newTitle,
            todolistId: todolistId
        }
    } as const
}
type addEmptyArrOfTaskType = ReturnType<typeof addEmptyArrOfTaskAC>

export const addEmptyArrOfTaskAC = (newTodolistId:string) => {
    return {
        type: "ADD-EMPTY-TASK",
        payload: {
            newTodolistId:newTodolistId
        }
    } as const
}

