// main.js - Main JavaScript for the AI & Automation Tool


// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        rootElement.classList.add('light-theme');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        if (rootElement.classList.contains('light-theme')) {
            rootElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            rootElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
        
        console.log('Theme toggled', rootElement.classList.contains('light-theme') ? 'light' : 'dark');
    });
});





// API Base URL for backend calls
const API_BASE_URL = "http://localhost:8000";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Initialize tabs if present on the page
    initTabs();
    
    // Initialize text processing if on landing page
    initTextProcessing();
    
    // Initialize dashboard functionality
    initDashboardAPI();
});

// Initialize tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.dataset.tab;
                
                // Remove active class from all tabs and contents
                document.querySelectorAll('[data-tab]').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab and its content
                this.classList.add('active');
                document.querySelector(`.tab-content[data-content="${target}"]`).classList.add('active');
            });
        });
        
        // Activate first tab by default
        tabButtons[0].click();
    }
}

// Initialize text processing functionality
function initTextProcessing() {
    const sentimentForm = document.getElementById('sentiment-form');
    const refinerForm = document.getElementById('refiner-form');
    
    if (sentimentForm) {
        sentimentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textInput = document.getElementById('sentiment-input').value;
            if (textInput.trim() !== '') {
                processSentiment(textInput);
            }
        });
    }
    
    if (refinerForm) {
        refinerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textInput = document.getElementById('refiner-input').value;
            if (textInput.trim() !== '') {
                processRefiner(textInput);
            }
        });
    }
}

// Basic sentiment analysis function (placeholder)
function processSentiment(text) {
    const resultArea = document.getElementById('sentiment-result');
    const words = text.toLowerCase().split(/\s+/);
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'positive', 'love', 'like'];
    const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'negative', 'hate', 'dislike'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
    });
    
    let sentiment = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    if (negativeCount > positiveCount) sentiment = 'negative';
    
    resultArea.innerHTML = `
        <h4>Sentiment Analysis Result:</h4>
        <p>Overall sentiment: <strong>${sentiment}</strong></p>
        <p>Positive words found: ${positiveCount}</p>
        <p>Negative words found: ${negativeCount}</p>
        <p>Total words analyzed: ${words.length}</p>
    `;
    resultArea.style.display = 'block';
}

// Basic text refiner function (placeholder)
function processRefiner(text) {
    const resultArea = document.getElementById('refiner-result');
    let refinedText = text.replace(/\s+/g, ' ').replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
    
    resultArea.innerHTML = `
        <h4>Refined Text:</h4>
        <p>${refinedText}</p>
    `;
    resultArea.style.display = 'block';
}

// API Functions for Dashboard
async function refineText(inputText) {
    try {
        const response = await fetch(`${API_BASE_URL}/refiner`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: inputText }),
        });
        const data = await response.json();
        document.getElementById('output').textContent = data.response || data.error;
        return data.response || data.error;
    } catch (error) {
        console.error("Error fetching refined text:", error);
        return "Error refining text. Please check if the backend server is running.";
    }
}

async function getSentiment(inputText) {
    try {
        const response = await fetch(`${API_BASE_URL}/sentiment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: inputText }),
        });
        const data = await response.json();
        document.getElementById('output').textContent = data.response || data.error;
        return data.response || data.error;
    } catch (error) {
        console.error("Error fetching sentiment analysis:", error);
        return "Error analyzing sentiment. Please check if the backend server is running.";
    }
}

async function getSummary(inputText) {
    try {
        const response = await fetch(`${API_BASE_URL}/summarizer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: inputText }),
        });
        const data = await response.json();
        document.getElementById('output').textContent = data.response || data.error;
        return data.response || data.error;
    } catch (error) {
        console.error("Error fetching summary:", error);
        return "Error summarizing text. Please check if the backend server is running.";
    }
}