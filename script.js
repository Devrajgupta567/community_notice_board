// Get notices from localStorage or use default notices
let notices = JSON.parse(localStorage.getItem('notices')) || [];

// API URL - This will be updated when deployed
const API_URL = 'http://localhost:3000';

// DOM Elements
const noticesContainer = document.getElementById('noticesContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const postNoticeForm = document.getElementById('postNoticeForm');
const postNoticeBtn = document.getElementById('postNoticeBtn');

// Check admin login status and show/hide post button
function checkAdminStatus() {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (postNoticeBtn) {
        postNoticeBtn.style.display = isLoggedIn === 'true' ? 'inline-block' : 'none';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    checkAdminStatus();
    
    if (noticesContainer) {
        displayNotices(notices);
        setupEventListeners();
    }
    
    if (postNoticeForm) {
        setupPostNoticeForm();
        // Set default date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
    }
});

// Display notices in the container
function displayNotices(noticesToShow) {
    noticesContainer.innerHTML = '';
    
    noticesToShow.forEach(notice => {
        const noticeCard = createNoticeCard(notice);
        noticesContainer.appendChild(noticeCard);
    });
}

// Create a notice card element
function createNoticeCard(notice) {
    const card = document.createElement('div');
    card.className = 'notice-card';

    let formattedDate;
    try {
        const date = new Date(notice.date);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        formattedDate = 'Date not specified';
    }

    card.innerHTML = `
        <h3>${notice.title}</h3>
        <span class="category">${formatCategory(notice.category)}</span>
        <p>${notice.description}</p>
        <span class="date">${formattedDate}</span>
    `;

    return card;
}

// Format category for display
function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Setup event listeners for search and filter
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', filterNotices);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterNotices);
    }
}

// Filter notices based on search and category
function filterNotices() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredNotices = notices.filter(notice => {
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm) ||
                            notice.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayNotices(filteredNotices);
}

// Setup post notice form
function setupPostNoticeForm() {
    postNoticeForm.addEventListener('submit', handlePostNotice);
}

// Handle posting a new notice
function handlePostNotice(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let dateInput = formData.get('date');

    // Parse and validate date input
    const dateObj = new Date(dateInput);
    if (!dateInput || isNaN(dateObj.getTime())) {
        alert('Please enter a valid date');
        return;
    }

    const newNotice = {
        id: Date.now(),
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        date: dateObj.toISOString()
    };

    notices.unshift(newNotice);
    localStorage.setItem('notices', JSON.stringify(notices));

    alert('Notice posted successfully!');
    window.location.href = 'index.html';
}

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Handle general form submissions (only for non-post pages)
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log('Form submitted:', formObject);
    alert('Form submitted successfully! (Check console for details)');
    event.target.reset();
}

// Apply general handler only for non-postNoticeForm
document.querySelectorAll('form').forEach(form => {
    if (form.id !== 'postNoticeForm') {
        form.addEventListener('submit', handleFormSubmit);
    }
});
