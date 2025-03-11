import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../../services/api";

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks(token);
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        fetchTasks();
    };

    const handleToggle = async (task) => {
        await updateTask(task.id, { marked_as_done: !task.marked_as_done }, token);
        fetchTasks();
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.title} - {task.marked_as_done ? "Done" : "Pending"}</span>
                        <button onClick={() => handleToggle(task)}>Toggle</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
