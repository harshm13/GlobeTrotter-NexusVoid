document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get('trip_id');
    
    const budgetStatus = document.getElementById('budget-status');
    const totalSpentEl = document.getElementById('total-spent');
    const totalBudgetEl = document.getElementById('total-budget');
    const expensesList = document.getElementById('expenses-list');
    const categoryChart = document.getElementById('category-chart');
    const categoryLegend = document.getElementById('category-legend');
    
    const colors = { flights: '#2563eb', hotels: '#06b6d4', food: '#8b5cf6', activities: '#f43f5e', other: '#9ca3af' };
    const emojis = { flights: '✈️', hotels: '🏨', food: '🥐', activities: '🎟️', other: '🏷️' };
    
    let expenses = [];
    let budget = 5000; 
    
    async function loadExpenses() {
        try {
            // Uncomment this when backend is ready
            // const data = await apiFetch(`/trips/${tripId}/budget`);
            
            expenses = [
                { id: 1, category: 'flights', description: 'Roundtrip Flights', amount: 1300 },
                { id: 2, category: 'hotels', description: 'Le Meurice Paris', amount: 975 },
                { id: 3, category: 'food', description: 'Dinner at Le Marais', amount: 120 },
                { id: 4, category: 'activities', description: 'Louvre Tickets', amount: 65 }
            ];
            render();
        } catch (e) {
            console.error('Failed to load expenses', e.message);
        }
    }
    
    function render() {
        let totalSpent = 0;
        const sums = { flights: 0, hotels: 0, food: 0, activities: 0, other: 0 };
        
        expensesList.innerHTML = '';
        
        expenses.forEach(exp => {
            totalSpent += exp.amount;
            if(sums[exp.category] !== undefined) sums[exp.category] += exp.amount;
            else sums['other'] += exp.amount;
            
            const color = colors[exp.category] || colors.other;
            const emoji = emojis[exp.category] || emojis.other;
            expensesList.innerHTML += `
                <div class="expense-item">
                    <div class="expense-info">
                        <div class="expense-icon" style="background: ${color}">${emoji}</div>
                        <div class="expense-details">
                            <h4>${exp.description}</h4>
                            <p style="text-transform: capitalize;">${exp.category}</p>
                        </div>
                    </div>
                    <div class="expense-amount">$${exp.amount.toFixed(2)}</div>
                </div>
            `;
        });
        
        if (expenses.length === 0) {
            expensesList.innerHTML = '<p style="color: #111827; font-weight: 600;">No expenses yet.</p>';
        }
        
        const remaining = budget - totalSpent;
        totalBudgetEl.textContent = `$${budget.toFixed(2)}`;
        totalSpentEl.textContent = `$${totalSpent.toFixed(2)}`;
        budgetStatus.textContent = `$${Math.abs(remaining).toFixed(2)}`;
        budgetStatus.style.color = remaining >= 0 ? '#059669' : '#e11d48';
        
        let conicString = '';
        let currentPercent = 0;
        categoryLegend.innerHTML = '';
        
        for (const [cat, sum] of Object.entries(sums)) {
            if (sum > 0) {
                const percent = (sum / totalSpent) * 100;
                const nextPercent = currentPercent + percent;
                conicString += `${colors[cat]} ${currentPercent}% ${nextPercent}%, `;
                currentPercent = nextPercent;
                
                categoryLegend.innerHTML += `
                    <div class="legend-item">
                        <div class="dot" style="background: ${colors[cat]}"></div> 
                        <span style="text-transform: capitalize;">${cat}</span> (${Math.round(percent)}%)
                    </div>
                `;
            }
        }
        
        if (totalSpent === 0) conicString = '#e5e7eb 0 100%, ';
        categoryChart.style.background = `conic-gradient(${conicString.slice(0, -2)})`;
    }
    
    const form = document.getElementById('expense-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const desc = document.getElementById('expense-desc').value;
            const cat = document.getElementById('expense-category').value;
            const amount = parseFloat(document.getElementById('expense-amount').value);
            
            if (desc && amount) {
                expenses.unshift({
                    id: Date.now(),
                    category: cat,
                    description: desc,
                    amount: amount
                });
                render();
                form.reset();
            }
        });
    }
    
    loadExpenses();
});