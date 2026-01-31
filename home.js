const container = document.getElementById("foodContainer");
let homeQty = {};
let dark = localStorage.getItem("darkMode") === "true";
let currentFilter = "All";

// Dark mode persistent
if(dark){
    document.body.classList.add("dark");
    document.getElementById("darkBtn").innerText = "☀️";
}else{
    document.getElementById("darkBtn").innerText = "🌙";
}

// Render foods
function renderFoods(search=""){
    container.innerHTML = "";
    foods.forEach(food=>{
        if((currentFilter==="All" || food.group===currentFilter) &&
           food.name.toLowerCase().includes(search.toLowerCase())){
            homeQty[food.id] = homeQty[food.id] || 1;

            // Only Buy Now disabled if out of stock
            const buyDisabled = food.stock===0 ? 
                'disabled style="background:#ccc; cursor:not-allowed;" title="Out of stock"' : '';

            container.innerHTML += `
            <div class="food-card">
                <img src="${food.image}">
                <h3>${food.name}</h3>
                <div class="stars">${"★".repeat(food.rating)+ "☆".repeat(5-food.rating)}</div>
                <p class="${food.stock>0?'stock':'out'}">${food.stock>0?'In Stock':'Out of Stock'}</p>
                <p class="price">৳${food.price}</p>
                <p class="desc">${food.desc}</p>
                <div class="qty">
                    <button onclick="changeQty(${food.id}, -1)">-</button>
                    <span id="qty-${food.id}">${homeQty[food.id]}</span>
                    <button onclick="changeQty(${food.id}, 1)">+</button>
                </div>
                <button class="primary-btn" onclick="addToCart(${food.id})">Add to Cart</button>
                <button class="secondary-btn" id="buy-${food.id}" onclick="buyNow(${food.id})" ${buyDisabled}>Buy Now</button>
                <p class="msg" id="msg-${food.id}"></p>
            </div>`;
        }
    });
}

window.onload = ()=>renderFoods();

// Quantity change
function changeQty(id,val){
    homeQty[id] += val;
    if(homeQty[id]<1) homeQty[id]=1;
    document.getElementById(`qty-${id}`).innerText = homeQty[id];
}

// Add to cart (no duplicates)
function addToCart(id){
    const food = foods.find(f=>f.id===id);
    const msg = document.getElementById(`msg-${id}`);
    if(food.stock<=0){
        msg.innerText="Out of stock";
        msg.className="msg error";
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item=>item.id===id);
    if(existing){
        existing.qty += homeQty[id];
    }else{
        cart.push({...food, qty:homeQty[id]});
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    msg.innerText="Added to cart";
    msg.className="msg success";
}

// Buy now
function buyNow(id){
    addToCart(id);
    window.location.href="order.html";
}

// Search
document.getElementById("searchInput").addEventListener("input", function(){
    renderFoods(this.value);
});

// Filter
function filterGroup(group){
    currentFilter = group;
    const searchVal = document.getElementById("searchInput").value;
    renderFoods(searchVal);
    document.querySelectorAll(".category-btn").forEach(btn=>{
        btn.innerText===group?btn.classList.add("active"):btn.classList.remove("active");
    });
}

// Dark mode toggle
function toggleDarkMode(){
    dark = !dark;
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", dark);
    document.getElementById("darkBtn").innerText = dark?"☀️":"🌙";
}
