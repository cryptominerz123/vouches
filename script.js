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
        div.innerHTML = `
            <p>${vouch}</p>
        `;
        vouchList.appendChild(div);

        // Adding animation
        setTimeout(() => {
            div.classList.add('show');
        }, 100);
    });

    if (isAdmin()) {
        loadAdminVouches();
    }
}

function isAdmin() {
    return sessionStorage.getItem('admin') === 'true';
}

function checkAdminStatus() {
    if (isAdmin()) {
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        loadAdminVouches();
    }
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'adminpassword') { // Replace with a more secure method
        sessionStorage.setItem('admin', 'true');
        checkAdminStatus();
    } else {
        alert('Incorrect password');
    }
}

function logout() {
    sessionStorage.removeItem('admin');
    location.reload();
}

function loadAdminVouches() {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    const adminVouchList = document.getElementById('admin-vouch-list');
    adminVouchList.innerHTML = '';

    vouches.forEach((vouch, index) => {
        const div = document.createElement('div');
        div.className = 'vouch';
        div.innerHTML = `
            <p>${vouch}</p>
            <button onclick="editVouch(${index})">Edit</button>
            <button onclick="deleteVouch(${index})">Delete</button>
        `;
        adminVouchList.appendChild(div);
    });
}

function editVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    const newVouchText = prompt("Edit your vouch:", vouches[index]);
    if (newVouchText !== null) {
        vouches[index] = newVouchText;
        localStorage.setItem('vouches', JSON.stringify(vouches));
        loadAdminVouches();
        loadVouches();
    }
}

function deleteVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.splice(index, 1);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    loadAdminVouches();
    loadVouches();
}

function adminAddVouch() {
    const text = document.getElementById('new-vouch-text').value;
    if (text.trim() === '') return;

    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.push(text);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    document.getElementById('new-vouch-text').value = '';
    loadAdminVouches();
    loadVouches();
}

function toggleSiteSettings() {
    const settings = document.getElementById('site-settings');
    settings.classList.toggle('hidden');
}

function updateSiteTitle() {
    const newTitle = document.getElementById('site-title').value;
    if (newTitle.trim() !== '') {
        document.querySelector('header h1').innerText = newTitle;
        alert('Site title updated!'); // Placeholder for actual site settings persistence
    }
}
