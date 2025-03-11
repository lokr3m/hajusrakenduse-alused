import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/views/Login";
import Logout from "./components/views/Logout";
import TaskList from "./components/views/TaskList";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <Router>
            <div>
                {token && <Logout setToken={setToken} />}
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/tasks" element={token ? <TaskList token={token} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
