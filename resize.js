// resize.js

document.addEventListener("DOMContentLoaded", () => {
    const flashcard = document.querySelector('.flashcard');
    const content = document.querySelector('.content');

    const adjustFontSize = () => {
        let fontSize = parseInt(window.getComputedStyle(content).fontSize);
        const maxHeight = flashcard.clientHeight - 20;  // Adjusting for padding
        const maxWidth = flashcard.clientWidth - 20;   // Adjusting for padding

        while (content.scrollHeight > maxHeight || content.scrollWidth > maxWidth) {
            fontSize -= 1;
            content.style.fontSize = `${fontSize}px`;
        }
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
});

