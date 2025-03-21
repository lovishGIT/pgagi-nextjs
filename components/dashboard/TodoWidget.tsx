import React, { useState } from 'react';
import { useRouter } from 'next/compat/router';
import { Todo } from '@/types';

interface TodoWidgetProps {
    todos: Todo[];
}

const TodoWidget: React.FC<TodoWidgetProps> = ({
    todos: initialTodos,
}) => {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const newTodoItem = {
            id: Date.now(),
            title: newTodo.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };

        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    if (router?.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white text-black rounded-lg h-[300px] flex flex-col border-2 border-gray-400 dark:border-0 shadow-sm">
            <form onSubmit={addTodo} className="flex">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
                >
                    +
                </button>
            </form>

            <div className="p-4 flex-grow flex-wrap overflow-y-scroll overflow-x-hidden">
                {todos.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                        No tasks yet
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() =>
                                        toggleTodo(todo.id)
                                    }
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <span
                                    className={`ml-2 flex-grow ${
                                        todo.completed
                                            ? 'line-through text-gray-400'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {todo.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div
                className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center cursor-pointer rounded-b-lg"
                onClick={() => router?.push('/todos')}
            >
                View all tasks
            </div>
        </div>
    );
};

export default TodoWidget;