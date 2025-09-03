// --- GLOBAL FUNCTIONS ---
// This function is global so any page can update the cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('enquiryCart')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// --- CODE TO RUN ON EVERY PAGE LOAD ---
document.addEventListener('DOMContentLoaded', function() {

    // This function adds an item to the cart
    function addToCart(productId, productName, productImage) {
        let cart = JSON.parse(localStorage.getItem('enquiryCart')) || [];
        let existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            alert(productName + ' is already in your enquiry cart.');
        } else {
            cart.push({ id: productId, name: productName, image: productImage, quantity: 1 });
            alert(productName + ' has been added to your enquiry cart!');
        }
        
        localStorage.setItem('enquiryCart', JSON.stringify(cart));
        updateCartCount(); // Call the global function
    }

    // Attach click event to all "Add to Enquiry" buttons on the page
    const addButtons = document.querySelectorAll('.add-to-enquiry-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productImage = this.getAttribute('data-product-image');
            addToCart(productId, productName, productImage);
        });
    });

    // Update the cart count as soon as the page loads
    updateCartCount();

    // --- BACK TO TOP BUTTON LOGIC ---
    let mybutton = document.getElementById("back-to-top-btn");
    if (mybutton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        };

        mybutton.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
});