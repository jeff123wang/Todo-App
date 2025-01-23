import React, { useState } from "react";
import { Todo } from "./todo";
import { useTodos } from './TodoContext';
import { Helmet } from "react-helmet";

export const RenderTodo = React.memo(({ updateMetaAndTitle }) => {
    const { todos, setTodos } = useTodos();

    // State to control the meta tag content
    const [metaDescriptionContent, setMetaDescriptionContent] = useState("");
    // State for title
    const [pageTitle, setPageTitle] = useState("");

    const updateTodo = (todoToUpdate) => {
        // Toggle the status of the todo
        const newStatus = todoToUpdate.status === "completed" ? "new" : "completed";
        todoToUpdate.status = newStatus;

        // Send data to the backend
        try {
            // Update the meta description content with updated todo
            const titleAndMeta = {
                meta: JSON.stringify(todoToUpdate),
                title: `PUT todo - ${Date.now()}`
            };

            updateMetaAndTitle(titleAndMeta);

            // update data in front end.
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === todoToUpdate.id ? { ...todo, status: newStatus } : todo
                )
            );

        } catch (error) {
            alert('Error:', error.message);
        }
    };

    return (
        <>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} handleChange={() => updateTodo(todo)} />
            ))}
        </>
    );
});