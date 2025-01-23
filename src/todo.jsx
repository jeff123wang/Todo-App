import React from "react";
import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";

export const Todo = ({ todo, handleChange }) => {
    return (
        <ListItem>
            {/* Checkbox to mark todo as completed */}
            <Checkbox
                edge="start"
                checked={todo.status === "completed"}
                onChange={handleChange}
                disableRipple
            />

            {/* Strikethrough text if todo is completed */}
            <ListItemText
                primary={todo.detail}
                sx={{
                    textDecoration: todo.status === "completed" ? "line-through" : "none",
                    color: todo.status === "completed" ? "text.disabled" : "text.primary",
                }}
            />
        </ListItem>
    );
};