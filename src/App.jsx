import React, { useState, useRef, useEffect } from "react";
import { useTodos, useUser } from './TodoContext';
import { Container, TextField, Button, Typography } from '@mui/material';
import { RenderTodo } from "./renderTodo";
import { Helmet } from "react-helmet";

const App = () => {
  const { todos, setTodos } = useTodos();
  const [metaDescriptionContent, setMetaDescriptionContent] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const inputRef = useRef("");
  const { username, setUsername } = useUser();

  const handleChange = (e) => {
    inputRef.current = e.target.value; // Store the value in ref
  };

  const clearTodos = () => {
    setTodos([])
  }

  // move the handler from button to form
  // so when hit enter key, it will trigger the submit event. 
  const addTodo = (e) => {
    e.preventDefault(); // Prevent form submission (page refresh)
    const todo = inputRef.current.trim();

    if (!todo) {
      alert("Todo can't be empty")
      return
    };

    const newTodo = {
      id: todos.length + 1,
      detail: todo,
      status: "new",
    };

    setTodos([...todos, newTodo]);
    inputRef.current = ""; // Clear the input ref after adding

    updateMetaAndTitle({
      meta: JSON.stringify(newTodo),
      title: `POST todo - ${Date.now()}`
    });
    e.target.reset();
  };

  // Function to update meta tag and title from RenderTodo
  const updateMetaAndTitle = ({ meta, title }) => {
    setMetaDescriptionContent(meta);
    setPageTitle(title);
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
        <meta name="description" content={metaDescriptionContent} />
        <title>{pageTitle}</title>
      </Helmet>
      {/* change vivian to current windows user name
      pass from vba */}
      <Typography variant="h4" gutterBottom> {username} ,Welcome to my todo app</Typography>
      <form noValidate autoComplete="off" onSubmit={addTodo}>
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          defaultValue={inputRef.current} // Use defaultValue instead of value
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>Add</Button>
      </form>
      <Button variant="outlined" color="secondary" onClick={clearTodos} fullWidth>Clear</Button>
      {/* Pass updateMetaAndTitle as a prop to RenderTodo */}
      <RenderTodo updateMetaAndTitle={updateMetaAndTitle} />
    </Container>
  );
};

export default App;