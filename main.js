document.addEventListener('DOMContentLoaded', function() {
    fetch('terms.txt')
        .then(response => response.text())
        .then(data => {
            const terms = data.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
            const cardWrapper = document.getElementById('card-wrapper');
            const categorySelect = document.getElementById('category-select');

            // Extract unique categories
            const categories = new Set();
            terms.forEach(term => {
                const [_, __, category] = term.split(':');
                categories.add(category);
            });

            // Populate the category dropdown
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });

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
            }

            // Create cards for all terms
            terms.forEach(term => createCard(term));

            // Filter cards based on the selected category
            categorySelect.addEventListener('change', function() {
                const selectedCategory = categorySelect.value;
                const cards = cardWrapper.getElementsByClassName('card');
                for (let card of cards) {
                    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

