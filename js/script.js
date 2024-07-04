/**
 * Array of main product images.
 * @type {string[]}
 */
const tableauImage = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
];

/**
 * Array of thumbnail images for the product.
 * @type {string[]}
 */
const tableauImageThumbnail = [
    "images/image-product-1-thumbnail.jpg",
    "images/image-product-2-thumbnail.jpg",
    "images/image-product-3-thumbnail.jpg",
    "images/image-product-4-thumbnail.jpg",
];

/**
 * Index of the currently displayed image.
 * @type {number}
 */
let currentImageIndex = 0;

/**
 * Initializes event listeners for the lightbox functionality.
 */
function init() {
    document.getElementById('lightbox-image').addEventListener('click', (event) => {
        event.preventDefault();
        lightboxOpen();
    });
    
}
implementHtml();
/**
 * Generates and displays the lightbox with the current image and thumbnails.
 */
function lightbox() {
    const thumbnailsHTML = tableauImageThumbnail.map((thumb, index) => `
        <img src="${thumb}" alt="product thumbnail" class="thumbnail ${index === currentImageIndex ? 'active' : ''}" data-index="${index}">
    `).join('');

    const lightboxHTML = `
        <dialog class="lightbox" id="lightbox">
            <div class="lightbox-content">
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

    lightbox.showModal();
    closeBtn.addEventListener('click', lightboxClose);
    previousBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            currentImageIndex = parseInt(event.target.getAttribute('data-index'), 10);
            updateLightboxImage();
        });
    });
}

/**
 * Opens the lightbox.
 */
function lightboxOpen() {
    lightbox();
}

/**
 * Closes the lightbox and removes it from the DOM.
 * @param {Event} event - The event triggered by the close button.
 */
function lightboxClose(event) {
    event.preventDefault();
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.close();
        lightbox.parentNode.removeChild(lightbox);
        // Remove the ID from the body when the lightbox is closed
        document.body.removeAttribute('id');
    }
}

/**
 * Displays the previous image in the lightbox.
 */
function showPreviousImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : tableauImage.length - 1;
    updateLightboxImage();
}

/**
 * Displays the next image in the lightbox.
 */
function showNextImage() {
    currentImageIndex = (currentImageIndex < tableauImage.length - 1) ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

/**
 * Updates the image and thumbnails in the lightbox to reflect the current image index.
 */
function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox_image img');
    
    if (lightboxImage) {
        lightboxImage.src = tableauImage[currentImageIndex];
    }

    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

/**
 * Implements additional HTML elements for thumbnails and main image.
 */
function implementHtml() {
    const thumbnailsInplementHTML = tableauImageThumbnail.map((thumb, index) => `
        <img src="${thumb}" alt="product thumbnail" class="thumbnail2 ${index === currentImageIndex ? 'active2' : ''}" data-index="${index}">
    `).join('');

    const imageInplementHTML = `
        <div>
            <a href="#" id="lightbox-image">
               <img src="${tableauImage[currentImageIndex]}" alt="product image">
            </a>
            <div id="thumbnails">
                <figure class="thumbnails_container">
                ${thumbnailsInplementHTML}
                </figure>
            </div>
        </div>
    `;

    document.querySelector('main').insertAdjacentHTML('afterbegin', imageInplementHTML);

    const thumbnails = document.querySelectorAll('.thumbnail2');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            currentImageIndex = parseInt(event.target.getAttribute('data-index'), 10);
            updateHtmlImage();
        });
    });
}

/**
 * Updates the image and thumbnails in the implemented HTML to reflect the current image index.
 */
function updateHtmlImage() {
    const lightbox_image = document.querySelector('#lightbox-image  img');

    if (lightbox_image) {
        lightbox_image.src = tableauImage[currentImageIndex];
    }

    document.querySelectorAll('.thumbnail2').forEach((thumb, index) => {
        thumb.classList.toggle('active2', index === currentImageIndex);
    });
}

/**
 * Initializes the quantity input and its increment/decrement buttons.
 * This function sets up event listeners for the buttons to increase or decrease
 * the quantity value. It also updates the visibility of the decrement button
 * based on the current quantity value.
 */
function updateQuantity() {
    const quantityInput = document.querySelector('#quantity');
    const quantityDown = document.querySelector('#minus');
    const quantityUp = document.querySelector('#plus');

    /**
     * Event handler for the decrement button click event.
     * Decreases the quantity value by 1 if it is greater than 1.
     */
    quantityDown.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
        updateButtonVisibility();
    });

    /**
     * Event handler for the increment button click event.
     * Increases the quantity value by 1.
     */
    quantityUp.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
        updateButtonVisibility();
    });

    /**
     * Updates the visibility of the decrement button based on the current quantity value.
     * If the quantity is greater than 1, the decrement button is enabled.
     * If the quantity is 1 or less, the decrement button is disabled.
     */
    function updateButtonVisibility() {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityDown.ariaDisabled = false;
        } else {
            quantityDown.ariaDisabled = true;
        }
    }

    // Initial call to set the visibility correctly
    updateButtonVisibility();
}

// Call the function to initialize the event listeners
updateQuantity();

init();