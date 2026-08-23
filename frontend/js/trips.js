// frontend/js/trips.js

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadTrips();

    const tripForm = document.getElementById('trip-form');
    if (tripForm) {
        tripForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('trip-id').value;
            const payload = {
                title: document.getElementById('trip-title').value,
                destination: document.getElementById('trip-title').value, // Fallback if destination field is missing
                start_date: document.getElementById('trip-start').value,
                end_date: document.getElementById('trip-end').value,
                total_budget: parseFloat(document.getElementById('trip-budget').value) || 0,
                cover_photo_url: document.getElementById('trip-photo').value || null
            };

            const method = id ? 'PUT' : 'POST';
            const endpoint = id ? `/trips/${id}` : '/trips/';

            try {
                // apiFetch automatically throws if it fails
                await apiFetch(endpoint, {
                    method: method,
                    body: JSON.stringify(payload)
                });
                
                hideModal('trip-modal');
                displayGlobalAlert(id ? 'Trip updated!' : 'Trip created!');
                loadTrips();
            } catch (err) {
                displayGlobalAlert(err.message, 'error');
            }
        });
    }
});

let currentTrips = [];

async function loadTrips() {
    try {
        // apiFetch automatically parses the JSON!
        currentTrips = await apiFetch('/trips/');
        renderTrips();
    } catch (e) {
        console.error('Failed to fetch trips:', e.message);
        const grid = document.getElementById('trips-grid');
        if (grid) grid.innerHTML = '<p style="grid-column: 1/-1; color: #e11d48; font-weight: 600;">Failed to load trips.</p>';
    }
}

function renderTrips() {
    const grid = document.getElementById('trips-grid');
    if (!grid) return;

    if (currentTrips.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; color: #111827; font-weight: 600;">No trips found. Click "New Trip" to start!</p>';
        return;
    }

    grid.innerHTML = '';
    currentTrips.forEach(trip => {
        const cardWrapper = document.createElement('div');
        cardWrapper.innerHTML = createTripCard(trip);
        grid.appendChild(cardWrapper.firstElementChild);
    });
}

window.openCreateModal = () => {
    const form = document.getElementById('trip-form');
    if (form) form.reset();
    document.getElementById('trip-id').value = '';
    document.getElementById('modal-title').textContent = 'Create New Trip';
    showModal('trip-modal');
};

window.editTrip = (id) => {
    const trip = currentTrips.find(t => t.id === id);
    if (!trip) return;
    document.getElementById('trip-id').value = trip.id;
    document.getElementById('trip-title').value = trip.title;
    document.getElementById('trip-desc').value = trip.description || '';
    document.getElementById('trip-start').value = trip.start_date;
    document.getElementById('trip-end').value = trip.end_date;
    document.getElementById('trip-budget').value = trip.total_budget || 0;
    document.getElementById('trip-photo').value = trip.cover_photo_url || '';
    document.getElementById('modal-title').textContent = 'Edit Trip';
    showModal('trip-modal');
};

window.deleteTrip = async (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
        try {
            await apiFetch(`/trips/${id}`, { method: 'DELETE' });
            displayGlobalAlert('Trip deleted successfully.');
            loadTrips();
        } catch (err) {
            displayGlobalAlert(err.message, 'error');
        }
    }
};