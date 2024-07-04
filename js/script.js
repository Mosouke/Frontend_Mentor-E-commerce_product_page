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
                <div class="thumbnails_container">
                    ${thumbnailsHTML}
                </div>
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

init();
