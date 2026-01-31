// Admin image management
document.getElementById('admin-image-upload').addEventListener('change', function(event) {
    const files = event.target.files;
    const preview = document.getElementById('admin-image-preview');
    preview.innerHTML = '';
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.dataset.src = e.target.result; // For deletion
            preview.appendChild(img);
            // Store in localStorage
            let images = JSON.parse(localStorage.getItem('portfolioImages') || '[]');
            images.push(e.target.result);
            localStorage.setItem('portfolioImages', JSON.stringify(images));
        };
        reader.readAsDataURL(file);
    });
});

// Delete images
function deleteImages() {
    const preview = document.getElementById('admin-image-preview');
    const selected = preview.querySelectorAll('img');
    selected.forEach(img => img.remove());
    // In real use, remove from localStorage based on selection
    localStorage.removeItem('portfolioImages');
}

// Load pending reviews for approval
function loadPendingReviews() {
    const pending = JSON.parse(localStorage.getItem('pendingReviews') || '[]');
    const container = document.getElementById('pending-reviews');
    container.innerHTML = '';
    pending.forEach((review, index) => {
        const div = document.createElement('div');
        div.className = 'pending-review';
        div.innerHTML = `<strong>${review.name}:</strong> ${review.text}
            <button onclick="approveReview(${index})">Approve</button>
            <button onclick="rejectReview(${index})">Reject</button>`;
        container.appendChild(div);
    });
}

function approveReview(index) {
    let pending = JSON.parse(localStorage.getItem('pendingReviews') || '[]');
    let approved = JSON.parse(localStorage.getItem('approvedReviews') || '[]');
    approved.push(pending.splice(index, 1)[0]);
    localStorage.setItem('pendingReviews', JSON.stringify(pending));
    localStorage.setItem('approvedReviews', JSON.stringify(approved));
    loadPendingReviews();
}

function rejectReview(index) {
    let pending = JSON.parse(localStorage.getItem('pendingReviews') || '[]');
    pending.splice(index, 1);
    localStorage.setItem('pendingReviews', JSON.stringify(pending));
    loadPendingReviews();
}

loadPendingReviews();