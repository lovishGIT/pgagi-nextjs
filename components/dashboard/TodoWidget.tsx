import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

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
        };

        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const completedCount = todos.filter(
        (todo) => todo.completed
    ).length;
    const totalCount = todos.length;

    return (
        <div className="bg-white text-black rounded-xl shadow h-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <h3 className="font-bold text-lg">Todo List</h3>
                <p className="text-sm text-green-100">
                    {completedCount} of {totalCount} tasks completed
                </p>
            </div>

            <div className="p-4 flex-grow overflow-auto">
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

            <div className="p-4 border-t">
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
                        Add
                    </button>
                </form>
            </div>

            <div
                className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center cursor-pointer"
                onClick={() => router.push('/todos')}
            >
                View all tasks
            </div>
        </div>
    );
};

export default TodoWidget;