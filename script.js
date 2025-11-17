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
            // Don't trigger copy for the phone number item when clicking on the save button
            if (!event.target.classList.contains('save-number-btn')) {
                const textToCopy = this.querySelector('span').textContent;
                copyToClipboard(textToCopy);
                showNotification('Copied to clipboard!');
            }
        });
    });
    
    // Add save number functionality
    const saveNumberBtn = document.getElementById('saveNumberBtn');
    if (saveNumberBtn) {
        saveNumberBtn.addEventListener('click', function() {
            const phoneNumber = this.previousElementSibling.textContent;
            saveContactToDevice('John Doe', phoneNumber);
        });
    }
    
    // Function to save contact to device
    function saveContactToDevice(name, phone) {
        // Check if the Contacts API is available
        if ('contacts' in navigator && 'ContactsManager' in window) {
            // Use the Contacts API if available
            saveContactWithAPI(name, phone);
        } else {
            // Fallback: Create a vCard and trigger download
            saveContactAsVCard(name, phone);
        }
    }
    
    // Save contact using the Contacts API (Chrome on Android)
    function saveContactWithAPI(name, phone) {
        if (navigator.contacts && navigator.contacts.save) {
            const contact = {
                name: name,
                tel: phone
            };
            
            navigator.contacts.save(contact).then(() => {
                showNotification(`Contact ${name} saved successfully!`);
            }).catch((error) => {
                console.error('Error saving contact:', error);
                // Fallback to vCard if API fails
                saveContactAsVCard(name, phone);
            });
        } else {
            // Fallback to vCard if API is not available
            saveContactAsVCard(name, phone);
        }
    }
    
    // Save contact as vCard file (universal fallback)
    function saveContactAsVCard(name, phone) {
        try {
            // Create vCard content
            const vCardData = `BEGIN:VCARD
    VERSION:3.0
    FN:${name}
    TEL:${phone}
    END:VCARD`;
            
            // Create blob and download link
            const blob = new Blob([vCardData], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            
            // Create temporary download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name.replace(/\s+/g, '_')}_contact.vcf`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            showNotification(`Contact file downloaded! Save to your contacts.`);
        } catch (error) {
            console.error('Error creating vCard:', error);
            showNotification(`Error saving contact. Copy: ${phone}`);
            // Fallback to copy clipboard
            copyToClipboard(phone);
        }
    }

    // Removed desktop mode indicator functionality
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
        transition: 'opacity 0.3s ease',
        fontFamily: '"Montserrat", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontWeight: '600',
        fontSize: '0.9rem'
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

// Removed desktop mode indicator functionality

