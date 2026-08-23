// frontend/js/dom.js

function createTripCard(trip, status = 'upcoming') {
    const isPast = status === 'past';
    const statusText = isPast ? 'Completed' : 'Upcoming';
    const statusClass = isPast ? 'status-past' : 'status-upcoming';
    const filterStyle = isPast ? 'style="filter: grayscale(20%);"' : '';
    
    const imgUrl = trip.cover_photo_url || (isPast ? 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
    
    let actions = '';
    if (isPast) {
        actions = `<a href="public.html?trip_id=${trip.id}" class="action-btn" style="color: #111827;">View Memories</a>`;
    } else {
        actions = `
            <a href="public.html?trip_id=${trip.id}" class="action-btn">View Itinerary</a>
            <a href="budget.html?trip_id=${trip.id}" class="action-btn">Budget</a>
            <a href="javascript:void(0)" onclick="editTrip(${trip.id})" class="action-btn" style="color: #10b981;">Edit</a>
        `;
    }
    
    return `
        <div class="trip-card">
            <img src="${imgUrl}" alt="${trip.title}" class="card-image" ${filterStyle}>
            <div class="card-content">
                <span class="status-pill ${statusClass}">${statusText}</span>
                <h3 class="card-title">${trip.title}</h3>
                <div class="card-meta">
                    <div class="meta-item">
                        <svg class="small-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${trip.start_date || 'TBD'} - ${trip.end_date || 'TBD'}
                    </div>
                </div>
                <div class="card-actions">
                    ${actions}
                </div>
            </div>
        </div>
    `;
}

function showModal(id) {
    const el = document.getElementById(id);
    if(el) el.style.display = 'flex';
}

function hideModal(id) {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
}

function displayGlobalAlert(msg, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.textContent = msg;
    alertDiv.style.display = 'block';
    
    alertDiv.style.background = type === 'success' ? 'rgba(56, 161, 105, 0.9)' : 'rgba(229, 62, 62, 0.9)';
    alertDiv.style.color = '#fff';
    alertDiv.style.padding = '12px 24px';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    alertDiv.style.fontWeight = '600';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}