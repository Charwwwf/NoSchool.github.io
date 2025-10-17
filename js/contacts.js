// Mobile menu toggle
document.getElementById('menuBtn').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const menuBtn = document.getElementById('menuBtn');
    
    if (!nav.contains(event.target) && event.target !== menuBtn) {
        nav.classList.remove('active');
    }
});

// FAQ аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
});

// Contact buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            
            switch(contactType) {
                case 'telegram':
                    window.open('https://t.me/NoSchoolAdmin', '_blank');
                    break;
                case 'phone':
                    window.open('tel:+79991234567');
                    break;
                case 'email':
                    window.open('mailto:vsevolodglotov9875@gmail.com');
                    break;
                case 'map':
                    window.open('https://yandex.ru/maps/?text=Воронеж', '_blank');
                    break;
            }
        });
    });
});

// Contact form submission with Formspree
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Показываем состояние загрузки
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(form);
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Успешная отправка
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            form.reset();
        } else {
            // Ошибка отправки
            const data = await response.json();
            if (data.errors) {
                alert('Ошибка: ' + data.errors.map(error => error.message).join(', '));
            } else {
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
            }
        }
    } catch (error) {
        // Ошибка сети
        alert('Произошла ошибка сети. Пожалуйста, проверьте соединение и попробуйте еще раз.');
    } finally {
        // Восстанавливаем кнопку
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Animation for elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.contact-card, .social-card, .faq-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize opacity and position
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});