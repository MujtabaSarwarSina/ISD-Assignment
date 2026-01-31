// Checkout form functionality
function showCheckoutForm(){
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("orderActions").style.display = "none";
}

// Cancel checkout and go back to order summary
function cancelCheckout(){
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("orderActions").style.display = "flex";
}

// Place final order from checkout form
function placeFinalOrder(){
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if(!name || !phone || !email || !address){
        showModal("Missing Info", "Please fill all required fields.");
        return;
    }

    // Clear cart
    localStorage.removeItem("cart");
    cart = [];
    render(); // from order.js

    // Hide form and show order summary again
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("orderActions").style.display = "flex";

    // Show confirmation modal
    showModal("Order Placed!", `Thank you ${name}! Your food will be delivered soon.`);
}
