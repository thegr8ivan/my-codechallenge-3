document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearListButton');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.toggle('purchased', item.purchased);
            listItem.innerHTML = `
                <span>${item.text}</span>
                <button class="markPurchasedButton">${item.purchased ? 'Unmark' : 'Mark as Purchased'}</button>
                <button class="removeButton">Remove</button>
            `;

            listItem.querySelector('.markPurchasedButton').addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                saveToLocalStorage();
                renderList();
            });

            listItem.querySelector('.removeButton').addEventListener('click', () => {
                items.splice(index, 1);
                saveToLocalStorage();
                renderList();
            });

            shoppingList.appendChild(listItem);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    addItemButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText === '') return;

        items.push({ text: itemText, purchased: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    });

    clearListButton.addEventListener('click', () => {
        items = [];
        saveToLocalStorage();
        renderList();
    });

    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItemButton.click();
        }
    });

    renderList();
});
