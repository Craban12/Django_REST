import React from "react";
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.active}
            </td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <table>
            <th>
                user
            </th>
            <th>
                project
            </th>
            <th>
                text
            </th>
            <th>
                created
            </th>
            <th>
                updated
            </th>
            <th>
                status
            </th>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodoList