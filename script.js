// UBA Mobile Banking App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initializeApp();
});

function initializeApp() {
    // Balance toggle functionality
    setupBalanceToggle();
    
    // Navigation functionality
    setupNavigation();
    
    // Quick actions functionality
    setupQuickActions();
    
    // Savings actions functionality
    setupSavingsActions();
    
    // Achievement card functionality
    setupAchievementCard();
    
    // Add smooth scrolling
    setupSmoothScrolling();
    
    // Group savings functionality
    setupGroupSavings();
    
    // Phase 1 features
    setupDarkMode();
    setupDailyChallenges();
    setupSpendingAnalytics();
    setupSmartNotifications();
    
    // Phase 2 features
    setupRoundupSavings();
    setupAchievementBadges();
    setupSocialFeatures();
    setupVoiceCommands();
    
    // Phase 3 features
    setupAIFinancialInsights();
    setupBiometricAuthentication();
    setupPersonalizedRecommendations();
    setupEnhancedGamification();
    setupFinancialEducationHub();
    
    // User photo and settings functionality
    setupUserPhoto();
    setupBackButton();

    // Upcoming bills
    setupUpcomingBills();
}

// Save all settings from the settings page
function saveAllSettings() {
    const settings = {};

    // Get toggle settings
    const toggles = document.querySelectorAll('.settings-card .switch input[type="checkbox"]');
    toggles.forEach(toggle => {
        settings[toggle.id] = toggle.checked;
    });

    // Get input settings
    const inputs = document.querySelectorAll('.settings-card input[type="text"], .settings-card input[type="email"], .settings-card input[type="tel"]');
    inputs.forEach(input => {
        settings[input.id] = input.value;
    });

    // Get select settings
    const selects = document.querySelectorAll('.settings-select');
    selects.forEach(select => {
        settings[select.id] = select.value;
    });

    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));

    showNotification('Settings saved successfully!');
}

// Balance Toggle Functionality
function setupBalanceToggle() {
    const balanceToggle = document.querySelector('.balance-toggle');
    const balanceAmount = document.querySelector('.balance-amount');
    const amount = document.querySelector('.amount');
    const currency = document.querySelector('.currency');
    
    let isBalanceVisible = true;
    
    balanceToggle.addEventListener('click', function() {
        isBalanceVisible = !isBalanceVisible;
        
        if (isBalanceVisible) {
            amount.textContent = '100,000';
            currency.style.opacity = '1';
            balanceToggle.innerHTML = '<i class="fas fa-eye"></i>';
            balanceToggle.style.backgroundColor = 'transparent';
            balanceToggle.style.color = '#E60000';
        } else {
            amount.textContent = '******';
            currency.style.opacity = '0.3';
            balanceToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
            balanceToggle.style.backgroundColor = '#E60000';
            balanceToggle.style.color = '#FFFFFF';
        }
    });
}

// Navigation Functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation (you can add more functionality here)
            const navText = this.querySelector('.nav-text').textContent;
            console.log(`Navigating to: ${navText}`);
            
            // Navigate between pages when applicable
            if (navText === 'Transfers') {
                window.location.href = 'transfer.html';
            } else if (navText === 'Leo') {
                window.location.href = 'leo.html';
            } else if (navText === 'Savings') {
                window.location.href = 'savings.html';
            } else if (navText === 'More') {
                window.location.href = 'more.html';
            } else if (navText === 'Home') {
                window.location.href = 'index.html';
            }
            
            // Add a small animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Quick Actions Functionality
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.querySelector('.action-text').textContent;
            console.log(`Quick action clicked: ${actionText}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different actions
            handleQuickAction(actionText);
        });
    });
}

// Upcoming Bills: interactions and persistence
function setupUpcomingBills() {
    const billItems = document.querySelectorAll('.upcoming-bills-section .bill-item');
    if (!billItems.length) return;

    // Load saved paid statuses
    const paidBills = JSON.parse(localStorage.getItem('paidBills') || '[]');

    billItems.forEach((item) => {
        const billId = item.getAttribute('data-bill-id');
        const statusChip = item.querySelector('.bill-status');

        // If already marked paid, reflect UI
        if (paidBills.includes(billId)) {
            markAsPaidUI(item, statusChip);
        }

        const payBtn = item.querySelector('.pay-bill-btn');
        const remindBtn = item.querySelector('.remind-bill-btn');
        const markPaidBtn = item.querySelector('.mark-paid-bill-btn');

        if (payBtn) {
            payBtn.addEventListener('click', () => {
                // Simulate pay flow
                showNotification('Redirecting to bill payment...');
                // Optionally deep link to a pay bills page later
            });
        }

        if (remindBtn) {
            remindBtn.addEventListener('click', () => {
                showNotification('We will remind you about this bill tomorrow.');
            });
        }

        if (markPaidBtn) {
            markPaidBtn.addEventListener('click', () => {
                const updated = new Set(paidBills);
                updated.add(billId);
                localStorage.setItem('paidBills', JSON.stringify(Array.from(updated)));
                markAsPaidUI(item, statusChip);
                showNotification('Marked as paid. Nice!');
            });
        }
    });
}

function markAsPaidUI(item, statusChip) {
    if (statusChip) {
        statusChip.textContent = 'Paid';
        statusChip.style.color = '#065F46';
        statusChip.style.background = '#ECFDF5';
        statusChip.style.border = '1px solid #A7F3D0';
        statusChip.style.fontWeight = '800';
    }
    item.style.opacity = '0.9';
}

// Handle Quick Actions
function handleQuickAction(action) {
    switch(action) {
        case 'Transfer':
            // Navigate to Transfers page
            window.location.href = 'transfer.html';
            break;
        case 'Airtime':
            showNotification('Airtime purchase feature coming soon!');
            break;
        case 'Pay Bills':
            showNotification('Bill payment feature coming soon!');
            break;
        case 'QR Code':
            showNotification('QR Code scanner coming soon!');
            break;
    }
}

// Savings Actions Functionality
function setupSavingsActions() {
    const savingsButtons = document.querySelectorAll('.savings-btn');
    
    savingsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            console.log(`Savings action clicked: ${buttonText}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different savings actions
            handleSavingsAction(buttonText);
        });
    });
}

// Handle Savings Actions
function handleSavingsAction(action) {
    switch(action) {
        case 'View':
            showNotification('Opening Family Travel Fund details...');
            break;
        case 'Contribute':
            showNotification('Contribution feature coming soon!');
            break;
        case 'Invite':
            showNotification('Invite feature coming soon!');
            break;
    }
}

// Achievement Card Functionality
function setupAchievementCard() {
    const achievementCard = document.querySelector('.achievement-card');
    
    if (achievementCard) {
        achievementCard.addEventListener('click', function() {
            console.log('Achievement card clicked');
            showNotification('Opening leaderboard...');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Group Savings Functionality
function setupGroupSavings() {
    // Create group button
    const createGroupBtn = document.querySelector('.create-group-btn');
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', function() {
            console.log('Create group button clicked');
            showNotification('Create group feature coming soon!');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Group savings cards
    const groupSavingsCards = document.querySelectorAll('.group-savings-card');
    groupSavingsCards.forEach(card => {
        // Contribute buttons
        const contributeBtn = card.querySelector('.contribute-btn');
        if (contributeBtn) {
            contributeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const groupName = card.querySelector('.group-name').textContent;
                console.log(`Contribute to ${groupName}`);
                showNotification(`Contribution feature for ${groupName} coming soon!`);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
        
        // Details buttons
        const detailsBtn = card.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const groupName = card.querySelector('.group-name').textContent;
                console.log(`View details for ${groupName}`);
                showNotification(`Opening details for ${groupName}...`);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
        
        // Card click functionality
        card.addEventListener('click', function() {
            const groupName = this.querySelector('.group-name').textContent;
            console.log(`Group savings card clicked: ${groupName}`);
            showNotification(`Opening ${groupName} group...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification to match UBA design
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #E60000 0%, #CC0000 100%);
        color: #FFFFFF;
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(230, 0, 0, 0.3);
        animation: slideDown 0.3s ease-out;
        max-width: 350px;
        width: 90%;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Progress Circle Animation
function animateProgressCircle() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Calculate the stroke-dashoffset for 40% progress
        const circumference = 2 * Math.PI * 25; // r = 25
        const progress = 40; // 40%
        const offset = circumference - (progress / 100) * circumference;
        
        progressFill.style.strokeDashoffset = offset;
    }
}

// Initialize progress circle animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateProgressCircle, 500);
});

// Add loading animation for better UX
function addLoadingAnimation() {
    const sections = document.querySelectorAll('.main-content > section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', function() {
    addLoadingAnimation();
});

// Add touch feedback for mobile devices
function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll('.action-button, .savings-btn, .nav-item, .achievement-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize touch feedback
document.addEventListener('DOMContentLoaded', function() {
    addTouchFeedback();
}); 

// Dark Mode Functionality
function setupDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update icon
        if (isDarkMode) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            showNotification('Dark mode enabled');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            showNotification('Light mode enabled');
        }
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Daily Challenges Functionality
function setupDailyChallenges() {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    
    challengeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.classList.contains('challenge-btn')) {
                return;
            }
            
            const challengeTitle = this.querySelector('.challenge-title').textContent;
            console.log(`Challenge card clicked: ${challengeTitle}`);
            showNotification(`Opening ${challengeTitle} details...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const buttonText = this.textContent;
            const card = this.closest('.challenge-card');
            const challengeTitle = card.querySelector('.challenge-title').textContent;
            
            console.log(`Challenge button clicked: ${buttonText} for ${challengeTitle}`);
            
            if (buttonText === 'Save Now') {
                showNotification(`Processing savings for ${challengeTitle}...`);
                // Simulate progress update
                setTimeout(() => {
                    const progressFill = card.querySelector('.progress-fill');
                    const progressText = card.querySelector('.progress-text');
                    if (progressFill && progressText) {
                        const currentWidth = parseInt(progressFill.style.width) || 60;
                        const newWidth = Math.min(currentWidth + 20, 100);
                        progressFill.style.width = `${newWidth}%`;
                        progressText.textContent = `₦${newWidth * 10} of ₦1,000`;
                        
                        if (newWidth >= 100) {
                            showNotification('🎉 Challenge completed! You earned ₦500 airtime!');
                            card.classList.remove('active');
                            card.classList.add('completed');
                            card.querySelector('.status-badge').textContent = 'Completed';
                            card.querySelector('.status-badge').className = 'status-badge completed';
                        }
                    }
                }, 1000);
            } else if (buttonText === 'View Details') {
                showNotification(`Opening detailed view for ${challengeTitle}...`);
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Spending Analytics Functionality
function setupSpendingAnalytics() {
    const viewAllBtn = document.querySelector('.view-all-btn');
    const analyticsCards = document.querySelectorAll('.analytics-card');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('View all analytics clicked');
            showNotification('Opening detailed spending analytics...');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    analyticsCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.analytics-title').textContent;
            console.log(`Analytics card clicked: ${cardTitle}`);
            showNotification(`Opening ${cardTitle} details...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Smart Notifications System
function setupSmartNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            console.log('Notification bell clicked');
            showNotificationPanel();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Simulate smart notifications
    setTimeout(() => {
        showSmartNotification('💡 Tip: You could save ₦50,000 more this month by reducing dining out expenses.');
    }, 5000);
    
    setTimeout(() => {
        showSmartNotification('🎯 You\'re 75% through your monthly budget. Great job staying on track!');
    }, 10000);
}

// Show Smart Notification
function showSmartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'smart-notification';
    notification.innerHTML = `
        <div class="smart-notification-content">
            <i class="fas fa-lightbulb"></i>
            <span>${message}</span>
        </div>
        <button class="smart-notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style the smart notification to match UBA design
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #E60000 0%, #CC0000 100%);
        color: #FFFFFF;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(230, 0, 0, 0.3);
        animation: slideDownSmart 0.4s ease-out;
        max-width: 350px;
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Style the content
    const content = notification.querySelector('.smart-notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    `;
    
    const icon = content.querySelector('i');
    icon.style.cssText = `
        color: #FFFFFF;
        font-size: 16px;
        flex-shrink: 0;
    `;
    
    const text = content.querySelector('span');
    text.style.cssText = `
        color: #FFFFFF;
        line-height: 1.4;
    `;
    
    // Style the close button
    const closeBtn = notification.querySelector('.smart-notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #FFFFFF;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // Add animation keyframes
    if (!document.querySelector('#smart-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'smart-notification-styles';
        style.textContent = `
            @keyframes slideDownSmart {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Close button functionality
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 8000);
}

// Show Notification Panel
function showNotificationPanel() {
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="notification-panel-header">
            <h3>Notifications</h3>
            <button class="close-panel">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-list">
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="notification-content">
                    <h4>Challenge Completed!</h4>
                    <p>You earned ₦500 airtime for completing today's savings challenge.</p>
                    <span class="notification-time">2 minutes ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="notification-content">
                    <h4>Budget Update</h4>
                    <p>You've used 75% of your monthly budget. Great job staying on track!</p>
                    <span class="notification-time">1 hour ago</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-gift"></i>
                </div>
                <div class="notification-content">
                    <h4>New Reward Available</h4>
                    <p>Unlock a ₦1,000 reward by completing 5 transfers this week.</p>
                    <span class="notification-time">3 hours ago</span>
                </div>
            </div>
        </div>
    `;
    
    // Style the notification panel
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 80px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const panelContent = document.createElement('div');
    panelContent.style.cssText = `
        background-color: #FFFFFF;
        border-radius: 16px;
        width: 90%;
        max-width: 400px;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease-out;
    `;
    
    panelContent.innerHTML = panel.innerHTML;
    panel.innerHTML = '';
    panel.appendChild(panelContent);

    // Enhance styling for header, list, and items for a modern UBA look
    try {
        // Refine container
        panelContent.style.border = '1px solid #F0F0F0';
        panelContent.style.overflow = 'hidden';

        // Header styling
        const headerEl = panelContent.querySelector('.notification-panel-header');
        if (headerEl) {
            headerEl.style.display = 'flex';
            headerEl.style.alignItems = 'center';
            headerEl.style.justifyContent = 'space-between';
            headerEl.style.padding = '14px 16px';
            headerEl.style.background = 'linear-gradient(135deg,#E60000 0%,#CC0000 100%)';
            headerEl.style.color = '#FFFFFF';
            headerEl.style.position = 'sticky';
            headerEl.style.top = '0';
            headerEl.style.zIndex = '1';
        }
        const headerTitle = headerEl ? headerEl.querySelector('h3') : null;
        if (headerTitle) {
            headerTitle.style.margin = '0';
            headerTitle.style.fontSize = '16px';
            headerTitle.style.fontWeight = '700';
        }
        const headerClose = headerEl ? headerEl.querySelector('.close-panel') : null;
        if (headerClose) {
            headerClose.style.background = 'rgba(255,255,255,0.15)';
            headerClose.style.border = '1px solid rgba(255,255,255,0.35)';
            headerClose.style.width = '32px';
            headerClose.style.height = '32px';
            headerClose.style.borderRadius = '50%';
            headerClose.style.display = 'flex';
            headerClose.style.alignItems = 'center';
            headerClose.style.justifyContent = 'center';
            headerClose.style.color = '#FFFFFF';
            headerClose.style.cursor = 'pointer';
        }

        // List styling
        const listEl = panelContent.querySelector('.notification-list');
        if (listEl) {
            listEl.style.display = 'flex';
            listEl.style.flexDirection = 'column';
            listEl.style.gap = '10px';
            listEl.style.padding = '12px';
            listEl.style.background = '#FFFFFF';
        }

        // Item styling
        const items = panelContent.querySelectorAll('.notification-item');
        items.forEach((item) => {
            item.style.display = 'flex';
            item.style.alignItems = 'flex-start';
            item.style.gap = '12px';
            item.style.padding = '12px';
            item.style.background = '#FFFFFF';
            item.style.border = '1px solid #F0F0F0';
            item.style.borderRadius = '12px';
            item.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';

            const icon = item.querySelector('.notification-icon');
            if (icon) {
                icon.style.width = '40px';
                icon.style.height = '40px';
                icon.style.borderRadius = '50%';
                icon.style.display = 'flex';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';
                icon.style.background = 'linear-gradient(135deg,#E60000 0%,#CC0000 100%)';
                icon.style.color = '#FFFFFF';
                icon.style.flexShrink = '0';
            }

            const content = item.querySelector('.notification-content');
            if (content) {
                const title = content.querySelector('h4');
                if (title) {
                    title.style.margin = '0 0 4px 0';
                    title.style.fontSize = '14px';
                    title.style.fontWeight = '700';
                    title.style.color = '#000000';
                }
                const desc = content.querySelector('p');
                if (desc) {
                    desc.style.margin = '0 0 6px 0';
                    desc.style.fontSize = '12px';
                    desc.style.color = '#666666';
                    desc.style.lineHeight = '1.45';
                }
                const time = content.querySelector('.notification-time');
                if (time) {
                    time.style.fontSize = '11px';
                    time.style.color = '#999999';
                    time.style.fontWeight = '500';
                }
            }
        });
    } catch (e) {
        console.warn('Notification panel style enhancement failed', e);
    }
    
    // Add to page
    document.body.appendChild(panel);
    
    // Close functionality
    const closeBtn = panelContent.querySelector('.close-panel');
    closeBtn.addEventListener('click', function() {
        panel.style.animation = 'fadeOut 0.3s ease-out';
        panelContent.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (panel.parentNode) {
                panel.parentNode.removeChild(panel);
            }
        }, 300);
    });
    
    // Close on outside click
    panel.addEventListener('click', function(e) {
        if (e.target === panel) {
            closeBtn.click();
        }
    });
} 

// Round-up Savings Functionality
function setupRoundupSavings() {
    const roundupToggle = document.getElementById('roundup-toggle');
    const roundupButtons = document.querySelectorAll('.roundup-btn');
    
    if (roundupToggle) {
        roundupToggle.addEventListener('change', function() {
            const isEnabled = this.checked;
            console.log(`Round-up savings ${isEnabled ? 'enabled' : 'disabled'}`);
            showNotification(`Round-up savings ${isEnabled ? 'enabled' : 'disabled'}`);
            
            // Simulate saving preference
            localStorage.setItem('roundupEnabled', isEnabled);
        });
    }
    
    roundupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            console.log(`Round-up button clicked: ${buttonText}`);
            
            if (buttonText === 'View Details') {
                showNotification('Opening round-up savings details...');
            } else if (buttonText === 'Withdraw') {
                showNotification('Processing round-up withdrawal...');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Achievement Badges Functionality
function setupAchievementBadges() {
    const badgeItems = document.querySelectorAll('.badge-item');
    const viewAllBtn = document.querySelector('.achievement-badges-section .view-all-btn');
    
    badgeItems.forEach(badge => {
        badge.addEventListener('click', function() {
            const badgeTitle = this.querySelector('.badge-title').textContent;
            const isUnlocked = this.classList.contains('unlocked');
            
            console.log(`Badge clicked: ${badgeTitle} (${isUnlocked ? 'unlocked' : 'locked'})`);
            
            if (isUnlocked) {
                showNotification(`🎖️ Achievement unlocked: ${badgeTitle}!`);
            } else {
                showNotification(`🔒 ${badgeTitle} - Complete requirements to unlock`);
            }
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('View all badges clicked');
            showNotification('Opening all achievements...');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Social Features Functionality
function setupSocialFeatures() {
    const createPostBtn = document.querySelector('.create-post-btn');
    const socialPosts = document.querySelectorAll('.social-post');
    const postActions = document.querySelectorAll('.post-action');
    
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            console.log('Create post button clicked');
            showCreatePostModal();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    socialPosts.forEach(post => {
        post.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.post-action')) {
                return;
            }
            
            const postAuthor = this.querySelector('.post-author').textContent;
            console.log(`Social post clicked: ${postAuthor}`);
            showNotification(`Opening ${postAuthor}'s post...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    postActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.stopPropagation();
            const actionType = this.querySelector('span').textContent;
            const post = this.closest('.social-post');
            const postAuthor = post.querySelector('.post-author').textContent;
            
            console.log(`Post action clicked: ${actionType} on ${postAuthor}'s post`);
            
            if (actionType === '24' || actionType === '15') {
                // Like action
                const likeCount = this.querySelector('span');
                const currentLikes = parseInt(likeCount.textContent);
                likeCount.textContent = currentLikes + 1;
                showNotification(`❤️ Liked ${postAuthor}'s post`);
            } else if (actionType === '8' || actionType === '12') {
                // Comment action
                showNotification(`💬 Comment on ${postAuthor}'s post`);
            } else if (actionType === 'Share') {
                // Share action
                showNotification(`📤 Shared ${postAuthor}'s post`);
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Voice Commands Functionality
function setupVoiceCommands() {
    const voiceCommandBtn = document.getElementById('voice-command-btn');
    const voiceCommandsBtn = document.querySelector('.voice-btn.secondary');
    
    if (voiceCommandBtn) {
        voiceCommandBtn.addEventListener('click', function() {
            console.log('Voice command button clicked');
            startVoiceRecognition();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (voiceCommandsBtn) {
        voiceCommandsBtn.addEventListener('click', function() {
            console.log('Voice commands list clicked');
            showVoiceCommandsList();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Start Voice Recognition
function startVoiceRecognition() {
    const voiceBtn = document.getElementById('voice-command-btn');
    const icon = voiceBtn.querySelector('i');
    const text = voiceBtn.querySelector('span');
    
    // Simulate voice recognition
    voiceBtn.classList.add('recording');
    icon.className = 'fas fa-microphone-slash';
    text.textContent = 'Listening...';
    
    showNotification('🎤 Listening... Speak now');
    
    // Simulate processing after 3 seconds
    setTimeout(() => {
        voiceBtn.classList.remove('recording');
        icon.className = 'fas fa-microphone';
        text.textContent = 'Tap to Speak';
        
        // Simulate voice command recognition
        const commands = [
            'Transfer ₦10,000 to Mom',
            'Check my balance',
            'Pay electricity bill',
            'Show my savings'
        ];
        
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        showVoiceCommandResult(randomCommand);
    }, 3000);
}

// Show Voice Command Result
function showVoiceCommandResult(command) {
    const result = document.createElement('div');
    result.className = 'voice-command-result';
    result.innerHTML = `
        <div class="voice-result-content">
            <i class="fas fa-microphone"></i>
            <div class="voice-result-text">
                <h4>Voice Command Detected</h4>
                <p>"${command}"</p>
            </div>
            <button class="voice-result-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the voice command result to match UBA design
    result.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #E60000 0%, #CC0000 100%);
        color: #FFFFFF;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(230, 0, 0, 0.3);
        animation: slideDownSmart 0.4s ease-out;
        max-width: 350px;
        width: 90%;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Style the content
    const content = result.querySelector('.voice-result-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const icon = content.querySelector('i');
    icon.style.cssText = `
        color: #FFFFFF;
        font-size: 18px;
        flex-shrink: 0;
    `;
    
    const textDiv = content.querySelector('.voice-result-text');
    textDiv.style.cssText = `
        flex: 1;
    `;
    
    const title = textDiv.querySelector('h4');
    title.style.cssText = `
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 4px 0;
    `;
    
    const commandText = textDiv.querySelector('p');
    commandText.style.cssText = `
        color: #FFFFFF;
        font-size: 12px;
        margin: 0;
        opacity: 0.9;
    `;
    
    // Style the close button
    const closeBtn = content.querySelector('.voice-result-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #FFFFFF;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // Add to page
    document.body.appendChild(result);
    
    // Close button functionality
    closeBtn.addEventListener('click', function() {
        result.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (result.parentNode) {
                result.parentNode.removeChild(result);
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (result.parentNode) {
            result.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                if (result.parentNode) {
                    result.parentNode.removeChild(result);
                }
            }, 300);
        }
    }, 5000);
}

// Show Create Post Modal
function showCreatePostModal() {
    const modal = document.createElement('div');
    modal.className = 'create-post-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Post</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <textarea placeholder="Share your financial achievements..." class="post-textarea"></textarea>
                <div class="post-options">
                    <label class="privacy-option">
                        <input type="radio" name="privacy" value="public" checked>
                        <span>Public</span>
                    </label>
                    <label class="privacy-option">
                        <input type="radio" name="privacy" value="friends">
                        <span>Friends Only</span>
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn secondary">Cancel</button>
                <button class="modal-btn primary">Share Post</button>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: #FFFFFF;
        border-radius: 16px;
        width: 100%;
        max-width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-btn.secondary');
    const shareBtn = modal.querySelector('.modal-btn.primary');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        modalContent.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    shareBtn.addEventListener('click', function() {
        const textarea = modal.querySelector('.post-textarea');
        const postText = textarea.value.trim();
        
        if (postText) {
            showNotification('📤 Post shared successfully!');
            closeModal();
        } else {
            showNotification('Please enter some text to share');
        }
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Show Voice Commands List
function showVoiceCommandsList() {
    const commandsList = [
        'Transfer ₦10,000 to Mom',
        'Check my balance',
        'Pay electricity bill',
        'Show my savings',
        'Open daily challenges',
        'View spending analytics',
        'Create group savings',
        'Check notifications'
    ];
    
    const modal = document.createElement('div');
    modal.className = 'voice-commands-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Voice Commands</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p class="commands-intro">Try saying any of these commands:</p>
                <div class="commands-list">
                    ${commandsList.map(cmd => `<div class="command-item">"${cmd}"</div>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: #FFFFFF;
        border-radius: 16px;
        width: 100%;
        max-width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        modalContent.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
} 

// Phase 3 Features Implementation

// AI Financial Insights Functionality
function setupAIFinancialInsights() {
    const insightButtons = document.querySelectorAll('.insight-btn');
    const viewAllBtn = document.querySelector('.ai-insights-section .view-all-btn');
    
    insightButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const insightItem = this.closest('.ai-insight-item');
            const insightTitle = insightItem.querySelector('.insight-title').textContent;
            
            console.log(`AI Insight action clicked: ${buttonText} for ${insightTitle}`);
            
            if (buttonText === 'Set Budget') {
                showNotification('🎯 Setting up weekend budget...');
                // Simulate budget setup
                setTimeout(() => {
                    showNotification('✅ Weekend budget set to ₦15,000');
                }, 1000);
            } else if (buttonText === 'Learn More') {
                showNotification('📊 Opening savings analysis...');
            } else if (buttonText === 'Verify') {
                showNotification('🔐 Opening security verification...');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('View all AI insights clicked');
            showNotification('🧠 Opening comprehensive AI insights...');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Biometric Authentication Functionality
function setupBiometricAuthentication() {
    const biometricToggles = document.querySelectorAll('.biometric-option input[type="checkbox"]');
    
    biometricToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const optionTitle = this.closest('.biometric-option').querySelector('.option-title').textContent;
            const isEnabled = this.checked;
            
            console.log(`Biometric ${optionTitle} ${isEnabled ? 'enabled' : 'disabled'}`);
            
            if (isEnabled) {
                showNotification(`🔐 ${optionTitle} authentication enabled`);
                // Simulate biometric setup
                setTimeout(() => {
                    showNotification(`✅ ${optionTitle} setup completed successfully`);
                }, 1500);
            } else {
                showNotification(`🔓 ${optionTitle} authentication disabled`);
            }
            
            // Save preference
            localStorage.setItem(`${optionTitle.toLowerCase().replace(' ', '')}Enabled`, isEnabled);
        });
    });
}

// Personalized Recommendations Functionality
function setupPersonalizedRecommendations() {
    const recommendationButtons = document.querySelectorAll('.recommendation-btn');
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    
    recommendationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const recommendationItem = this.closest('.recommendation-item');
            const recommendationTitle = recommendationItem.querySelector('.recommendation-title').textContent;
            
            console.log(`Recommendation action clicked: ${buttonText} for ${recommendationTitle}`);
            
            if (buttonText === 'Apply Now') {
                showNotification('💳 Opening credit card application...');
            } else if (buttonText === 'Start Investing') {
                showNotification('📈 Opening investment platform...');
            } else if (buttonText === 'Learn More') {
                showNotification('📚 Opening financial education...');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    recommendationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.classList.contains('recommendation-btn')) {
                return;
            }
            
            const recommendationTitle = this.querySelector('.recommendation-title').textContent;
            console.log(`Recommendation item clicked: ${recommendationTitle}`);
            showNotification(`Opening ${recommendationTitle} details...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Enhanced Gamification Functionality
function setupEnhancedGamification() {
    const gameButtons = document.querySelectorAll('.game-btn');
    const gameItems = document.querySelectorAll('.game-item');
    
    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameItem = this.closest('.game-item');
            const gameTitle = gameItem.querySelector('.game-title').textContent;
            const gameReward = gameItem.querySelector('.game-reward').textContent;
            
            console.log(`Game button clicked: ${gameTitle}`);
            showNotification(`🎮 Starting ${gameTitle}...`);
            
            // Simulate game loading
            setTimeout(() => {
                showNotification(`🎉 Congratulations! You earned ${gameReward}!`);
            }, 2000);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    gameItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.classList.contains('game-btn')) {
                return;
            }
            
            const gameTitle = this.querySelector('.game-title').textContent;
            console.log(`Game item clicked: ${gameTitle}`);
            showNotification(`Opening ${gameTitle} details...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Financial Education Hub Functionality
function setupFinancialEducationHub() {
    const courseButtons = document.querySelectorAll('.course-btn');
    const courseItems = document.querySelectorAll('.course-item');
    const viewAllBtn = document.querySelector('.education-hub-section .view-all-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const courseItem = this.closest('.course-item');
            const courseTitle = courseItem.querySelector('.course-title').textContent;
            
            console.log(`Course action clicked: ${buttonText} for ${courseTitle}`);
            
            if (buttonText === 'Continue') {
                showNotification(`📖 Continuing ${courseTitle}...`);
                // Simulate progress update
                setTimeout(() => {
                    const progressFill = courseItem.querySelector('.progress-fill');
                    const progressText = courseItem.querySelector('.progress-text');
                    if (progressFill && progressText) {
                        const currentWidth = parseInt(progressFill.style.width) || 0;
                        const newWidth = Math.min(currentWidth + 25, 100);
                        progressFill.style.width = `${newWidth}%`;
                        progressText.textContent = `${newWidth}% Complete`;
                        
                        if (newWidth >= 100) {
                            showNotification('🎓 Course completed! You earned a certificate!');
                        }
                    }
                }, 1000);
            } else if (buttonText === 'Start') {
                showNotification(`🚀 Starting ${courseTitle}...`);
                // Simulate course start
                setTimeout(() => {
                    const progressFill = courseItem.querySelector('.progress-fill');
                    const progressText = courseItem.querySelector('.progress-text');
                    if (progressFill && progressText) {
                        progressFill.style.width = '10%';
                        progressText.textContent = '10% Complete';
                    }
                }, 1000);
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    courseItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.classList.contains('course-btn')) {
                return;
            }
            
            const courseTitle = this.querySelector('.course-title').textContent;
            console.log(`Course item clicked: ${courseTitle}`);
            showNotification(`Opening ${courseTitle} details...`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('View all courses clicked');
            showNotification('📚 Opening all financial education courses...');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
} 

// User Photo and Settings Functionality
function setupUserPhoto() {
    const userPhoto = document.getElementById('user-photo');
    
    if (userPhoto) {
        userPhoto.addEventListener('click', function() {
            console.log('User photo clicked - navigating to settings page');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Navigate to user settings page
            window.location.href = 'user-settings.html';
        });
    }
}

// Back button functionality for user settings page
function setupBackButton() {
    const backToMainBtn = document.getElementById('back-to-main');
    
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', function() {
            console.log('Back button clicked - returning to main page');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Navigate back to main page
            window.location.href = 'index.html';
        });
    }
}

// Settings page functionality
function setupSettingsToggles() {
    const toggles = document.querySelectorAll('.settings-card .switch input[type="checkbox"]');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
            console.log(`Setting ${settingName} ${isEnabled ? 'enabled' : 'disabled'}`);
            
            // Save setting to localStorage
            localStorage.setItem(settingName, isEnabled);
            
            // Show notification
            const settingTitle = this.closest('.setting-item').querySelector('.setting-title').textContent;
            showNotification(`${settingTitle} ${isEnabled ? 'enabled' : 'disabled'}`);
        });
    });
}

function setupSettingsInputs() {
    const inputs = document.querySelectorAll('.settings-card input[type="text"], .settings-card input[type="email"], .settings-card input[type="tel"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const inputId = this.id;
            const inputValue = this.value;
            
            console.log(`Input ${inputId} updated: ${inputValue}`);
            
            // Save input to localStorage
            localStorage.setItem(inputId, inputValue);
            
            // Update user name in header if it's the name input
            if (inputId === 'user-name-input') {
                const userNameElement = document.querySelector('.user-name');
                if (userNameElement) {
                    userNameElement.textContent = inputValue || 'Name';
                }
            }
        });
    });
} 