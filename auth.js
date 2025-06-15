// Admin credentials (in a real application, these would be stored securely on the server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // In a real application, this would be hashed
};

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const postNoticeBtn = document.getElementById('postNoticeBtn');

    if (isLoggedIn === 'true') {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (postNoticeBtn) postNoticeBtn.style.display = 'inline-block';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (postNoticeBtn) postNoticeBtn.style.display = 'none';
    }
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set login status
        localStorage.setItem('isAdminLoggedIn', 'true');
        // Redirect to post page
        window.location.href = 'post.html';
    } else {
        loginMessage.textContent = 'Invalid username or password';
        loginMessage.style.color = 'red';
    }
});

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'index.html';
});

// Check authentication status when page loads
checkAuth(); 