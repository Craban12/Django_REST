import React from "react";


const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todos}) => {
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
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList