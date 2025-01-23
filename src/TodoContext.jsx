import React, { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState("Vivian");

    // Initialize todos when the component mounts or when the meta tag changes
    useEffect(() => {
        // Set up a MutationObserver to observe changes to the <meta> tag
        const metaTag = document.querySelector('meta[name="description"]');
        if (!metaTag) return;

        const observeMetaTag = (title) => {
            return new Promise((resolve, reject) => {
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
                            try {
                                const parsedData = JSON.parse(metaTag.getAttribute('content'));
                                resolve(parsedData);
                            } catch (error) {
                                reject(error);
                            }
                        }
                    }
                });

                observer.observe(metaTag, { attributes: true });
                document.title = title;

                return () => observer.disconnect();
            });
        };

        observeMetaTag('Get Todos')
            .then(parsedData => {
                setTodos(parsedData);
                return observeMetaTag('Get Username');
            })
            .then(data => {
                setUsername(data.username);
            })
            .catch(error => {
                alert(error.message);
            });

    }, []);

    return (
        <TodoContext.Provider value={{ todos, setTodos, username, setUsername }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;

// Custom hook for user-related logic
export const useUser = () => {
    const { username, setUsername } = useContext(TodoContext);
    return { username, setUsername };
};

// Custom hook for theme-related logic
export const useTodos = () => {
    const { todos, setTodos } = useContext(TodoContext);
    return { todos, setTodos };
};