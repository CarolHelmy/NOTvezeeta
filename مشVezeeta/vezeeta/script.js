// Search functionality
function switchTab(tabType) {
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (tabType === 'doctor') {
        tabs[0].classList.add('active');
    } else if (tabType === 'call') {
        tabs[1].classList.add('active');
    }
}

function performSearch(event) {
    event.preventDefault();
    
    const specialty = document.getElementById('specialtyInput').value;
    const governorate = document.getElementById('governorateInput').value;
    const region = document.getElementById('regionInput').value;
    
    if (!specialty) {
        alert('الرجاء اختيار التخصص');
        return;
    }
    
    if (!governorate) {
        alert('الرجاء اختيار المحافظة');
        return;
    }
    
    // Here you would normally redirect to search results
    alert(`البحث عن: ${specialty} في ${governorate}${region ? ` - ${region}` : ''}`);
}

// Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.classList.contains('show');
    
    // Close all other dropdowns
    document.querySelectorAll('.dropdown-content').forEach(d => {
        d.classList.remove('show');
    });
    
    // Toggle current dropdown
    if (!isVisible) {
        dropdown.classList.add('show');
    }
}

function selectSpecialty(specialty) {
    document.getElementById('specialtyInput').value = specialty;
    document.getElementById('specialtyDropdown').classList.remove('show');
}

function selectGovernorate(governorate) {
    document.getElementById('governorateInput').value = governorate;
    document.getElementById('governorateDropdown').classList.remove('show');
    
    // Clear region selection when governorate changes
    document.getElementById('regionInput').value = '';
    
    // Update regions based on selected governorate
    updateRegions(governorate);
}

function selectRegion(region) {
    document.getElementById('regionInput').value = region;
    document.getElementById('regionDropdown').classList.remove('show');
}

function updateRegions(governorate) {
    const regionDropdown = document.getElementById('regionDropdown');
    const regions = getRegionsForGovernorate(governorate);
    
    regionDropdown.innerHTML = '';
    regions.forEach(region => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = region;
        item.onclick = () => selectRegion(region);
        regionDropdown.appendChild(item);
    });
}

function getRegionsForGovernorate(governorate) {
    const regionsMap = {
        'القاهرة': ['مدينة نصر', 'المعادي', 'الزمالك', 'وسط البلد', 'مصر الجديدة', 'التجمع الخامس'],
        'الجيزة': ['المهندسين', 'الدقي', 'العجوزة', 'الشيخ زايد', '6 أكتوبر', 'حدائق الأهرام'],
        'الإسكندرية': ['سيدي بشر', 'العطارين', 'كامب شيزار', 'سموحة', 'محطة الرمل', 'ميامي'],
        'الساحل الشمالي': ['مارينا', 'الحمام', 'العلمين الجديدة', 'سيدي عبد الرحمن'],
        'القليوبية': ['شبرا الخيمة', 'بنها', 'القناطر الخيرية', 'طوخ']
    };
    
    return regionsMap[governorate] || ['كل المناطق'];
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation for form submission
function showLoading() {
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'جاري البحث...';
    searchBtn.disabled = true;
    
    setTimeout(() => {
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
    }, 2000);
}

// Phone number formatting
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{5})/, '$1');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vezeeta homepage loaded successfully');
    
    // Add click handlers for specialty cards
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.addEventListener('click', function() {
            const specialtyName = this.querySelector('.specialty-name').textContent;
            document.getElementById('specialtyInput').value = specialtyName;
            
            // Scroll to search form
            document.querySelector('.search-container').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add click handlers for doctor cards
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.addEventListener('click', function() {
            const doctorName = this.querySelector('.doctor-name').textContent;
            alert(`تم اختيار ${doctorName}`);
        });
    });
});