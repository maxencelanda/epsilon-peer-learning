import { useEffect, useState } from "react"


export default function Todos() {

    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data);
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div>
            {todos.map((todo) => (
                <p>{todo.item}</p>
            ))}
        </div>
    )
}
