export default function menuControl() {
    const control = document.querySelector('[data-js-menu-control]');
    const menu = document.querySelector('[data-js-menu]');
    const CLASS_ACTIVE = 'is-active';

    control.addEventListener('click', (event) => {
        event.preventDefault();
        control.classList.toggle(CLASS_ACTIVE);
        menu.classList.toggle(CLASS_ACTIVE);

        if(control.classList.contains(CLASS_ACTIVE)) {
            trigger(12);
        }
    });


    // delayed image loading; call trigger(n) to speed it up
    const images = document.querySelectorAll('[data-delay]');
    const load = function() { this.src = this.dataset.src; }
    const triggers = Array.from(images).map((image) => {
        const trigger = load.bind(image);
        setTimeout(trigger, image.dataset.delay);
        return trigger;
    });

    function trigger(n) {
        for(let i=0; i<n; i++)
            if(typeof triggers[i] !== 'undefined')
                triggers[i]();
    }
};
