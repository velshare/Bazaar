// Load bikes from admin storage if available, else use default
const storedBikes = localStorage.getItem('adminBikesData');
const allBikesData = storedBikes ? JSON.parse(storedBikes) : [
    { id: 1, name: "KTM Duke 200", type: "bike", price: "1,65,000", year: 2020, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Mumbai", image: "../assets/images/KTM-Duke-200.jpg" },
    { id: 2, name: "Royal Enfield Classic 350", type: "bike", price: "1,95,000", year: 2019, km: "18,000", fuel: "Petrol", transmission: "Manual", location: "Chennai", image: "../assets/images/Second-hand-Royal-Enfield-Classic-350.jpg" },
    { id: 3, name: "Hero Splendor Plus", type: "bike", price: "65,000", year: 2020, km: "22,000", fuel: "Petrol", transmission: "Manual", location: "Delhi", image: "../assets/images/Second-hand-Hero-Splendor-Plus.jpg" },
    { id: 4, name: "Honda Shine", type: "bike", price: "85,000", year: 2019, km: "28,000", fuel: "Petrol", transmission: "Manual", location: "Pune", image: "../assets/images/Second-Hand-Honda-Shine-2.jpg" },
    { id: 5, name: "Hero Passion Pro", type: "bike", price: "55,000", year: 2018, km: "35,000", fuel: "Petrol", transmission: "Manual", location: "Bangalore", image: "../assets/images/Used-Hero-Passion-Pro.jpg" },
    { id: 6, name: "TVS Radeon", type: "bike", price: "48,000", year: 2021, km: "15,000", fuel: "Petrol", transmission: "Manual", location: "Hyderabad", image: "../assets/images/Second-Hand-TVS-Radeon.jpg" },
    { id: 7, name: "Bajaj Pulsar 150", type: "bike", price: "75,000", year: 2019, km: "32,000", fuel: "Petrol", transmission: "Manual", location: "Kolkata", image: "../assets/images/images (1).jpeg" },
    { id: 8, name: "TVS Apache RTR 160", type: "bike", price: "95,000", year: 2020, km: "20,000", fuel: "Petrol", transmission: "Manual", location: "Ahmedabad", image: "../assets/images/images (2).jpeg" },
    { id: 9, name: "Yamaha FZ-S", type: "bike", price: "1,25,000", year: 2021, km: "15,000", fuel: "Petrol", transmission: "Manual", location: "Jaipur", image: "../assets/images/images (3).jpeg" },
    { id: 10, name: "Honda CB Hornet 160R", type: "bike", price: "1,05,000", year: 2020, km: "18,000", fuel: "Petrol", transmission: "Manual", location: "Lucknow", image: "../assets/images/images (4).jpeg" },
    { id: 11, name: "Suzuki Gixxer", type: "bike", price: "1,15,000", year: 2019, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Indore", image: "../assets/images/images (5).jpeg" },
    { id: 12, name: "Bajaj Avenger 220", type: "bike", price: "1,35,000", year: 2020, km: "22,000", fuel: "Petrol", transmission: "Manual", location: "Bhopal", image: "../assets/images/images (6).jpeg" },
    { id: 13, name: "Hero Xtreme 200R", type: "bike", price: "1,10,000", year: 2019, km: "28,000", fuel: "Petrol", transmission: "Manual", location: "Nagpur", image: "../assets/images/images (7).jpeg" },
    { id: 14, name: "TVS Scooty Zest", type: "bike", price: "45,000", year: 2020, km: "12,000", fuel: "Petrol", transmission: "Automatic", location: "Surat", image: "../assets/images/TVS-Scooty-Zest-used-Bounce-660.jpg" },
    { id: 15, name: "Honda Activa 6G", type: "bike", price: "65,000", year: 2021, km: "8,000", fuel: "Petrol", transmission: "Automatic", location: "Vadodara", image: "../assets/images/images (8).jpeg" },
    { id: 16, name: "Bajaj Platina 110", type: "bike", price: "42,000", year: 2018, km: "35,000", fuel: "Petrol", transmission: "Manual", location: "Rajkot", image: "../assets/images/images (9).jpeg" },
    { id: 17, name: "Hero HF Deluxe", type: "bike", price: "38,000", year: 2019, km: "40,000", fuel: "Petrol", transmission: "Manual", location: "Kanpur", image: "../assets/images/images (10).jpeg" },
    { id: 18, name: "TVS Star City Plus", type: "bike", price: "52,000", year: 2020, km: "25,000", fuel: "Petrol", transmission: "Manual", location: "Agra", image: "../assets/images/images (11).jpeg" },
    { id: 19, name: "Bajaj CT 100", type: "bike", price: "35,000", year: 2018, km: "45,000", fuel: "Petrol", transmission: "Manual", location: "Meerut", image: "../assets/images/images (12).jpeg" },
    { id: 20, name: "Honda Dream Yuga", type: "bike", price: "48,000", year: 2019, km: "30,000", fuel: "Petrol", transmission: "Manual", location: "Varanasi", image: "../assets/images/4.jpg" }
];

const vehiclesData = allBikesData.slice(0, 3);

// ====== DOM ELEMENTS ======
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const authModal = document.getElementById('authModal');
const sellModal = document.getElementById('sellModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const sellNowBtn = document.getElementById('sellNowBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const vehiclesGrid = document.getElementById('vehiclesGrid');
const carouselContainer = document.getElementById('carouselContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const navLinks = document.querySelectorAll('.nav-link');
const uploadZone = document.getElementById('uploadZone');
const photoUpload = document.getElementById('photoUpload');

let currentIndex = 0;
let itemsPerView = 3;
let showingAll = false;
let compareList = []; // max 2 bikes

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    // Load vehicles
    renderVehicles(vehiclesData);
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Set active nav link
    setActiveNavLink();
});

// ====== RENDER FUNCTIONS ======
function renderAllVehiclesGrid(vehicles) {
    carouselContainer.innerHTML = '';
    carouselContainer.style.transform = 'none';
    carouselContainer.style.display = 'grid';
    carouselContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    carouselContainer.style.gap = '2rem';
    
    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.setAttribute('data-type', vehicle.type);
        
        vehicleCard.innerHTML = `
            <div class="vehicle-badge">${vehicle.type === 'car' ? 'Car' : 'Bike'}</div>
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}">
            </div>
            <div class="vehicle-info">
                <h3 class="vehicle-title">${vehicle.name}</h3>
                <div class="vehicle-price">₹${vehicle.price}</div>
                <div class="vehicle-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${vehicle.year}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${vehicle.km} km</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.fuel}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-cog"></i>
                        <span>${vehicle.transmission}</span>
                    </div>
                </div>
                <div class="vehicle-actions">
                    <button class="btn btn-outline view-details" data-id="${vehicle.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-primary buy-now" data-id="${vehicle.id}">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                </div>
                <button class="btn btn-compare" data-id="${vehicle.id}" id="compare-btn-${vehicle.id}">
                    <i class="fas fa-balance-scale"></i> Compare
                </button>
            </div>
        `;
        
        carouselContainer.appendChild(vehicleCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showVehicleDetails(id);
        });
    });
    
    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            buyVehicle(id);
        });
    });

    document.querySelectorAll('.btn-compare').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleCompare(parseInt(this.getAttribute('data-id')));
        });
    });

    // Refresh compare button states
    compareList.forEach(id => {
        const btn = document.getElementById(`compare-btn-${id}`);
        if (btn) btn.classList.add('active');
    });
}

function renderVehicles(vehicles) {
    carouselContainer.innerHTML = '';
    carouselContainer.style.display = 'flex';
    carouselContainer.style.gridTemplateColumns = '';
    
    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.setAttribute('data-type', vehicle.type);
        
        vehicleCard.innerHTML = `
            <div class="vehicle-badge">${vehicle.type === 'car' ? 'Car' : 'Bike'}</div>
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}">
            </div>
            <div class="vehicle-info">
                <h3 class="vehicle-title">${vehicle.name}</h3>
                <div class="vehicle-price">₹${vehicle.price}</div>
                <div class="vehicle-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${vehicle.year}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${vehicle.km} km</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.fuel}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-cog"></i>
                        <span>${vehicle.transmission}</span>
                    </div>
                </div>
                <div class="vehicle-actions">
                    <button class="btn btn-outline view-details" data-id="${vehicle.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-primary buy-now" data-id="${vehicle.id}">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                </div>
                <button class="btn btn-compare" data-id="${vehicle.id}" id="compare-btn-${vehicle.id}">
                    <i class="fas fa-balance-scale"></i> Compare
                </button>
            </div>
        `;
        
        carouselContainer.appendChild(vehicleCard);
    });
    
    updateCarousel();
    
    // Add event listeners to new buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showVehicleDetails(id);
        });
    });
    
    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            buyVehicle(id);
        });
    });

    document.querySelectorAll('.btn-compare').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleCompare(parseInt(this.getAttribute('data-id')));
        });
    });

    // Refresh compare button states
    compareList.forEach(id => {
        const btn = document.getElementById(`compare-btn-${id}`);
        if (btn) btn.classList.add('active');
    });
}

function updateCarousel() {
    const totalItems = carouselContainer.children.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const translateX = -(currentIndex * (300 + 32)); // card width + gap
    carouselContainer.style.transform = `translateX(${translateX}px)`;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

// ====== EVENT HANDLERS ======
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Auth modal
    loginBtn.addEventListener('click', () => openModal('authModal', 'login'));
    registerBtn.addEventListener('click', () => openModal('authModal', 'register'));

    // Sell modal
    sellNowBtn.addEventListener('click', () => openModal('sellModal'));
    // View all bikes
    viewAllBtn.addEventListener('click', () => {
        renderAllVehiclesGrid(allBikesData);
        showingAll = true;
        viewAllBtn.style.display = 'none';
        // Hide carousel controls
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    });
    
    // Carousel navigation
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalItems = carouselContainer.children.length;
        const maxIndex = Math.max(0, totalItems - itemsPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterVehicles(filter);
        });
    });

    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submissions
    document.getElementById('loginFormData').addEventListener('submit', handleLogin);
    document.getElementById('registerFormData').addEventListener('submit', handleRegister);
    document.getElementById('sellVehicleForm').addEventListener('submit', handleSellVehicle);
    document.getElementById('contactForm').addEventListener('submit', handleContact);

    // Photo upload
    if (uploadZone && photoUpload) {
        uploadZone.addEventListener('click', () => photoUpload.click());
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--primary)';
            uploadZone.style.background = 'rgba(255, 77, 0, 0.05)';
        });
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = 'var(--light-gray)';
            uploadZone.style.background = 'white';
        });
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--light-gray)';
            uploadZone.style.background = 'white';
            handleImageUpload(e.dataTransfer.files);
        });
        photoUpload.addEventListener('change', (e) => handleImageUpload(e.target.files));
    }
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ====== MODAL FUNCTIONS ======
function openModal(modalId, tab = 'login') {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (modalId === 'authModal') {
        switchAuthTab(tab);
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function switchAuthTab(tabName) {
    // Update tabs
    authTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Update forms
    authForms.forEach(form => {
        form.classList.toggle('active', form.id === `${tabName}Form`);
    });
}

// ====== VEHICLE FUNCTIONS ======
function filterVehicles(filter) {
    let filteredVehicles;
    
    if (filter === 'all') {
        filteredVehicles = showingAll ? allBikesData : vehiclesData;
    } else if (filter === 'car') {
        filteredVehicles = (showingAll ? allBikesData : vehiclesData).filter(v => v.type === 'car');
    } else if (filter === 'bike') {
        filteredVehicles = (showingAll ? allBikesData : vehiclesData).filter(v => v.type === 'bike');
    } else if (filter === 'luxury') {
        filteredVehicles = (showingAll ? allBikesData : vehiclesData).filter(v => v.price.includes(',') && parseInt(v.price.replace(/,/g, '')) > 1000000);
    }
    
    if (showingAll) {
        renderAllVehiclesGrid(filteredVehicles);
    } else {
        renderVehicles(filteredVehicles);
    }
}

function showVehicleDetails(id) {
    const vehicle = vehiclesData.find(v => v.id == id) || allBikesData.find(v => v.id == id);
    if (vehicle) {
        showDetailsModal(vehicle);
    }
}

function showDetailsModal(vehicle) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
                    <div>
                        <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem;">
                            <button class="btn btn-primary" onclick="buyVehicle(${vehicle.id}); closeAllModals();" style="width: 100%;">
                                <i class="fas fa-shopping-cart"></i> Buy Now
                            </button>
                            <button class="btn btn-outline" onclick="contactSeller('${vehicle.name}')" style="width: 100%;">
                                <i class="fas fa-phone"></i> Contact
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h2 style="color: var(--secondary); margin-bottom: 1rem;">${vehicle.name}</h2>
                        <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary); margin-bottom: 1.5rem;">₹${vehicle.price}</div>
                        
                        <div style="display: grid; gap: 1rem;">
                            <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f8f9fa; border-radius: 8px;">
                                <span style="font-weight: 600;"><i class="fas fa-calendar" style="color: var(--primary); margin-right: 8px;"></i>Year:</span>
                                <span>${vehicle.year}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f8f9fa; border-radius: 8px;">
                                <span style="font-weight: 600;"><i class="fas fa-tachometer-alt" style="color: var(--primary); margin-right: 8px;"></i>Kilometers:</span>
                                <span>${vehicle.km} km</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f8f9fa; border-radius: 8px;">
                                <span style="font-weight: 600;"><i class="fas fa-gas-pump" style="color: var(--primary); margin-right: 8px;"></i>Fuel Type:</span>
                                <span>${vehicle.fuel}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f8f9fa; border-radius: 8px;">
                                <span style="font-weight: 600;"><i class="fas fa-cog" style="color: var(--primary); margin-right: 8px;"></i>Transmission:</span>
                                <span>${vehicle.transmission}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: #f8f9fa; border-radius: 8px;">
                                <span style="font-weight: 600;"><i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 8px;"></i>Location:</span>
                                <span>${vehicle.location}</span>
                            </div>
                        </div>
                        
                        <div style="margin-top: 1.5rem; padding: 1rem; background: #e8f5e8; border-radius: 8px; border-left: 4px solid var(--success);">
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;"><i class="fas fa-check-circle"></i> Verified Bike</h4>
                            <p style="margin: 0; font-size: 0.9rem;">✓ Documents verified<br>✓ Quality checked<br>✓ Ready to ride</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ====== COMPARE FUNCTIONS ======
function toggleCompare(id) {
    const idx = compareList.indexOf(id);
    if (idx > -1) {
        compareList.splice(idx, 1);
    } else {
        if (compareList.length >= 2) {
            showToast('You can only compare 2 bikes at a time.');
            return;
        }
        compareList.push(id);
    }
    updateCompareBar();
    const btn = document.getElementById(`compare-btn-${id}`);
    if (btn) btn.classList.toggle('active', compareList.includes(id));
}

function updateCompareBar() {
    let bar = document.getElementById('compareBar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'compareBar';
        bar.className = 'compare-bar';
        document.body.appendChild(bar);
    }

    if (compareList.length === 0) {
        bar.style.display = 'none';
        return;
    }

    bar.style.display = 'flex';
    const slots = compareList.map(id => {
        const v = allBikesData.find(b => b.id === id);
        return `<div class="compare-slot">
            <img src="${v.image}" alt="${v.name}">
            <span>${v.name}</span>
            <button onclick="toggleCompare(${v.id})" title="Remove"><i class="fas fa-times"></i></button>
        </div>`;
    }).join('');

    const emptySlots = compareList.length < 2
        ? `<div class="compare-slot empty"><i class="fas fa-plus"></i><span>Add a bike</span></div>`
        : '';

    bar.innerHTML = `
        <div class="compare-bar-inner">
            <span class="compare-bar-title"><i class="fas fa-balance-scale"></i> Compare Bikes</span>
            <div class="compare-slots">${slots}${emptySlots}</div>
            <div class="compare-bar-actions">
                ${compareList.length === 2 ? `<button class="btn btn-primary" onclick="showCompareModal()"><i class="fas fa-columns"></i> Compare Now</button>` : ''}
                <button class="btn btn-outline" onclick="clearCompare()">Clear</button>
            </div>
        </div>
    `;
}

function clearCompare() {
    compareList.forEach(id => {
        const btn = document.getElementById(`compare-btn-${id}`);
        if (btn) btn.classList.remove('active');
    });
    compareList = [];
    updateCompareBar();
}

function showCompareModal() {
    const [a, b] = compareList.map(id => allBikesData.find(v => v.id === id));
    const fields = [
        { label: 'Price', key: 'price', prefix: '₹' },
        { label: 'Year', key: 'year' },
        { label: 'Kilometers', key: 'km', suffix: ' km' },
        { label: 'Fuel Type', key: 'fuel' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Location', key: 'location' }
    ];

    const rows = fields.map(f => {
        const aVal = `${f.prefix || ''}${a[f.key]}${f.suffix || ''}`;
        const bVal = `${f.prefix || ''}${b[f.key]}${f.suffix || ''}`;
        return `<tr>
            <td class="compare-label">${f.label}</td>
            <td>${aVal}</td>
            <td>${bVal}</td>
        </tr>`;
    }).join('');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content compare-modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <h2 class="compare-modal-title"><i class="fas fa-balance-scale"></i> Bike Comparison</h2>
                <div class="compare-table-wrapper">
                    <table class="compare-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <img src="${a.image}" alt="${a.name}">
                                    <div>${a.name}</div>
                                </th>
                                <th>
                                    <img src="${b.image}" alt="${b.name}">
                                    <div>${b.name}</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
                <div class="compare-modal-actions">
                    <button class="btn btn-primary" onclick="buyVehicle(${a.id}); this.closest('.modal').remove();"><i class="fas fa-shopping-cart"></i> Buy ${a.name}</button>
                    <button class="btn btn-primary" onclick="buyVehicle(${b.id}); this.closest('.modal').remove();"><i class="fas fa-shopping-cart"></i> Buy ${b.name}</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function showToast(msg) {
    let toast = document.getElementById('compareToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'compareToast';
        toast.className = 'compare-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function contactSeller(bikeName) {
    alert(`📞 Contact Seller\n\n🏍️ Bike: ${bikeName}\n📱 Phone: +91 9443566920\n📧 Email: gurudeviiideveloper25@gmail.com\n\n💬 WhatsApp: wa.me/919443566920`);
}

function buyVehicle(id) {
    const vehicle = vehiclesData.find(v => v.id == id) || allBikesData.find(v => v.id == id);
    if (vehicle) {
        showPaymentModal(vehicle);
    }
}

function showPaymentModal(vehicle) {
    // Remove any existing payment modal to prevent duplicates
    const existing = document.getElementById('paymentModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'paymentModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <h2 style="text-align: center; margin-bottom: 2rem;">💳 Payment Options</h2>
                <div style="border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; background: #f9f9f9;">
                    <h3>🏍️ ${vehicle.name}</h3>
                    <p><strong>💰 Price: ₹${vehicle.price}</strong></p>
                </div>
                
                <div style="display: grid; gap: 1rem;">
                    <button class="btn btn-primary" onclick="payWithUPI('${vehicle.id}', '${vehicle.name}', '${vehicle.price}')" style="width: 100%;">
                        <i class="fas fa-mobile-alt"></i> 📱 UPI (GPay/PhonePe/Paytm)
                    </button>
                    
                    <button class="btn btn-secondary" onclick="payWithCard('${vehicle.id}', '${vehicle.name}', '${vehicle.price}')" style="width: 100%;">
                        <i class="fas fa-credit-card"></i> 💳 Debit/Credit Card
                    </button>
                    
                    <button class="btn btn-outline" onclick="payWithNetBanking('${vehicle.id}', '${vehicle.name}', '${vehicle.price}')" style="width: 100%;">
                        <i class="fas fa-university"></i> 🏦 Net Banking
                    </button>
                    
                    <button class="btn btn-outline" onclick="payWithWallet('${vehicle.id}', '${vehicle.name}', '${vehicle.price}')" style="width: 100%;">
                        <i class="fas fa-wallet"></i> 👛 Digital Wallet
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = () => modal.remove();
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

function payWithUPI(id, name, price) {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) paymentModal.remove();

    const amount = price.replace(/,/g, '');
    const upiString = `upi://pay?pa=6382565698@paytm&pn=AutoBazaar&am=${amount}&cu=INR&tn=Bike Purchase - ${name}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiString)}`;
    const txnId = 'TXN' + Date.now();

    const qrModal = document.createElement('div');
    qrModal.className = 'modal';
    qrModal.id = 'upiQrModal';
    qrModal.style.display = 'block';
    qrModal.innerHTML = `
        <div class="modal-content" style="max-width:420px;text-align:center;">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <h2 style="margin-bottom:0.5rem;">📱 Scan & Pay via UPI</h2>
                <p style="color:#666;margin-bottom:1rem;font-size:0.9rem;">🏍️ ${name} &nbsp;|&nbsp; <strong>₹${price}</strong></p>
                <img src="${qrUrl}" alt="UPI QR Code" style="border:3px solid #ff4d00;border-radius:12px;padding:8px;width:220px;height:220px;">
                <p style="margin:1rem 0 0.3rem;font-size:0.85rem;color:#555;">Open GPay / PhonePe / Paytm → Scan QR</p>
                <p style="font-size:0.8rem;color:#999;">UPI ID: <strong>6382565698@paytm</strong></p>
                <button class="btn btn-primary" style="width:100%;margin-top:1.2rem;" onclick="confirmUpiPayment('${id}','${name}','${price}','${txnId}')">
                    ✅ I have completed the payment
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(qrModal);
    const close = () => qrModal.remove();
    qrModal.querySelector('.close-modal').addEventListener('click', close);
    qrModal.addEventListener('click', e => { if (e.target === qrModal) close(); });
}

async function confirmUpiPayment(id, name, price, txnId) {
    document.getElementById('upiQrModal')?.remove();
    await confirmPurchaseEmail(id, name, price, txnId);
}

async function confirmPurchaseEmail(id, name, price, txnId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert(`✅ Payment initiated for ${name}!\n💰 Amount: ₹${price}\n📸 Take screenshot after payment.\n\n⚠️ Login to receive purchase confirmation email.`);
        return;
    }
    try {
        const res = await fetch('/api/payment/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ paymentId: 'PAY_' + Date.now(), bikeId: id, bikeName: name, bikePrice: price, transactionId: txnId })
        });
        const data = await res.json();
        if (data.success) {
            alert(`🎉 ${name} Purchased Successfully!\n💰 Amount: ₹${price}\n📧 Purchase confirmation sent to your email!`);
        } else {
            alert(`✅ Payment initiated for ${name}!\n💰 Amount: ₹${price}\n📸 Take screenshot after payment.`);
        }
    } catch {
        alert(`✅ Payment initiated for ${name}!\n💰 Amount: ₹${price}`);
    }
}

function payWithCard(id, name, price) {
    alert(`💳 Card Payment Gateway\n\n🏍️ Bike: ${name}\n💰 Amount: ₹${price}\n\n🔒 Redirecting to secure payment...\n\n✅ Accepts: Visa, MasterCard, RuPay\n🏦 All major banks supported\n\n(Demo: Real integration with Razorpay/Stripe)`);
    closeAllModals();
}

function payWithNetBanking(id, name, price) {
    const banks = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'PNB', 'Bank of India', 'Canara Bank', 'Union Bank'];
    const bankList = banks.map((bank, i) => `${i+1}. ${bank}`).join('\n');
    const selectedBank = prompt(`🏦 Select your bank:\n\n${bankList}\n\nEnter number (1-8):`);
    
    if (selectedBank && selectedBank >= 1 && selectedBank <= 8) {
        alert(`🏦 ${banks[selectedBank-1]} Net Banking\n\n🏍️ Bike: ${name}\n💰 Amount: ₹${price}\n\n🔒 Redirecting to ${banks[selectedBank-1]} login...\n\n✅ Secure 256-bit SSL encryption`);
    }
    closeAllModals();
}

function payWithWallet(id, name, price) {
    const wallets = ['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge', 'Airtel Money', 'JioMoney'];
    const walletList = wallets.map((wallet, i) => `${i+1}. ${wallet}`).join('\n');
    const selectedWallet = prompt(`👛 Select wallet:\n\n${walletList}\n\nEnter number (1-6):`);
    
    if (selectedWallet && selectedWallet >= 1 && selectedWallet <= 6) {
        alert(`👛 ${wallets[selectedWallet-1]} Payment\n\n🏍️ Bike: ${name}\n💰 Amount: ₹${price}\n\n🔒 Redirecting to ${wallets[selectedWallet-1]}...\n\n✅ Instant payment processing`);
    }
    closeAllModals();
}

// ====== FORM HANDLERS ======
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert(`✅ Login successful! Welcome back, ${data.user.name}.\n📧 A login notification has been sent to ${email}`);
            closeAllModals();
            form.reset();
        } else {
            alert('❌ ' + (data.message || 'Login failed'));
        }
    } catch (err) {
        alert('❌ Server error. Please try again.');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1]?.value;

    if (confirmPassword && password !== confirmPassword) {
        alert('❌ Passwords do not match.');
        return;
    }

    const body = {
        name: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value,
        city: inputs[3].value,
        address: form.querySelector('textarea').value,
        userType: form.querySelector('select').value || 'both',
        password
    };

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Save user to admin users list
            const users = JSON.parse(localStorage.getItem('adminUsersData') || '[]');
            if (!users.find(u => u.email === data.user.email)) {
                users.push(data.user);
                localStorage.setItem('adminUsersData', JSON.stringify(users));
            }
            alert(`✅ Registration successful! Welcome to AutoBazaar, ${data.user.name}.\n📧 A welcome email has been sent to ${data.user.email}`);
            closeAllModals();
            form.reset();
        } else {
            const msg = data.errors ? data.errors.map(e => e.msg).join('\n') : data.message;
            alert('❌ ' + msg);
        }
    } catch (err) {
        alert('❌ Server error. Please try again.');
    }
}

function handleSellVehicle(e) {
    e.preventDefault();
    
    const photoPreview = document.getElementById('photoPreview');
    const uploadedPhotos = photoPreview.querySelectorAll('img').length;
    
    if (uploadedPhotos < 5) {
        alert('Please upload at least 5 photos of your vehicle.');
        return;
    }
    
    alert('Your vehicle has been listed successfully!\n\nOur team will contact you within 24 hours for vehicle inspection.');
    closeAllModals();
    
    // Reset form
    e.target.reset();
    photoPreview.innerHTML = '';
}

function handleContact(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you within 24 hours.');
    e.target.reset();
}

function handleImageUpload(files) {
    const photoPreview = document.getElementById('photoPreview');
    
    Array.from(files).forEach((file, index) => {
        if (photoPreview.querySelectorAll('img').length >= 10) {
            alert('Maximum 10 photos allowed.');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('Please upload only image files.');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = 'var(--radius-sm)';
            img.style.margin = '5px';
            img.style.border = '2px solid var(--light-gray)';
            
            const container = document.createElement('div');
            container.style.position = 'relative';
            container.style.display = 'inline-block';
            container.appendChild(img);
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '0';
            removeBtn.style.right = '0';
            removeBtn.style.background = 'var(--danger)';
            removeBtn.style.color = 'white';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.width = '20px';
            removeBtn.style.height = '20px';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.fontSize = '12px';
            removeBtn.addEventListener('click', function() {
                container.remove();
            });
            
            container.appendChild(removeBtn);
            photoPreview.appendChild(container);
        };
        reader.readAsDataURL(file);
    });
    
    photoUpload.value = '';
}

// ====== KEYBOARD SHORTCUTS ======
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl + / for search focus
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// ====== SEARCH ======
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    const doSearch = () => {
        const query = searchInput.value.trim().toLowerCase();

        let results = allBikesData.filter(bike => {
            return !query || bike.name.toLowerCase().includes(query) || bike.fuel.toLowerCase().includes(query) || bike.location.toLowerCase().includes(query);
        });

        renderAllVehiclesGrid(results.length ? results : allBikesData);
        showingAll = true;
        currentIndex = 0;
        viewAllBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';

        document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (results.length === 0) showToast('No bikes found. Showing all bikes.');
        else showToast(`Found ${results.length} bike${results.length > 1 ? 's' : ''}!`);
    };

    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// ====== CHATBOT ======
const chatbotReplies = [
    { keys: ['hello','hi','hey','helo'], reply: '👋 Hello! Welcome to AutoBazaar! I can help you find bikes, check prices, or answer any questions. What are you looking for?' },
    { keys: ['buy','purchase','want to buy'], reply: '🏍️ Great! We have 20+ premium pre-owned bikes. You can:\n• Browse the Featured Bikes section\n• Use the search bar to find specific models\n• Click "View All Bikes" to see everything\n\nWhat brand or budget are you looking for?' },
    { keys: ['sell','selling','list my bike'], reply: '💰 Want to sell your bike? Click the "Sell Now" button on the homepage! You can list your bike with photos, price, and details. Our team will contact you within 24 hours.' },
    { keys: ['price','cost','budget','cheap','affordable'], reply: '💸 Our bikes range from ₹35,000 to ₹1,95,000!\n• Budget (under ₹50k): Bajaj CT 100, Hero HF Deluxe\n• Mid-range (₹50k–₹1L): Hero Splendor, Honda Shine\n• Premium (above ₹1L): KTM Duke 200, Royal Enfield 350\n\nWhat is your budget?' },
    { keys: ['ktm','duke'], reply: '🔥 KTM Duke 200 — ₹1,65,000\n📅 Year: 2020 | 📍 Mumbai\n🛣️ 25,000 km | ⛽ Petrol | ⚙️ Manual\n\nA great sports bike! Click "View All Bikes" and search for KTM to see details.' },
    { keys: ['royal enfield','enfield','bullet'], reply: '🏍️ Royal Enfield Classic 350 — ₹1,95,000\n📅 Year: 2019 | 📍 Chennai\n🛣️ 18,000 km | ⛽ Petrol | ⚙️ Manual\n\nThe iconic cruiser! Search "Royal Enfield" in the search bar.' },
    { keys: ['honda','activa','shine','hornet'], reply: '🏍️ Honda bikes available:\n• Honda Shine — ₹85,000 (Pune)\n• Honda CB Hornet 160R — ₹1,05,000 (Lucknow)\n• Honda Activa 6G — ₹65,000 (Vadodara)\n\nSearch by name to find them!' },
    { keys: ['hero','splendor','passion'], reply: '🏍️ Hero bikes available:\n• Hero Splendor Plus — ₹65,000 (Delhi)\n• Hero Passion Pro — ₹55,000 (Bangalore)\n• Hero HF Deluxe — ₹38,000 (Kanpur)\n• Hero Xtreme 200R — ₹1,10,000 (Nagpur)\n\nGreat value for money!' },
    { keys: ['bajaj','pulsar','avenger'], reply: '🏍️ Bajaj bikes available:\n• Bajaj Pulsar 150 — ₹75,000 (Kolkata)\n• Bajaj Avenger 220 — ₹1,35,000 (Bhopal)\n• Bajaj Platina 110 — ₹42,000 (Rajkot)\n• Bajaj CT 100 — ₹35,000 (Meerut)' },
    { keys: ['tvs','apache','radeon','scooty'], reply: '🏍️ TVS bikes available:\n• TVS Apache RTR 160 — ₹95,000 (Ahmedabad)\n• TVS Radeon — ₹48,000 (Hyderabad)\n• TVS Scooty Zest — ₹45,000 (Surat)\n• TVS Star City Plus — ₹52,000 (Agra)' },
    { keys: ['yamaha','fz'], reply: '🏍️ Yamaha FZ-S — ₹1,25,000\n📅 Year: 2021 | 📍 Jaipur\n🛣️ 15,000 km | ⛽ Petrol | ⚙️ Manual\n\nOne of the best street bikes available!' },
    { keys: ['payment','pay','gpay','upi','card'], reply: '💳 We support multiple payment options:\n• 📱 UPI (GPay / PhonePe / Paytm)\n• 💳 Debit / Credit Card\n• 🏦 Net Banking\n• 👛 Digital Wallets\n\nAll payments are 100% secure!' },
    { keys: ['login','register','account','signup','sign up'], reply: '🔐 Click the Login or Register button at the top right corner!\n\nAfter login, you will receive an email notification. After purchase, you get a purchase confirmation email too!' },
    { keys: ['email','mail','notification'], reply: '📧 AutoBazaar sends emails for:\n• Welcome email on registration\n• Login notification on every login\n• Purchase confirmation after buying\n\nAll emails come from autobazarpremimum@gmail.com' },
    { keys: ['compare'], reply: '⚖️ You can compare 2 bikes side by side!\n\nClick the "Compare" button on any bike card. Select 2 bikes and click "Compare Now" in the bar at the bottom.' },
    { keys: ['contact','support','help','phone'], reply: '📞 Contact AutoBazaar:\n📱 Phone: +91 98765 43210\n📧 Email: autobazarpremimum@gmail.com\n🕐 Mon–Sun: 8 AM – 10 PM\n\nOr use the Contact form at the bottom of the page!' },
    { keys: ['location','city','mumbai','delhi','bangalore','chennai'], reply: '📍 We have bikes across India:\nMumbai, Delhi, Bangalore, Chennai, Pune, Hyderabad, Kolkata, Jaipur, Lucknow, Ahmedabad and more!\n\nUse the Location filter in the search bar to find bikes near you.' },
    { keys: ['km','kilometer','mileage','driven'], reply: '🛣️ Our bikes range from 8,000 km to 45,000 km driven.\n\nLower km = better condition. All bikes are verified and quality checked before listing!' },
    { keys: ['year','old','new','2021','2020','2019','2018'], reply: '📅 We have bikes from 2018 to 2021.\n\nNewer bikes cost more but have lower km. Use the search to filter by your preferred year range.' },
    { keys: ['verified','trusted','safe','genuine'], reply: '✅ All AutoBazaar bikes are:\n• Documents verified\n• Quality inspected\n• RC & registration checked\n• Ready to ride\n\nWe ensure 100% genuine listings!' },
    { keys: ['thank','thanks','bye','goodbye'], reply: '😊 Thank you for visiting AutoBazaar! Happy riding! 🏍️\n\nFeel free to ask anything anytime. We are here 24/7!' },
];

const defaultReply = "🤔 I'm not sure about that. Try asking about:\n• Bike prices or models\n• How to buy or sell\n• Payment options\n• Contact & support\n\nOr use the search bar to find specific bikes!";

const suggestions = ['🏍️ Show bikes under ₹1L', '💰 How to buy?', '📞 Contact support', '⚖️ Compare bikes', '💳 Payment options'];

let chatOpen = false;

function toggleChatbot() {
    chatOpen = !chatOpen;
    const body = document.getElementById('chatbotBody');
    const fab = document.getElementById('chatbotFab');
    const icon = document.getElementById('chatToggleIcon');
    const chatbot = document.getElementById('chatbot');

    body.style.display = chatOpen ? 'flex' : 'none';
    fab.style.display = chatOpen ? 'none' : 'flex';
    chatbot.style.display = chatOpen ? 'block' : 'none';
    icon.innerHTML = chatOpen ? '<i class="fas fa-chevron-down"></i>' : '<i class="fas fa-chevron-up"></i>';

    if (chatOpen) {
        document.getElementById('chatbotFab').querySelector('.fab-badge').style.display = 'none';
        if (document.getElementById('chatMessages').children.length === 0) initChat();
    }
}

function initChat() {
    addBotMessage('👋 Hi! I\'m AutoBot, your AutoBazaar assistant!\n\nI can help you find bikes, check prices, payment options, and more. What can I help you with?');
    renderSuggestions();
}

function renderSuggestions() {
    const container = document.getElementById('chatSuggestions');
    container.innerHTML = suggestions.map(s =>
        `<button class="chat-suggestion-btn" onclick="handleSuggestion('${s}')">${s}</button>`
    ).join('');
}

function handleSuggestion(text) {
    addUserMessage(text);
    document.getElementById('chatSuggestions').innerHTML = '';
    setTimeout(() => {
        const reply = getBotReply(text);
        addBotMessage(reply);
        setTimeout(renderSuggestions, 500);
    }, 400);
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMessage(text);
    document.getElementById('chatSuggestions').innerHTML = '';
    setTimeout(() => {
        const reply = getBotReply(text);
        addBotMessage(reply);
        setTimeout(renderSuggestions, 500);
    }, 400);
}

function getBotReply(text) {
    const lower = text.toLowerCase();
    // Check for price range queries
    if (lower.includes('under') || lower.includes('below') || lower.includes('less than')) {
        const match = lower.match(/(\d[\d,]*)/);
        if (match) {
            const budget = parseInt(match[1].replace(/,/g,''));
            const found = allBikesData.filter(b => parseInt(b.price.replace(/,/g,'')) <= budget);
            if (found.length) return `🏍️ Bikes under ₹${match[1]}:\n${found.map(b => `• ${b.name} — ₹${b.price} (${b.location})`).join('\n')}`;
        }
    }
    for (const item of chatbotReplies) {
        if (item.keys.some(k => lower.includes(k))) return item.reply;
    }
    return defaultReply;
}

function addBotMessage(text) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg';
    div.innerHTML = `<div class="chat-avatar"><i class="fas fa-robot"></i></div><div class="chat-bubble">${text.replace(/\n/g,'<br>')}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg user-msg';
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    document.getElementById('chatInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });
    setupRatings();
});

// ====== RATINGS ======
const reviewsData = [
    { name: 'Rajesh Kumar', vehicle: 'Yamaha R15 Owner · Mumbai', rating: 5, text: '"Bought my dream bike through AutoBazaar. The verification process gave me complete peace of mind!"', date: '2 weeks ago', color: 'var(--primary)' },
    { name: 'Priya Sharma', vehicle: 'Honda City Seller · Delhi', rating: 4, text: '"Sold my car in 2 days! AutoBazaar\'s network and support made the process effortless."', date: '1 month ago', color: 'var(--accent)' },
    { name: 'Amit Patel', vehicle: 'Hyundai Creta Buyer · Bangalore', rating: 5, text: '"Excellent service! The detailed inspection report helped me make an informed decision."', date: '1 month ago', color: 'var(--success)' }
];

function setupRatings() {
    let selectedStar = 0;
    const stars = document.querySelectorAll('#starInput i');

    stars.forEach(star => {
        star.addEventListener('mouseover', () => highlightStars(parseInt(star.dataset.val)));
        star.addEventListener('mouseout', () => highlightStars(selectedStar));
        star.addEventListener('click', () => {
            selectedStar = parseInt(star.dataset.val);
            highlightStars(selectedStar);
        });
    });

    document.getElementById('ratingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!selectedStar) { showToast('Please select a star rating.'); return; }

        const name = document.getElementById('reviewName').value.trim();
        const vehicle = document.getElementById('reviewVehicle').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        const colors = ['var(--primary)', 'var(--accent)', 'var(--success)', 'var(--warning)', 'var(--danger)'];
        const color = colors[reviewsData.length % colors.length];
        const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

        reviewsData.unshift({ name, vehicle, rating: selectedStar, text: `"${text}"`, date: 'Just now', color, initials });
        updateRatingsUI();
        this.reset();
        selectedStar = 0;
        highlightStars(0);
        showToast('✅ Review submitted! Thank you.');
    });

    updateRatingsUI();
}

function highlightStars(val) {
    document.querySelectorAll('#starInput i').forEach(s => {
        const v = parseInt(s.dataset.val);
        s.className = v <= val ? 'fas fa-star selected' : 'far fa-star';
    });
}

function updateRatingsUI() {
    const total = reviewsData.length;
    const counts = [0, 0, 0, 0, 0];
    reviewsData.forEach(r => counts[r.rating - 1]++);
    const avg = (reviewsData.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);

    document.getElementById('overallScore').textContent = avg;
    document.getElementById('totalReviewsLabel').textContent = `Based on ${total} review${total !== 1 ? 's' : ''}`;

    const fullStars = Math.floor(avg);
    const half = avg - fullStars >= 0.5;
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) starsHtml += '<i class="fas fa-star"></i>';
        else if (i === fullStars + 1 && half) starsHtml += '<i class="fas fa-star-half-alt"></i>';
        else starsHtml += '<i class="far fa-star"></i>';
    }
    document.getElementById('overallStars').innerHTML = starsHtml;

    for (let i = 1; i <= 5; i++) {
        const pct = total ? Math.round((counts[i - 1] / total) * 100) : 0;
        document.getElementById(`bar${i}`).style.width = pct + '%';
        document.getElementById(`count${i}`).textContent = counts[i - 1];
    }

    const list = document.getElementById('reviewsList');
    list.innerHTML = reviewsData.map(r => {
        const initials = r.initials || r.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        const starsHtml = Array.from({length: 5}, (_, i) =>
            `<i class="${i < r.rating ? 'fas' : 'far'} fa-star"></i>`).join('');
        return `<div class="review-card">
            <div class="review-header">
                <div class="reviewer-avatar" style="background:${r.color}">${initials}</div>
                <div>
                    <div class="reviewer-name">${r.name}</div>
                    <div class="reviewer-meta">${r.vehicle}</div>
                </div>
                <div class="review-stars">${starsHtml}</div>
            </div>
            <p class="review-text">${r.text}</p>
            <div class="review-date">${r.date}</div>
        </div>`;
    }).join('');
}