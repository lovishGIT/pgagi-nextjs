import { store } from '@/store';
import { Todo } from '@/types';

export const fetchTodos = async () => {
    try {
        const todos: Todo[] = store.getState().todos.todos || [];
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return null;
    }
};

export const postTodo = async (
    title: string
) => {
    try {
        const newTodo: Todo = {
            id: Date.now(), title, completed: false, createdAt: Date.now().toLocaleString()
        };
        return newTodo;
    } catch (error) {
        console.error('Error posting new todo:', error);
        return null;
    }
};
