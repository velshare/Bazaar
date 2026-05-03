// ====== ADMIN CONFIG ======
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';
const STORAGE_KEY = 'adminBikesData';

// ====== DEFAULT BIKES DATA ======
const defaultBikes = [
    { id: 1, name: "KTM Duke 200", type: "bike", price: "1,65,000", year: 2020, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Mumbai", image: "../assets/images/KTM-Duke-200.jpg", status: "active" },
    { id: 2, name: "Royal Enfield Classic 350", type: "bike", price: "1,95,000", year: 2019, km: "18,000", fuel: "Petrol", transmission: "Manual", location: "Chennai", image: "../assets/images/Second-hand-Royal-Enfield-Classic-350.jpg", status: "active" },
    { id: 3, name: "Hero Splendor Plus", type: "bike", price: "65,000", year: 2020, km: "22,000", fuel: "Petrol", transmission: "Manual", location: "Delhi", image: "../assets/images/Second-hand-Hero-Splendor-Plus.jpg", status: "active" },
    { id: 4, name: "Honda Shine", type: "bike", price: "85,000", year: 2019, km: "28,000", fuel: "Petrol", transmission: "Manual", location: "Pune", image: "../assets/images/Second-Hand-Honda-Shine-2.jpg", status: "active" },
    { id: 5, name: "Hero Passion Pro", type: "bike", price: "55,000", year: 2018, km: "35,000", fuel: "Petrol", transmission: "Manual", location: "Bangalore", image: "../assets/images/Used-Hero-Passion-Pro.jpg", status: "active" },
    { id: 6, name: "TVS Radeon", type: "bike", price: "48,000", year: 2021, km: "15,000", fuel: "Petrol", transmission: "Manual", location: "Hyderabad", image: "../assets/images/Second-Hand-TVS-Radeon.jpg", status: "active" },
    { id: 7, name: "Bajaj Pulsar 150", type: "bike", price: "75,000", year: 2019, km: "32,000", fuel: "Petrol", transmission: "Manual", location: "Kolkata", image: "../assets/images/images (1).jpeg", status: "active" },
    { id: 8, name: "TVS Apache RTR 160", type: "bike", price: "95,000", year: 2020, km: "20,000", fuel: "Petrol", transmission: "Manual", location: "Ahmedabad", image: "../assets/images/images (2).jpeg", status: "active" },
    { id: 9, name: "Yamaha FZ-S", type: "bike", price: "1,25,000", year: 2021, km: "15,000", fuel: "Petrol", transmission: "Manual", location: "Jaipur", image: "../assets/images/images (3).jpeg", status: "active" },
    { id: 10, name: "Honda CB Hornet 160R", type: "bike", price: "1,05,000", year: 2020, km: "18,000", fuel: "Petrol", transmission: "Manual", location: "Lucknow", image: "../assets/images/images (4).jpeg", status: "active" },
    { id: 11, name: "Suzuki Gixxer", type: "bike", price: "1,15,000", year: 2019, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Indore", image: "../assets/images/images (5).jpeg", status: "active" },
    { id: 12, name: "Bajaj Avenger 220", type: "bike", price: "1,35,000", year: 2020, km: "22,000", fuel: "Petrol", transmission: "Manual", location: "Bhopal", image: "../assets/images/images (6).jpeg", status: "active" },
    { id: 13, name: "Hero Xtreme 200R", type: "bike", price: "1,10,000", year: 2019, km: "28,000", fuel: "Petrol", transmission: "Manual", location: "Nagpur", image: "../assets/images/images (7).jpeg", status: "active" },
    { id: 14, name: "TVS Scooty Zest", type: "bike", price: "45,000", year: 2020, km: "12,000", fuel: "Petrol", transmission: "Automatic", location: "Surat", image: "../assets/images/TVS-Scooty-Zest-used-Bounce-660.jpg", status: "active" },
    { id: 15, name: "Honda Activa 6G", type: "bike", price: "65,000", year: 2021, km: "8,000", fuel: "Petrol", transmission: "Automatic", location: "Vadodara", image: "../assets/images/images (8).jpeg", status: "active" },
    { id: 16, name: "Bajaj Platina 110", type: "bike", price: "42,000", year: 2018, km: "35,000", fuel: "Petrol", transmission: "Manual", location: "Rajkot", image: "../assets/images/images (9).jpeg", status: "active" },
    { id: 17, name: "Hero HF Deluxe", type: "bike", price: "38,000", year: 2019, km: "40,000", fuel: "Petrol", transmission: "Manual", location: "Kanpur", image: "../assets/images/images (10).jpeg", status: "active" },
    { id: 18, name: "TVS Star City Plus", type: "bike", price: "52,000", year: 2020, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Agra", image: "../assets/images/images (11).jpeg", status: "active" },
    { id: 19, name: "Bajaj CT 100", type: "bike", price: "35,000", year: 2018, km: "45,000", fuel: "Petrol", transmission: "Manual", location: "Meerut", image: "../assets/images/images (12).jpeg", status: "active" },
    { id: 20, name: "Honda Dream Yuga", type: "bike", price: "48,000", year: 2019, km: "30,000", fuel: "Petrol", transmission: "Manual", location: "Varanasi", image: "../assets/images/4.jpg", status: "active" }
];

// ====== DATA HELPERS ======
function getBikes() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultBikes;
}

function saveBikes(bikes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bikes));
}

function getUsers() {
    try {
        const stored = localStorage.getItem('adminUsersData');
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
}

// ====== LOGIN ======
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUsername').value.trim();
    const pass = document.getElementById('adminPassword').value;
    const err = document.getElementById('adminLoginError');

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('adminLoginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        initDashboard();
    } else {
        err.textContent = '❌ Invalid username or password.';
        setTimeout(() => err.textContent = '', 3000);
    }
});

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminLoginScreen').style.display = 'flex';
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
}

// Auto-login if session exists
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('adminLoginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        initDashboard();
    }

    // Sidebar toggle for mobile
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.querySelector('.admin-sidebar').classList.toggle('open');
    });

    // Sidebar nav links
    document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection(this.getAttribute('data-section'));
        });
    });

    // Bike form submit
    document.getElementById('bikeForm').addEventListener('submit', handleBikeFormSubmit);

    // Image file preview
    document.getElementById('bikeImage').addEventListener('change', function() {
        const preview = document.getElementById('bikeImagePreview');
        if (this.files[0]) {
            const reader = new FileReader();
            reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block'; };
            reader.readAsDataURL(this.files[0]);
        } else {
            preview.src = ''; preview.style.display = 'none';
        }
    });
});

// ====== INIT DASHBOARD ======
function initDashboard() {
    updateStats();
    renderRecentBikes();
    renderAllBikes();
    renderUsers();
}

function updateStats() {
    const bikes = getBikes();
    const active = bikes.filter(b => b.status === 'active').length;
    const prices = bikes.map(b => parseInt(b.price.replace(/,/g, '')));
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const cities = [...new Set(bikes.map(b => b.location))].length;

    document.getElementById('statTotalBikes').textContent = bikes.length;
    document.getElementById('statActiveBikes').textContent = active;
    document.getElementById('statAvgPrice').textContent = '₹' + avg.toLocaleString('en-IN');
    document.getElementById('statCities').textContent = cities;
}

// ====== SECTION NAVIGATION ======
function showSection(name) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-link[data-section]').forEach(l => l.classList.remove('active'));

    document.getElementById('section-' + name).classList.add('active');
    document.querySelector(`.sidebar-link[data-section="${name}"]`)?.classList.add('active');

    const titles = { dashboard: 'Dashboard', bikes: 'Manage Bikes', 'add-bike': 'Add New Bike', users: 'Users' };
    document.getElementById('adminPageTitle').textContent = titles[name] || name;

    if (name === 'bikes') renderAllBikes();
    if (name === 'users') renderUsers();
    if (name === 'add-bike' && !document.getElementById('bikeEditId').value) resetBikeForm();

    // Close sidebar on mobile
    document.querySelector('.admin-sidebar').classList.remove('open');
}

// ====== RENDER TABLES ======
function renderRecentBikes() {
    const bikes = getBikes().slice(0, 5);
    document.getElementById('recentBikesTable').innerHTML = buildBikeTable(bikes, true);
}

function renderAllBikes(filter = '') {
    let bikes = getBikes();
    if (filter) bikes = bikes.filter(b => b.name.toLowerCase().includes(filter.toLowerCase()) || b.location.toLowerCase().includes(filter.toLowerCase()));
    document.getElementById('allBikesTable').innerHTML = buildBikeTable(bikes, false);
}

function buildBikeTable(bikes, compact) {
    if (!bikes.length) return `<div class="empty-state"><i class="fas fa-motorcycle"></i><p>No bikes found.</p></div>`;

    const rows = bikes.map(b => `
        <tr>
            <td><img src="${b.image}" class="bike-thumb" onerror="this.src='../assets/images/index.jpg'"></td>
            <td><strong>${b.name}</strong></td>
            <td>₹${b.price}</td>
            <td>${b.year}</td>
            <td>${b.location}</td>
            ${!compact ? `<td><span class="status-badge status-${b.status}">${b.status}</span></td>` : ''}
            <td>
                <div class="action-btns">
                    <button class="btn-edit" onclick="editBike(${b.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-delete" onclick="confirmDelete(${b.id}, '${b.name}')"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </td>
        </tr>`).join('');

    return `<div class="admin-table-wrapper"><table class="admin-table">
        <thead><tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Year</th><th>Location</th>
            ${!compact ? '<th>Status</th>' : ''}
            <th>Actions</th>
        </tr></thead>
        <tbody>${rows}</tbody>
    </table></div>`;
}

function renderUsers() {
    const users = getUsers();
    const container = document.getElementById('usersTable');

    if (!users.length) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-users"></i><p>No registered users yet.</p></div>`;
        return;
    }

    const rows = users.map((u, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.phone || '—'}</td>
            <td>${u.city || '—'}</td>
            <td><span class="status-badge status-active">Active</span></td>
        </tr>`).join('');

    container.innerHTML = `<div class="admin-table-wrapper"><table class="admin-table">
        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
    </table></div>`;
}

function filterAdminBikes() {
    const q = document.getElementById('bikeSearchInput').value;
    renderAllBikes(q);
}

// ====== ADD / EDIT BIKE ======
function handleBikeFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('bikeEditId').value;
    const bike = {
        name: document.getElementById('bikeName').value.trim(),
        price: document.getElementById('bikePrice').value.trim(),
        year: parseInt(document.getElementById('bikeYear').value),
        km: document.getElementById('bikeKm').value.trim(),
        fuel: document.getElementById('bikeFuel').value,
        transmission: document.getElementById('bikeTransmission').value,
        location: document.getElementById('bikeLocation').value.trim(),
        type: 'bike',
        status: 'active'
    };

    const fileInput = document.getElementById('bikeImage');
    const file = fileInput.files[0];

    function saveWithImage(imageSrc) {
        bike.image = imageSrc;
        let bikes = getBikes();
        if (id) {
            const idx = bikes.findIndex(b => b.id == id);
            if (idx > -1) bikes[idx] = { ...bikes[idx], ...bike };
            showAdminToast('✅ Bike updated successfully!', 'success');
        } else {
            bike.id = Date.now();
            bikes.unshift(bike);
            showAdminToast('✅ Bike added successfully!', 'success');
        }
        saveBikes(bikes);
        updateStats();
        resetBikeForm();
        showSection('bikes');
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = e => saveWithImage(e.target.result);
        reader.readAsDataURL(file);
    } else {
        // Keep existing image when editing, use default for new
        const existing = id ? (getBikes().find(b => b.id == id)?.image || '../assets/images/index.jpg') : '../assets/images/index.jpg';
        saveWithImage(existing);
    }
}

function editBike(id) {
    const bike = getBikes().find(b => b.id == id);
    if (!bike) return;

    document.getElementById('bikeEditId').value = bike.id;
    document.getElementById('bikeName').value = bike.name;
    document.getElementById('bikePrice').value = bike.price;
    document.getElementById('bikeYear').value = bike.year;
    document.getElementById('bikeKm').value = bike.km;
    document.getElementById('bikeFuel').value = bike.fuel;
    document.getElementById('bikeTransmission').value = bike.transmission;
    document.getElementById('bikeLocation').value = bike.location;
    document.getElementById('bikeImage').value = '';
    const preview = document.getElementById('bikeImagePreview');
    preview.src = bike.image;
    preview.style.display = 'block';

    document.getElementById('bikeFormTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Bike';
    document.getElementById('bikeFormSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Update Bike';

    showSection('add-bike');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetBikeForm() {
    document.getElementById('bikeForm').reset();
    document.getElementById('bikeEditId').value = '';
    document.getElementById('bikeFormTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Add New Bike';
    document.getElementById('bikeFormSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Save Bike';
    const preview = document.getElementById('bikeImagePreview');
    preview.src = '';
    preview.style.display = 'none';
}

// ====== DELETE ======
let pendingDeleteId = null;

function confirmDelete(id, name) {
    pendingDeleteId = id;
    document.getElementById('deleteModalMsg').textContent = `Are you sure you want to delete "${name}"? This cannot be undone.`;
    document.getElementById('deleteModal').classList.add('show');
    document.getElementById('confirmDeleteBtn').onclick = () => deleteBike(id);
}

function deleteBike(id) {
    let bikes = getBikes();
    bikes = bikes.filter(b => b.id != id);
    saveBikes(bikes);
    closeDeleteModal();
    updateStats();
    renderAllBikes();
    renderRecentBikes();
    showAdminToast('🗑️ Bike deleted successfully!', 'success');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    pendingDeleteId = null;
}

// Close modal on backdrop click
document.getElementById('deleteModal').addEventListener('click', function(e) {
    if (e.target === this) closeDeleteModal();
});

// ====== TOAST ======
function showAdminToast(msg, type = '') {
    const toast = document.getElementById('adminToast');
    toast.textContent = msg;
    toast.className = 'admin-toast show ' + type;
    setTimeout(() => toast.className = 'admin-toast', 3000);
}
