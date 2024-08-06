document.addEventListener('DOMContentLoaded', () => {
    loadVouches();
    checkAdminStatus(); // Ensure the admin panel shows or hides correctly on load
});

function toggleVouchForm() {
    const form = document.getElementById('vouch-form');
    form.classList.toggle('hidden'); // Toggle the form visibility
}

function addVouch() {
    const text = document.getElementById('vouch-text').value;
    if (text.trim() === '') {
        alert('Please enter text for the vouch.');
        return;
    }

    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.push(text);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    document.getElementById('vouch-text').value = ''; // Clear the input after adding
    loadVouches();
}

function loadVouches() {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    const vouchList = document.getElementById('vouch-list');
    vouchList.innerHTML = vouches.map((vouch, index) => `
        <div class="vouch">
            <p>${vouch}</p>
            <button onclick="editVouch(${index})">Edit</button>
            <button onclick="deleteVouch(${index})">Delete</button>
        </div>
    `).join('');

    if (isAdmin()) {
        loadAdminVouches();
    }
}

function isAdmin() {
    return sessionStorage.getItem('admin') === 'true';
}

function checkAdminStatus() {
    const isAdmin = sessionStorage.getItem('admin') === 'true';
    const adminLogin = document.getElementById('admin-login');
    const adminPanel = document.getElementById('admin-panel');
    if (adminLogin && adminPanel) {
        adminLogin.classList.toggle('hidden', isAdmin);
        adminPanel.classList.toggle('hidden', !isAdmin);
    }
    if (isAdmin) {
        loadAdminVouches(); // Load vouches specifically for admin
    }
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin') { // Simplicity for demonstration
        sessionStorage.setItem('admin', 'true');
        checkAdminStatus();
    } else {
        alert('Incorrect password');
    }
}

function logout() {
    sessionStorage.removeItem('admin');
    checkAdminStatus(); // Refresh status to hide admin panel
}

function loadAdminVouches() {
    // Assuming this function refreshes the admin-specific list of vouches
    loadVouches(); // Re-use loadVouches or differentiate if needed
}

function editVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches'));
    const newVouchText = prompt("Edit your vouch:", vouches[index]);
    if (newVouchText !== null) {
        vouches[index] = newVouchText;
        localStorage.setItem('vouches', JSON.stringify(vouches));
        loadVouches(); // Update the visible list
    }
}

function deleteVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches'));
    vouches.splice(index, 1);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    loadVouches(); // Update the list after deletion
}
