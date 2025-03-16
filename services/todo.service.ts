import { AppDispatch, store } from '@/store';
import { setTodos, addTodo } from '@/store/slices/todos.slice';
import { Todo } from '@/types';

export const fetchTodos = async (dispatch: AppDispatch) => {
    try {
        const todos: Todo[] = store.getState().todos.todos || [];
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
        const newTodo: Todo = {
            title, completed: false, createdAt: Date.now().toLocaleString()
        };
        dispatch(addTodo(newTodo));
    } catch (error) {
        console.error('Error posting new todo:', error);
    }
};
