import items from "./gallery-items.js"

const refs = {
    ul: document.querySelector(".js-gallery"),
    modal: document.querySelector(".lightbox"),
    modalCloseButton: document.querySelector(".lightbox__button"),
    lightbox_image: document.querySelector(".lightbox__image"),
    modal_overlay: document.querySelector(".lightbox__overlay"),
}

makeGalleryMarkup()
function makeGalleryMarkup() {
    const arr = items.map((item) => {
        const listItem = document.createElement("li")
        listItem.classList.add("gallery__item")

        const linkItem = document.createElement("a")
        linkItem.classList.add("gallery__link")

        listItem.append(linkItem)

        const imgItem = document.createElement("img")
        imgItem.classList.add("gallery__image")

        linkItem.append(imgItem)
        return listItem
    })

    refs.ul.append(...arr)

    refs.li = document.querySelectorAll(".gallery__item")
    refs.a = document.querySelectorAll(".gallery__link")
    refs.img = document.querySelectorAll(".gallery__image")
    setAtrributes()
}

function setAtrributes() {
    for (let i = 0; i < items.length; i++) {
        refs.a[i].setAttribute("href", items[i].original)
        refs.img[i].setAttribute("src", items[i].preview)
        refs.img[i].setAttribute("data-source", items[i].original)
        refs.img[i].setAttribute("alt", items[i].description)
        refs.img[i].setAttribute("data-index", [i])
    }
}

refs.ul.addEventListener("click", openModal)
refs.modalCloseButton.addEventListener("click", closeModal)
refs.modal_overlay.addEventListener("click", closeModal)
document.addEventListener("keydown", closeModal_key)
document.addEventListener("keydown", scrollLeft)
document.addEventListener("keydown", scrollRight)

function scrollLeft(event) {
    if (event.key === "ArrowLeft" && Number(refs.lightbox_image.dataset.index) === 0) {
        makeImage(items.length - 1)
    } else if (event.key === "ArrowLeft" && refs.lightbox_image.dataset.index > 0) {
        makeImage(Number(refs.lightbox_image.dataset.index) - 1)
    }
}

function scrollRight(event) {
    if (event.key === "ArrowRight" && Number(refs.lightbox_image.dataset.index) === items.length - 1) {
        makeImage(items.length - items.length)
    } else if (event.key === "ArrowRight" && refs.lightbox_image.dataset.index < 8) {
        makeImage(Number(refs.lightbox_image.dataset.index) + 1)
    }
}

function openModal(event) {
    event.preventDefault()
    if (event.target.nodeName === "IMG") {
        refs.modal.classList.add("is-open")

        makeImage(Number(event.target.dataset.index))
    }
}
function makeImage(currentIndex) {
    const currentImg = Object.values(refs.img).find((item, index) => index === currentIndex)
    refs.lightbox_image.setAttribute("src", currentImg.dataset.source)
    refs.lightbox_image.setAttribute("alt", currentImg.getAttribute("img"))
    refs.lightbox_image.setAttribute("data-index", currentImg.dataset.index)
}

function closeModal(event) {
    refs.modal.classList.remove("is-open")
    refs.lightbox_image.setAttribute("src", "")
}
function closeModal_key(event) {
    if (event.key === "Escape") {
        closeModal()
    }
}
