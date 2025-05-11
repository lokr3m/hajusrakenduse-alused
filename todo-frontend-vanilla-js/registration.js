document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect the form data
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://demo2.z-bit.ee/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email,
                newPassword: password,
                firstname: firstName,
                lastname: lastName
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Redirecting to login...');
            window.location.href = 'index.html';  // Redirect to login page
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Something went wrong. Please try again.');
    }
});
