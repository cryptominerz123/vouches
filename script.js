document.addEventListener('DOMContentLoaded', () => {
    loadVouches();
    checkAdminStatus();
});

function toggleVouchForm() {
    const form = document.getElementById('vouch-form');
    form.classList.toggle('hidden');
}

function addVouch() {
    const vouchText = document.getElementById('vouch-text').value;
    if (!vouchText.trim()) {
        alert("Please enter a vouch to submit.");
        return;
    }

    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.push(vouchText);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    document.getElementById('vouch-text').value = ''; // Clear the textarea after submitting
    loadVouches(); // Reload the list of vouches
    toggleVouchForm(); // Optionally close the form if needed
}

function loadVouches() {
    const vouchList = document.getElementById('vouch-list');
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouchList.innerHTML = vouches.map(vouch => `<div class="vouch">${vouch}</div>`).join('');
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin') {
        sessionStorage.setItem('admin', 'true');
        checkAdminStatus();
    } else {
        alert('Incorrect password');
    }
}

function logout() {
    sessionStorage.removeItem('admin');
    window.location.reload();
}

function checkAdminStatus() {
    const isAdmin = sessionStorage.getItem('admin') === 'true';
    const adminPanel = document.getElementById('admin-panel');
    const adminLogin = document.getElementById('admin-login');
    if (adminPanel && adminLogin) {
        adminLogin.classList.toggle('hidden', isAdmin);
        adminPanel.classList.toggle('hidden', !isAdmin);
    }
    if (isAdmin) loadVouches();
}
