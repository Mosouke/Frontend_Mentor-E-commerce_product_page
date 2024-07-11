// Array of main product images.
const tableauImage = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
];

// Array of thumbnail images for the product.
const tableauImageThumbnail = [
    "images/image-product-1-thumbnail.jpg",
    "images/image-product-2-thumbnail.jpg",
    "images/image-product-3-thumbnail.jpg",
    "images/image-product-4-thumbnail.jpg",
];

// Index of the currently displayed image.
let currentImageIndex = 0;

// Initializes event listeners for the lightbox functionality.
function init() {
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightboxImage) {
        lightboxImage.addEventListener('click', (event) => {
            event.preventDefault();
            lightboxOpen();
        });
    }
}

// Generates and displays the lightbox with the current image and thumbnails.
function lightbox() {
    const thumbnailsHTML = tableauImageThumbnail.map((thumb, index) => `
        <img src="${thumb}" alt="product thumbnail" class="thumbnail ${index === currentImageIndex ? 'active' : ''}" data-index="${index}">
    `).join('');

    const lightboxHTML = `
        <dialog class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <div id="lightbox-container">
                    <div class="lightbox-close">
                        <a href="#" class="lightbox-close" id="lightbox-close">
                            <img src="images/icon-close.svg" alt="close">
                        </a>
                    </div>
                    <div class="icon_preview" id="icon-preview">
                        <img src="images/icon-previous.svg" alt="icon preview">
                    </div>
                    <div class="lightbox_image">
                        <img src="${tableauImage[currentImageIndex]}" alt="product image">
                    </div>
                    <div class="icon_next" id="icon-next">
                        <img src="images/icon-next.svg" alt="icon next">
                    </div>
                </div>
                <figure class="thumbnails_container">
                    ${thumbnailsHTML}
                </figure>
            </div>
        </dialog>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const previousBtn = document.getElementById('icon-preview');
    const nextBtn = document.getElementById('icon-next');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (lightbox) lightbox.showModal();

    if (closeBtn) closeBtn.addEventListener('click', lightboxClose);
    if (previousBtn) previousBtn.addEventListener('click', showPreviousImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            currentImageIndex = parseInt(event.target.getAttribute('data-index'), 10);
            updateLightboxImage();
        });
    });
}

// Opens the lightbox.
function lightboxOpen() {
    lightbox();
}

// Closes the lightbox and removes it from the DOM.
function lightboxClose(event) {
    event.preventDefault();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.close();
        lightbox.parentNode.removeChild(lightbox);
    }
}

// Displays the previous image in the lightbox.
function showPreviousImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : tableauImage.length - 1;
    updateLightboxImage();
}

// Displays the next image in the lightbox.
function showNextImage() {
    currentImageIndex = (currentImageIndex < tableauImage.length - 1) ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

// Updates the image and thumbnails in the lightbox to reflect the current image index.
function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox_image img');
    if (lightboxImage) {
        lightboxImage.src = tableauImage[currentImageIndex];
    }
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Implements additional HTML elements for thumbnails and main image.
function implementHtml() {
    const thumbnailsHTML = tableauImageThumbnail.map((thumb, index) => `
        <img src="${thumb}" alt="product thumbnail" class="thumbnail2 ${index === currentImageIndex ? 'active2' : ''}" data-index="${index}">
    `).join('');

    const imageHTML = `
        <div>
            <a href="#" id="lightbox-image">
               <img src="${tableauImage[currentImageIndex]}" alt="product image">
            </a>
            <div id="thumbnails">
                <figure class="thumbnails_container">
                ${thumbnailsHTML}
                </figure>
            </div>
        </div>
    `;

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.insertAdjacentHTML('afterbegin', imageHTML);

        const thumbnails = document.querySelectorAll('.thumbnail2');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (event) => {
                currentImageIndex = parseInt(event.target.getAttribute('data-index'), 10);
                updateHtmlImage();
            });
        });
    }
}

// Updates the image and thumbnails in the implemented HTML to reflect the current image index.
function updateHtmlImage() {
    const lightboxImage = document.querySelector('#lightbox-image img');
    if (lightboxImage) {
        lightboxImage.src = tableauImage[currentImageIndex];
    }
    document.querySelectorAll('.thumbnail2').forEach((thumb, index) => {
        thumb.classList.toggle('active2', index === currentImageIndex);
    });
}

// Updates the visibility of the decrement button based on the current quantity value.
function updateButtonVisibility() {
    const quantityInput = document.querySelector('#quantity');
    const quantityDown = document.querySelector('#minus');
    const currentValue = parseInt(quantityInput?.value || '1', 10);
    if (quantityDown) {
        quantityDown.ariaDisabled = currentValue <= 1;
    }
}

// Sauvegarde les détails du produit dans le localStorage.
function saveProductDetailsToLocalStorage(quantity) {
    const productImage = document.querySelector('#lightbox-image img')?.src;
    const productTitle = document.querySelector('h2')?.innerText;
    const productPrice = document.querySelector('#grace-price')?.innerText.replace(/[^\d.]/g, '');

    const productDetails = {
        image: productImage,
        title: productTitle,
        price: parseFloat(productPrice),
        quantity: quantity
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProductIndex = products.findIndex(product => product.title === productDetails.title);

    if (existingProductIndex >= 0) {
        products[existingProductIndex].quantity = productDetails.quantity;
    } else {
        products.push(productDetails);
    }

    localStorage.setItem('products', JSON.stringify(products));
}

// Ajoute le produit au panier en sauvegardant les détails dans le localStorage.
function addToCart() {
    const quantityInput = document.querySelector('#quantity');
    const quantity = parseInt(quantityInput.value, 10);
    saveProductDetailsToLocalStorage(quantity);
    resetQuantityInput();
}

// Réinitialise la valeur du champ de quantité à 1.
function resetQuantityInput() {
    const quantityInput = document.querySelector('#quantity');
    if (quantityInput) {
        quantityInput.value = '1';
    }
}

// Loads product details from localStorage if they exist.
function loadProductDetailsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        try {
            const products = JSON.parse(storedProducts);
            if (products.length > 0) {
                const { image, title, price, quantity } = products[products.length - 1]; // Load last product
                if (image && title && price && quantity) {
                    const gracePriceElement = document.querySelector('#grace-price');
                    if (gracePriceElement) {
                        gracePriceElement.innerHTML = `${price}`;
                    }

                    const lightboxImage = document.querySelector('#lightbox-image img');
                    const productTitle = document.querySelector('h2');
                    const quantityInput = document.querySelector('#quantity');
                    if (lightboxImage) {
                        lightboxImage.src = image;
                    }
                    if (productTitle) {
                        productTitle.innerText = title;
                    }
                    if (quantityInput) {
                        quantityInput.value = quantity;
                    }

                    saveProductDetailsToLocalStorage(quantity);
                } else {
                    resetProductDetails();
                }
            } else {
                resetProductDetails();
            }
        } catch (e) {
            console.error('Error parsing product details from localStorage:', e);
            resetProductDetails();
        }
    } else {
        resetProductDetails();
    }
}

// Réinitialise les détails du produit à leurs valeurs par défaut.
function resetProductDetails() {
    const quantityInput = document.querySelector('#quantity');
    if (quantityInput) {
        quantityInput.value = '1'; // Valeur par défaut
    }
}

// Initializes the quantity update functionality.
function updateQuantity() {
    const quantityInput = document.querySelector('#quantity');
    const quantityDown = document.querySelector('#minus');
    const quantityUp = document.querySelector('#plus');

    if (quantityDown) {
        quantityDown.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput?.value || '1', 10);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
            updateButtonVisibility();
        });
    }

    if (quantityUp) {
        quantityUp.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput?.value || '1', 10);
            quantityInput.value = currentValue + 1;
            updateButtonVisibility();
        });
    }

    updateButtonVisibility();
}

// Initializes the modal box functionality for displaying the cart.
function modalBox() {
    const getProductsFromLocalStorage = () => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            try {
                const products = JSON.parse(storedProducts);
                return products;
            } catch (e) {
                console.error('Error parsing products from localStorage:', e);
                return [];
            }
        } else {
            return [];
        }
    };

    const openModalBox = document.querySelector('#cart');
    if (openModalBox) {
        openModalBox.addEventListener('click', () => {
            const products = getProductsFromLocalStorage();
            displayModalBox(products);
        });
    }

    const displayModalBox = (products) => {
        const modalBoxHTML = `
            <div class="modal-box">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Cart</h2>
                    <hr>
                    <div class="modal-body">
                        ${generateProductList(products)}
                    </div>
                    ${products.length > 0 ? `
                        <hr>
                        <div id="btn_margin">
                            <a id="btn1" href="#">checkout</a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalBoxHTML);

        const closeButton = document.querySelector('.modal-content .close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeAndClearModal();
            });
        }

        const deleteButtons = document.querySelectorAll('.delete-product');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                deleteProductFromLocalStorage(button.dataset.index);
                closeAndClearModal();
            });
        });
    };

    const generateProductList = (products) => {
        if (products.length === 0) {
            return `
                <p id="no_item">Your cart is empty</p>
            `;
        }

        const productListHTML = products.map((product, index) => `
            <div class="product-item">
                <div class="flex-container">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-details">
                        <p>${product.title}</p>
                        <p>$${product.price.toFixed(2)} x ${product.quantity} = <span id="fontBold">$${(product.price * product.quantity).toFixed(2)}</span></p>
                    </div>
                    <img class="delete-product" src="./images/icon-delete.svg" alt="delete" data-index="${index}">
                </div>
            </div>
        `).join('');

        return productListHTML;
    };

    const closeAndClearModal = () => {
        const modalBox = document.querySelector('.modal-box');
        if (modalBox) {
            modalBox.remove();
        }
    };

    const deleteProductFromLocalStorage = (index) => {
        const productDetails = JSON.parse(localStorage.getItem('products'));
        if (productDetails && productDetails.length > 0) {
            productDetails.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(productDetails));
            resetProductDetails();
        }
    };
}



// Initial call to load product details and initialize the quantity update functionality
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetailsFromLocalStorage();
    updateQuantity();
    implementHtml();
    init();
    modalBox();
});

const addToCartButton = document.querySelector('#add-to-cart-button');
if (addToCartButton) {
    addToCartButton.addEventListener('click', addToCart);
}
