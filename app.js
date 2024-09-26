// script.js
const purchaseModal = document.getElementById('purchaseModal');
const btnNewPurchase = document.getElementById('btnNewPurchase');
const closeModal = document.getElementsByClassName('close')[0];
const purchaseForm = document.getElementById('purchaseForm');
const tableBody = document.getElementById('tableBody');

// Abrir el modal
btnNewPurchase.onclick = () => {
    purchaseModal.style.display = 'block';
    resetForm();
};

// Cerrar el modal
closeModal.onclick = () => {
    purchaseModal.style.display = 'none';
};

// Cerrar el modal al hacer clic fuera del modal
window.onclick = (event) => {
    if (event.target === purchaseModal) {
        purchaseModal.style.display = 'none';
    }
};

// Manejar el envío del formulario
purchaseForm.onsubmit = async (event) => {
    event.preventDefault();
    const purchaseData = {
        date: document.getElementById('date').value,
        provider: document.getElementById('provider').value,
        number: document.getElementById('number').value,
        invoice: document.getElementById('invoice').value,
        total: document.getElementById('total').value,
    };
    const purchaseId = document.getElementById('purchaseId').value;
    if (purchaseId) {
        await updatePurchase(purchaseId, purchaseData);
    } else {
        await createPurchase(purchaseData);
    }
    purchaseModal.style.display = 'none';
    loadPurchases();
};

// Crear nueva compra
async function createPurchase(purchaseData) {
    await fetch('/api/purchases', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
    });
}

// Actualizar compra
async function updatePurchase(id, purchaseData) {
    await fetch(`/api/purchases/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
    });
}

// Cargar compras
async function loadPurchases() {
    const response = await fetch('/api/purchases');
    const purchases = await response.json();
    renderTable(purchases);
}

// Renderizar tabla
function renderTable(purchases) {
    tableBody.innerHTML = '';
    purchases.forEach(purchase => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(purchase.date).toLocaleDateString()}</td>
            <td>${purchase.provider}</td>
            <td>${purchase.number}</td>
            <td>${purchase.invoice}</td>
            <td>${purchase.total}</td>
            <td>
                <button onclick="editPurchase('${purchase._id}')">Editar</button>
                <button onclick="deletePurchase('${purchase._id}')">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Editar compra
function editPurchase(id) {
    const purchase = purchases.find(p => p._id === id);
    document.getElementById('purchaseId').value = purchase._id;
    document.getElementById('date').value = new Date(purchase.date).toISOString().split('T')[0];
    document.getElementById('provider').value = purchase.provider;
    document.getElementById('number').value = purchase.number;
    document.getElementById('invoice').value = purchase.invoice;
    document.getElementById('total').value = purchase.total;
    purchaseModal.style.display = 'block';
}

// Eliminar compra
async function deletePurchase(id) {
    await fetch(`/api/purchases/${id}`, {
        method: 'DELETE',
    });
    loadPurchases();
}

// Reiniciar formulario
function resetForm() {
    document.getElementById('purchaseId').value = '';
    document.getElementById('date').value = '';
    document.getElementById('provider').value = '';
    document.getElementById('number').value = '';
    document.getElementById('invoice').value = '';
    document.getElementById('total').value = '';
}

// Cargar las compras al inicio
loadPurchases();
