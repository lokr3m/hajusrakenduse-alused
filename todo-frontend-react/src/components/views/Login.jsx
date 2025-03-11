import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(form);
            setToken(data.access_token);
            localStorage.setItem("token", data.access_token);
            navigate("/tasks");
        } catch (error) {
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
