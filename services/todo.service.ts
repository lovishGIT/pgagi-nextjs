import { AppDispatch } from '@/store';
import { setTodos, addTodo } from '@/store/slices/todos.slice';

export const fetchTodos = async (dispatch: AppDispatch) => {
    try {
        const todos = [
            {
                id: 1,
                title: 'Complete dashboard project',
                completed: false,
            },
            {
                id: 2,
                title: 'Research stock markets',
                completed: true,
            },
            {
                id: 3,
                title: 'Schedule doctor appointment',
                completed: false,
            },
        ];
        dispatch(setTodos(todos));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

export const postTodo = async (
    dispatch: AppDispatch,
    title: string
) => {
    try {
        const newTodo = { id: Date.now(), title, completed: false };
        dispatch(addTodo(newTodo));
    } catch (error) {
        console.error('Error posting new todo:', error);
    }
};
