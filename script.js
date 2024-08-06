document.addEventListener('DOMContentLoaded', () => {
    loadVouches();
    checkAdminStatus();
});

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'adminpassword') {
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
}

function editVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches'));
    const newVouch = prompt("Edit your vouch:", vouches[index]);
    if (newVouch !== null) {
        vouches[index] = newVouch;
        localStorage.setItem('vouches', JSON.stringify(vouches));
        loadVouches();
    }
}

function deleteVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches'));
    vouches.splice(index, 1);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    loadVouches();
}

function checkAdminStatus() {
    const admin = sessionStorage.getItem('admin') === 'true';
    document.getElementById('admin-login').classList.toggle('hidden', admin);
    document.getElementById('admin-panel').classList.toggle('hidden', !admin);
    if (admin) loadVouches();
}

function toggleSiteSettings() {
    const settings = document.getElementById('site-settings');
    settings.classList.toggle('hidden');
}

function updateSiteTitle() {
    const newTitle = document.getElementById('site-title').value;
    if (newTitle.trim() !== '') {
        document.querySelector('header h1').innerText = newTitle;
        alert('Site title updated!');
    }
}
