document.addEventListener('DOMContentLoaded', () => {
    loadVouches();
    checkAdminStatus();
});

function toggleVouchForm() {
    const form = document.getElementById('vouch-form');
    form.classList.toggle('hidden');
}

function addVouch() {
    let text = document.getElementById('vouch-text').value.trim();
    if (text === '') return;

    text = formatVouchText(text);

    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    vouches.push(text);
    localStorage.setItem('vouches', JSON.stringify(vouches));
    document.getElementById('vouch-text').value = '';
    loadVouches();
}

function loadVouches() {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    const vouchList = document.getElementById('vouch-list');
    if (vouchList) {
        vouchList.innerHTML = '';
        vouches.forEach((vouch, index) => {
            const div = document.createElement('div');
            div.className = 'vouch';
            div.innerHTML = `<p>${vouch}</p>`;
            vouchList.appendChild(div);

            // Adding animation
            setTimeout(() => {
                div.classList.add('show');
            }, 100);
        });
    }

    if (isAdmin()) {
        loadAdminVouches();
    }
}

function formatVouchText(text) {
    // Remove any leading "+rep", "+vouch", or "vouch"
    text = text.replace(/^\+?(rep|vouch)\s*/i, '');
    // Prepend "+rep"
    return `+rep ${text}`;
}

function isAdmin() {
    return sessionStorage.getItem('admin') === 'true';
}

function checkAdminStatus() {
    const isAdmin = isAdmin();
    document.getElementById('admin-login').classList.toggle('hidden', isAdmin);
    document.getElementById('admin-panel').classList.toggle('hidden', !isAdmin);
    if (isAdmin) {
        loadAdminVouches();
    }
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin') { // Replace with a more secure method
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
        div.innerHTML = `<p>${vouch}</p>
            <button onclick="editVouch(${index})">Edit</button>
            <button onclick="deleteVouch(${index})">Delete</button>`;
        adminVouchList.appendChild(div);
    });
}

function editVouch(index) {
    const vouches = JSON.parse(localStorage.getItem('vouches')) || [];
    let newVouchText = prompt("Edit your vouch:", vouches[index]);
    if (newVouchText !== null) {
        newVouchText = formatVouchText(newVouchText.trim());
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

function deleteAllVouches() {
    localStorage.setItem('vouches', JSON.stringify([]));
    loadAdminVouches();
    loadVouches();
}

function adminAddVouch() {
    let text = document.getElementById('new-vouch-text').value.trim();
    if (text === '') return;

    text = formatVouchText(text);

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
        alert('Site title updated!');
    }
}
