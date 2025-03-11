const Logout = ({ setToken }) => {
  const handleLogout = () => {
      setToken(null);
      localStorage.removeItem("token");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
