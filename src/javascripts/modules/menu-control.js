export default function() {
    const control = document.querySelector('[data-js-menu-control]');
    const menu = document.querySelector('[data-js-menu]');
    const CLASS_ACTIVE = 'is-active';

    control.addEventListener('click', (event) => {
        event.preventDefault();
        control.classList.toggle(CLASS_ACTIVE);
        menu.classList.toggle(CLASS_ACTIVE);
    });
};
