// Language translations
const translations = {
    en: {
        siteTitle: "JS Suman GFX - Portfolio",
        portfolioTitle: "Portfolio",
        uploadTitle: "Upload Images for Order",
        reviewsTitle: "Reviews",
        chatTitle: "Chat with Us"
    },
    bn: {
        siteTitle: "জেএস সুমন GFX - পোর্টফোলিও",
        portfolioTitle: "পোর্টফোলিও",
        uploadTitle: "অর্ডারের জন্য ছবি আপলোড করুন",
        reviewsTitle: "রিভিউ",
        chatTitle: "আমাদের সাথে চ্যাট করুন"
    },
    hi: {
        siteTitle: "जेएस सुमन GFX - पोर्टफोलियो",
        portfolioTitle: "पोर्टफोलियो",
        uploadTitle: "ऑर्डर के लिए इमेज अपलोड करें",
        reviewsTitle: "समीक्षाएं",
        chatTitle: "हमारे साथ चैट करें"
    }
};

let currentLanguage = 'en';

// Set language
function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('site-title').textContent = translations[lang].siteTitle;
    document.getElementById('portfolio-title').textContent = translations[lang].portfolioTitle;
    document.getElementById('upload-title').textContent = translations[lang].uploadTitle;
    document.getElementById('reviews-title').textContent = translations[lang].reviewsTitle;
    document.getElementById('chat-title').textContent = translations[lang].chatTitle;
}

// Image upload and preview
document.getElementById('image-upload').addEventListener('change', function(event) {
    const files = event.target.files;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
            // Store in localStorage (base64)
            let images = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
            images.push(e.target.result);
            localStorage.setItem('uploadedImages', JSON.stringify(images));
        };
        reader.readAsDataURL(file);
    });
});

// Remove images
function removeImages() {
    document.getElementById('image-preview').innerHTML = '';
    localStorage.removeItem('uploadedImages');
}

// Order form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const whatsappUrl = `https://wa.me/1234567890?text=Order from ${name} (${phone}): ${message}`;
    window.open(whatsappUrl, '_blank');
    // Store order in localStorage (dummy)
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ name, phone, message });
    localStorage.setItem('orders', JSON.stringify(orders));
});

// Reviews
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('approvedReviews') || '[]');
    const list = document.getElementById('review-list');
    list.innerHTML = '';
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review';
        div.innerHTML = `<strong>${review.name}:</strong> ${review.text}`;
        list.appendChild(div);
    });
}

document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('reviewer-name').value;
    const text = document.getElementById('review-text').value;
    let pending = JSON.parse(localStorage.getItem('pendingReviews') || '[]');
    pending.push({ name, text });
    localStorage.setItem('pendingReviews', JSON.stringify(pending));
    alert('Review submitted for approval!');
    document.getElementById('review-form').reset();
});

loadReviews();

// Chat UI (predefined replies)
const chatWindow = document.getElementById('chat-window');
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (!message) return;
    chatWindow.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';
    // Predefined AI reply
    setTimeout(() => {
        const reply = "Thank you for your message! We'll get back to you soon.";
        chatWindow.innerHTML += `<p><strong>Bot:</strong> ${reply}</p>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}