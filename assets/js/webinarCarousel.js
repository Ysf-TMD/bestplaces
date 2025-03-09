let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function showItem(index) {
    if (index < 0) {
        currentIndex = items.length - 1;
    } else if (index >= items.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    items.forEach((item, i) => {
        item.style.display = (i === currentIndex) ? 'flex' : 'none';
    });
}

prevButton.addEventListener('click', () => {
    showItem(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    showItem(currentIndex + 1);
});


showItem(currentIndex);
setInterval(() => {
    showItem(currentIndex + 1);
}, 3000);