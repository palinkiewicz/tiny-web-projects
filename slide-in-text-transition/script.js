class Option {
    constructor(delayBetween, separator, childTag) {
        this.delayBetween = delayBetween;
        this.separator = separator;
        this.childTag = childTag;
    }
}

const HARD_WHITESPACE = '&nbsp;';

const OPTIONS = {
    letters: new Option(50, '', 'span'),
    words: new Option(150, ' ', 'span'),
    lines: new Option(300, '<br>', 'div'),
}

function animateText(container, delayBetween) {
    let delay = 0;

    container.classList.add('visible');
    container.querySelectorAll('.animatable-wrapper').forEach((wrapper) => {
        setTimeout(() => {
            wrapper.classList.add('shown');
        }, delay);

        delay += delayBetween;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const animatedTextContainers = document.querySelectorAll('[data-text-animation]');

    animatedTextContainers.forEach((container) => {
        const animationType = container.getAttribute('data-text-animation');
        let splitText = container.innerHTML.split(OPTIONS[animationType].separator);

        container.innerHTML = '';

        splitText.forEach((part, index) => {
            if (part === ' ') part = HARD_WHITESPACE;

            if (animationType === 'words' && index !== 0) {
                const space = document.createElement('span');
                space.classList.add('additional-space');
                space.innerHTML = HARD_WHITESPACE;
                container.append(space);
            }

            const partWrapper = document.createElement(OPTIONS[animationType].childTag);
            partWrapper.classList.add('animatable-wrapper');

            const partText = document.createElement('div');
            partText.innerHTML = part;

            partWrapper.append(partText);
            container.append(partWrapper);
        });
    });

    animatedTextContainers.forEach((container) => {
        const animationType = container.getAttribute('data-text-animation');
        animateText(container, OPTIONS[animationType].delayBetween);
    });
});