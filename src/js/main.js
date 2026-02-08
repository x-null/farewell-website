// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import {Popover} from 'bootstrap';
import {default as Gumshoe} from 'gumshoejs';
import GLightbox from 'glightbox';

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
        new Popover(popover)
    });

function deadlineCounter(now) {
    const oneDay = 24 * 60 * 60 * 1000;
    const deadline = new Date(2027, 2, 1);
    const timeDiff = deadline - now;
    const daysDiff = Math.ceil(timeDiff / oneDay);
    return Math.max(daysDiff, 0);
}

function updateDaysLeft() {
    document
        .querySelectorAll('.deadline')
        .forEach(el => {
            const daysLeft = deadlineCounter(new Date());
            el.innerHTML = daysLeft === 0 || daysLeft > 1 ? `${daysLeft} days left` : `${daysLeft} day left`;
            if (daysLeft > 15 && daysLeft <= 30) {
                el.classList.add('text-warning');
            } else if (daysLeft <= 15) {
                el.classList.add('text-danger');
            }
        });
}

updateDaysLeft();
setInterval(() => {
    updateDaysLeft();
}, 1000 * 60);

const scrollSpy = new Gumshoe('#navbar-migration ul a', {
    nested: true,
    nestedClass: 'active-parent',
    reflow: true,
    offset: 100,
})
scrollSpy.detect();
document.addEventListener('gumshoeActivate', (event) => {
    event.detail.link.classList.add('active');
    const topMenu = event.target.closest('li ul')?.parentElement
    if (topMenu) {
        topMenu.firstElementChild.classList.add('active');
    }
}, false);
document.addEventListener('gumshoeDeactivate', (event) => {
    event.detail.link.classList.remove('active');
    const siblings = [...event.target.parentElement.children];
    const anyActiveSibling = siblings.some(el => el.classList.contains('active'));
    if (!anyActiveSibling) {
        const topMenu = event.target.closest('li ul')?.parentElement
        if (topMenu) {
            topMenu.firstElementChild.classList.remove('active');
        }
    }
}, false);

const lightbox = GLightbox();
