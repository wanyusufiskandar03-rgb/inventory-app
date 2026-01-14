let inventory = [
    { name: "Sample Gadget", qty: 5, price: 25.00 },
    { name: "Pro Keyboard", qty: 2, price: 120.00 }
];

function renderInventory() {
    const tableBody = document.getElementById('inventory-body');
    tableBody.innerHTML = '';
    
    let totalValue = 0;
    let lowStockCount = 0;

    // Loop through inventory
    inventory.forEach((item, index) => {
        const subtotal = item.qty * item.price;
        totalValue += subtotal;

        if (item.qty < 3) lowStockCount++;

        const row = `
            <tr class="${item.qty < 3 ? 'low-stock' : ''}">
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})" style="background:#ff4d4d; color:white; padding:5px 10px;">Delete</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Update UI Stats
    document.getElementById('total-value').innerText = `$${totalValue.toFixed(2)}`;
    document.getElementById('low-stock-count').innerText = `${lowStockCount} Items Low`;
}

function addNewProduct() {
    const name = document.getElementById('prod-name').value;
    const qty = parseInt(document.getElementById('prod-qty').value);
    const price = parseFloat(document.getElementById('prod-price').value);

    if (name && qty && price) {
        inventory.push({ name, qty, price });
        renderInventory();
        // Clear inputs
        document.getElementById('prod-name').value = '';
        document.getElementById('prod-qty').value = '';
        document.getElementById('prod-price').value = '';
    } else {
        alert("Please fill in all fields correctly.");
    }
}

function removeItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

// Initial render
renderInventory();