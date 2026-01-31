let cart = JSON.parse(localStorage.getItem("cart")) || [];
const itemsDiv = document.getElementById("orderItems");
let dark = localStorage.getItem("darkMode")==="true";
const modal = document.getElementById("modal");

// Apply dark mode if set
if(dark){
    document.body.classList.add("dark");
    document.getElementById("darkBtn").innerText="☀️";
}else{
    document.getElementById("darkBtn").innerText="🌙";
}

// Render cart items
function render(){
    let subtotal=0;
    itemsDiv.innerHTML="";
    if(cart.length===0){
        itemsDiv.innerHTML="<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item,index)=>{
            subtotal+=item.price*item.qty;
            itemsDiv.innerHTML+=`
            <div class="order-item">
                <span>${item.name}</span>
                <div class="qty">
                    <button onclick="changeQty(${index},-1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index},1)">+</button>
                </div>
                <span>৳${item.price*item.qty}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>`;
        });
    }
    document.getElementById("subtotal").innerText=subtotal;
    document.getElementById("total").innerText=subtotal+50;
}

// Quantity change
function changeQty(index,val){
    cart[index].qty+=val;
    if(cart[index].qty<1) cart[index].qty=1;
    localStorage.setItem("cart",JSON.stringify(cart));
    render();
}

// Remove item
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    render();
}

// Confirm order
function confirmOrder(){
    if(cart.length === 0){
        showModal("Cart is empty!", "Please add some items before placing an order.");
        return;
    }

    // Clear cart
    localStorage.removeItem("cart");
    cart = []; // reset local cart array
    render(); // refresh page
    showModal("Order Placed!", "Thank you for your purchase. Your food will be delivered soon.");
}

// Show modal
function showModal(title, message){
    const modalContent = modal.querySelector(".modal-content");
    modalContent.querySelector("h3").textContent = title;
    modalContent.querySelector("p").textContent = message;
    modal.classList.remove("fade-out");
    modal.style.display = "flex";
}

// Close modal
function closeModal(){
    modal.classList.add("fade-out");
    setTimeout(()=>{ modal.style.display="none"; }, 300);
}

// Dark mode toggle
function toggleDarkMode(){
    dark = !dark;
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", dark);
    document.getElementById("darkBtn").innerText = dark?"☀️":"🌙";
}

// Initial render
render();
