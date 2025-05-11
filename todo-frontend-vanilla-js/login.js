document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent default form submission

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://demo2.z-bit.ee/users/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password })
        });

        const data = await response.json();
        if (response.ok) {
            // Store auth token in localStorage
            localStorage.setItem('authToken', data.access_token);

            // Redirect to task list
            window.location.href = 'tasklist.html';
        } else {
            document.getElementById('errorMessage').innerText = data.message || 'Login failed!';
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMessage').innerText = 'Something went wrong. Please try again.';
        document.getElementById('errorMessage').style.display = 'block';
    }
});

// Navigate to registration.html when the Register button is clicked
document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = 'registration.html';
});
