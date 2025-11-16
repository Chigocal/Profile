document.addEventListener('DOMContentLoaded', function() {
    // Add animation delays to social icons for staggered effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.setProperty('--delay', index);
    });

    // Contact button functionality
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Create a temporary textarea to copy email to clipboard
            const email = document.querySelector('.info-item .fa-envelope').nextElementSibling.textContent;
            
            // Show a notification
            showNotification(`Feel free to reach out! My email is ${email}`);
        });
    }

    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click functionality to copy contact info
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.querySelector('span').textContent;
            copyToClipboard(textToCopy);
            showNotification('Copied to clipboard!');
        });
    });
});

// Function to show notification
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '30px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    document.execCommand('copy');
    
    // Remove textarea
    document.body.removeChild(textarea);
}

// Add parallax effect to profile image on mouse move
document.addEventListener('mousemove', function(e) {
    const profileImage = document.querySelector('.profile-image');
    if (!profileImage) return;
    
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    profileImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset image position when mouse leaves
document.querySelector('.profile-card').addEventListener('mouseleave', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        profileImage.style.transition = 'transform 0.5s ease';
    }
});

// Re-enable transitions after reset
document.querySelector('.profile-card').addEventListener('mouseenter', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.transition = 'transform 0.1s ease';
    }
});

