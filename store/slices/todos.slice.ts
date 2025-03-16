import { Todo } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(
                (t) => t.id === action.payload
            );
            if (todo) todo.completed = !todo.completed;
        },
    },
});

export const { setTodos, addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
