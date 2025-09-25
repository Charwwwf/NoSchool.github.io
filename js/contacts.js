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

// Contact buttons functionality
document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function() {
        const contactType = this.getAttribute('data-contact');
        
        switch(contactType) {
            case 'phone':
                window.location.href = 'tel:+79991234567';
                break;
            case 'email':
                window.location.href = 'mailto:info@noschool.ru';
                break;
            case 'map':
                window.open('https://www.google.com.br/maps/@-7.8917417,-34.9186893,3a,59.5y,210.89h,80.21t/data=!3m7!1e1!3m5!1sFo2xPF5RNTCY6PLCiN8MwA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D9.790000000000006%26panoid%3DFo2xPF5RNTCY6PLCiN8MwA%26yaw%3D210.89!7i13312!8i6656?hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDkyMS4wIKXMDSoASAFQAw%3D%3D', '_blank');
                break;
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
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