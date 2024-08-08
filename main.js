document.addEventListener('DOMContentLoaded', function() {
    // Mock login functionality
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    const loginForm = document.getElementById('login-form');
    const flashcardForm = document.getElementById('flashcard-form');
    const cardWrapper = document.getElementById('card-wrapper');
    const categorySelect = document.getElementById('category-select');
    let categories = new Set();

    /*
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            alert('Login successful');
            loginForm.style.display = 'none';
            flashcardForm.style.display = 'block';
        } else {
            alert('Invalid credentials');
        }
    });
    */

    function loadFlashcards() {
        // Clear existing cards to prevent duplication
        cardWrapper.innerHTML = '';

        const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        savedFlashcards.forEach(term => createCard(term));
        updateCategoryDropdown();
    }

    function saveFlashcard(term) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push(term);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    function createCard(term) {
        const [frontText, backText, category] = term.split(':');

        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.category = category;

        const front = document.createElement('div');
        front.className = 'front';
        front.innerHTML = `<div class="category">${category}</div><div class="term">${frontText}</div>`;

        const back = document.createElement('div');
        back.className = 'back';
        back.innerHTML = `<div class="category">${category}</div><div class="term">${backText}</div>`;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });

        cardWrapper.appendChild(card);
        categories.add(category);

        adjustFontSize(front.querySelector('.term'));
        adjustFontSize(back.querySelector('.term'));
    }
    function adjustFontSize(element) {
        let fontSize = parseInt(window.getComputedStyle(element).fontSize);
        const maxHeight = element.parentElement.clientHeight;
        const maxWidth = element.parentElement.clientWidth;

        while (element.scrollHeight > maxHeight || element.scrollWidth > maxWidth) {
            fontSize -= 1;
            element.style.fontSize = `${fontSize}px`;
            if (fontSize <= 10) break; // Prevent font size from getting too small
        }
    }


    function updateCategoryDropdown() {
        categorySelect.innerHTML = '<option value="all">All</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    fetch('instrumentation-for-measurment-and-observation.txt')
        .then(response => response.text())
        .then(data => {
            const terms = data.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
            terms.forEach(term => createCard(term));
            updateCategoryDropdown();
        })
        .catch(error => console.error('Error fetching data:', error));

    loadFlashcards();

    // Filter cards based on the selected category
    categorySelect.addEventListener('change', function() {
        const selectedCategory = categorySelect.value;
        const cards = cardWrapper.getElementsByClassName('card');
        for (let card of cards) {
            card.style.display = (selectedCategory === 'all' || card.dataset.category === selectedCategory) ? 'block' : 'none';
        }
    });

    // Handle form submission to add new flashcards
    flashcardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(flashcardForm);
        const term = `${formData.get('frontText')}:${formData.get('backText')}:${formData.get('category')}`;

        createCard(term);
        saveFlashcard(term);
        updateCategoryDropdown();
        flashcardForm.reset();
    });
});
