let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const addButtons =
document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
        button.closest(".card");

        const name =
        card.querySelector(".product-name")
        .innerText;

        const price =
        parseInt(
            card.querySelector(".product-price")
            .innerText
        );

        addToCart(name, price);
    });

});

function addToCart(name, price){

    const existing =
    cart.find(item =>
        item.name === name
    );

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            name:name,

            price:price,

            quantity:1

        });
    }

    saveCart();

    updateCounter();
}

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function updateCounter(){

    const counter =
    document.getElementById("cart-count");

    if(!counter) return;

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    counter.innerText = total;
}

function renderCart(){

    const container =
    document.getElementById("cart-items");

    if(!container) return;

    container.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item,index)=>{

        totalPrice +=
        item.price * item.quantity;

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>

                ${item.price} EGP

                </p>

            </div>

            <div class="qty-controls">

                <button
                class="qty-btn"
                onclick="decreaseQty(${index})">

                -

                </button>

                <span>

                ${item.quantity}

                </span>

                <button
                class="qty-btn"
                onclick="increaseQty(${index})">

                +

                </button>

                <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

                </button>

            </div>

        </div>
        `;
    });

    const total =
    document.getElementById("cart-total");

    if(total){

        total.innerText =
        totalPrice;
    }
}

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

    updateCounter();
}

function decreaseQty(index){

    cart[index].quantity--;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);
    }

    saveCart();

    renderCart();

    updateCounter();
}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    updateCounter();
}

updateCounter();

renderCart();

function sendOrder(){

    const name =
    document.getElementById(
    "customer-name")?.value;

    const phone =
    document.getElementById(
    "customer-phone")?.value;

    const address =
    document.getElementById(
    "customer-address")?.value;

    const notes =
    document.getElementById(
    "customer-notes")?.value;

    if(!name || !phone || !address){

        alert(
        "Please fill all required fields"
        );

        return;
    }

   let total = 0;

let message = `🛍️ *New Order*

━━━━━━━━━━━━━━

👤 *Customer Information*

📛 Name: ${name}

📞 Phone: ${phone}

📍 Address: ${address}

📝 Notes: ${notes || "No Notes"}

━━━━━━━━━━━━━━

🛒 *Products*

`;

cart.forEach(item => {

    message += `
📦 ${item.name}

🔢 Quantity: ${item.quantity}

💵 Price: ${item.price} EGP

--------------------
`;

    total += item.price * item.quantity;
});

message += `

━━━━━━━━━━━━━━

💰 *Order Total: ${total} EGP*

🙏 Thank You For Your Order
`;

   window.open(
`https://wa.me/201080544540?text=${encodeURIComponent(message)}`,
"_blank"
);
    localStorage.removeItem("cart");

cart = [];
updateCounter();
renderCart();
}