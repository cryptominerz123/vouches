document.addEventListener('DOMContentLoaded', () => {
    loadVouches();
    checkAdminStatus();
});

function toggleVouchForm() {
    const form = document.getElementById('vouch-form');
    form.classList.toggle('hidden');
}

function addVouch() {
    const text = document.getElementById('vouch-text').value;
    if (text.trim() === '') return;

    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.push(text);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    document.getElementById('vouch-text').value = '';
    loadVouches();
}

function loadVouches() {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    const vouchList = document.getElementById('vouch-list');
    vouchList.innerHTML = '';

    vouches.forEach((vouch, index) => {
        const div = document.createElement('div');
        div.className = 'vouch';
        div.innerText = vouch;
        vouchList.appendChild(div);
    });

    if (isAdmin()) {
        const adminVouchList = document.getElementById('admin-vouch-list');
        adminVouchList.innerHTML = '';

        vouches.forEach((vouch, index) => {
            const div = document.createElement('div');
            div.className = 'vouch';
            div.innerHTML = `
                <p>${vouch}</p>
                <button onclick="deleteVouch(${index})">Delete</button>
            `;
            adminVouchList.appendChild(div);
        });
    }
}

function deleteVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches'));
    vouches.splice(index, 1);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    loadVouches();
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin') {
        localStorage.setItem('isAdmin', 'true');
        checkAdminStatus();
    } else {
        alert('Incorrect password');
    }
}

function checkAdminStatus() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    document.getElementById('admin-login').classList.toggle('hidden', isAdmin);
    document.getElementById('admin-panel').classList.toggle('hidden', !isAdmin);
    loadVouches();
}

function logout() {
    localStorage.removeItem('isAdmin');
    checkAdminStatus();
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}
