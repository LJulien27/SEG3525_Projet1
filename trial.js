// Get references to the relevant elements
const sortOption = document.getElementById('sort-option');
const itemsContainer = document.querySelector('.items');
const category = document.getElementById('category');

// Define an array to store the card elements
let items = Array.from(itemsContainer.getElementsByClassName('card'));

// Function to compare card prices for sorting
function comparePrices(a, b) {
    const priceA = parseFloat(a.querySelector('.item-price').textContent.replace('$',''));
    const priceB = parseFloat(b.querySelector('.item-price').textContent.replace('$',''));
    return priceA - priceB;
}

// Function to update the items container with sorted cards
function updateItems() {
    items.sort(comparePrices);

  // Check the sort option and reverse the array if necessary
    if (sortOption.value === 'price-high-to-low') {
        items.reverse();
    }

  // Remove existing cards from the container
    while (itemsContainer.firstChild) {
        itemsContainer.firstChild.remove();
    }

  // Append the sorted cards back to the container
    items.forEach(item => {
        //next two lines are more about the price
        const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
        const isExpensive = price > 60;

        if (category.value === "c&s") {
            if (item.classList.contains('c&s')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else if(category.value === "firstaid"){
            if (item.classList.contains('firstaid')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else if(category.value === "allergy"){
            if (item.classList.contains('allergy')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else if(category.value === "vitamin"){
            if (item.classList.contains('vitamin')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else if(category.value === "pain"){
            if (item.classList.contains('pain')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else if(category.value === "stom"){
            if (item.classList.contains('stom')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        } else {
            item.style.display = 'block';
        }

        itemsContainer.appendChild(item);
    });
}

function scrollToSection(sectionId) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateToPres() {
    window.location.href = 'ordernow.html#prescriptions-section';
}

function navigateToCart() {
    window.location.href = 'ordernow.html#cart-section';
}

function filterCards() {
    const input = document.getElementById('inputSearch');
    const searchTerm = input.value.toLowerCase();
    const cards = document.getElementsByClassName('drug');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const cardId = card.getAttribute('id').toLowerCase();

        if (cardId === searchTerm) {
            card.classList.remove('hidden');
            card.style.display = 'block';
            card.style.visibility = 'visible';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
            card.style.visibility = 'hidden';
        }
    }
}

// Event listener for sort option change
sortOption.addEventListener('change', updateItems);

category.addEventListener('change', updateItems);

// Call the updateItems function initially to sort the cards based on default option
updateItems();


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////////CART       ///////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

var totalPrice = 0;

function addToCart(button) {
    const card = button.closest('.card');
    const name = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-text').textContent;
    const price = parseFloat(card.querySelector('.item-price').textContent.replace('$', ''));

    const cartItem = document.createElement('li');
    cartItem.classList.add('my-1');
    cartItem.innerHTML = `${name} - ${description} - $${price.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('btn', 'btn-outline-danger', 'remove-item-btn', 'ms-4');
    removeButton.addEventListener('click', () => {
        cartItem.remove();
        totalPrice -= price;
        document.getElementById('cart-total').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    });

    cartItem.appendChild(removeButton);
    document.getElementById('cart-items').appendChild(cartItem);

    totalPrice += price;
    document.getElementById('cart-total').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

document.getElementById('checkout-button').addEventListener('click', function() {
    const firstNameInput = document.getElementById('first-n');
    const lastNameInput = document.getElementById('last-n');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phone');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('cardDate');
    const cvvInput = document.getElementById('cardCCV');
    const dateTimeInput = document.getElementById('dateTime');

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneNumberInput.value;
    const cardNumber = cardNumberInput.value;
    const expiryDate = expiryDateInput.value;
    const cvv = cvvInput.value;
    const dateTime = new Date(dateTimeInput.value);

    const cardNumberPattern = /^\d+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberPattern = /^[\d\s-]+$/;
    const cvvPattern = /^\d{3}$/;

    if (!firstName || !lastName || !email || !phoneNumber || !cardNumber || !expiryDate || !cvv || !dateTime) {
        alert('Please fill out all the fields');
    } else if (dateTime.getHours() < 9 || dateTime.getHours() >= 21) {
        alert('Please select a time between 9 AM and 9 PM');
    } else if (!cardNumber.match(cardNumberPattern)) {
        alert('Please enter a valid card number');
    } else if (!email.match(emailPattern)) {
        alert('Please enter a valid email address');
    } else if (!phoneNumber.match(phoneNumberPattern)) {
        alert('Please enter a valid phone number');
    } else if (!cvv.match(cvvPattern)) {
        alert('Please enter a valid CVV');
    } else {
        const fullName = `${firstName} ${lastName}`;
        alert(`Thank you, ${fullName}! You should receive an email confirmation shortly.`);

        // Reset input values
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        phoneNumberInput.value = '';
        cardNumberInput.value = '';
        expiryDateInput.value = '';
        cvvInput.value = '';
        dateTimeInput.value = '';
    }
});
