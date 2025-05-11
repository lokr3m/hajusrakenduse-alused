// Logout user
function logoutUser() {
    localStorage.removeItem('authToken'); // Remove token from storage
    token = null;
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to login page
}

// Attach event listener to logout button
window.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});
