// ==========================================
// 1. ЗБЕРЕЖЕННЯ ДАНИХ У LOCALSTORAGE
// ==========================================
function saveSystemInfo() {
    const info = {
        browser: navigator.userAgent,
        platform: navigator.platform
    };

    localStorage.setItem('userSystemInfo', JSON.stringify(info));

    const footer = document.getElementById('main-footer');
    if (footer) {
        const savedData = JSON.parse(localStorage.getItem('userSystemInfo'));
        const infoText = document.createElement('p');
        infoText.style.fontSize = '0.8em';
        infoText.style.color = '#888';
        infoText.style.marginTop = '10px';
        infoText.innerText = `Ваша система: ${savedData.platform} | Браузер: ${savedData.browser}`;
        footer.appendChild(infoText);
    }
}

// ==========================================
// 2. ВІДГУКИ РОБОТОДАВЦІВ (FETCH API)
// ==========================================
async function loadComments() {
    const variant = 22; // 22-й варіант
    const container = document.getElementById('comments-container');

    if (!container) return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${22}/comments`);
        
        if (!response.ok) throw new Error("Помилка мережі");
        
        const comments = await response.json();
        container.innerHTML = ''; 
        
        // Виводимо перші 3 коментарі
        comments.slice(0, 3).forEach(comment => {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.style.borderBottom = '1px solid #eee';
            card.style.padding = '10px 0';
            card.innerHTML = `<p><strong>Email: ${comment.email}</strong></p><p>${comment.body}</p>`;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p style="color: #555; font-style: italic;">Не вдалося завантажити коментарі.</p>';
        console.error("Помилка завантаження відгуків:", error);
    }
}

// ==========================================
// 3. МОДАЛЬНЕ ВІКНО З ФОРМОЮ (ЧЕРЕЗ 1 ХВИЛИНУ)
// ==========================================
function initModal() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-button');

    if (modal) {
        // Показ вікна через 60 секунд
        setTimeout(() => {
            modal.style.display = 'block';
        }, 6000);

        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

// ==========================================
// 4. ПЕРЕМИКАННЯ ТЕМИ (ДЕНЬ/НІЧ)
// ==========================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const currentHour = new Date().getHours();
    
    // Автоматична темна тема вночі (з 21:00 до 07:00)
    if (currentHour < 7 || currentHour >= 21) {
        document.body.classList.add('dark-theme');
    }

    if (themeBtn) {
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-theme');
        };
    }
}

// ==========================================
// ЗАПУСК УСІХ ФУНКЦІЙ ПРИ ЗАВАНТАЖЕННІ
// ==========================================
window.onload = () => {
    saveSystemInfo();
    loadComments();
    initModal();
    initTheme();
};
