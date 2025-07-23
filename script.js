document.addEventListener('DOMContentLoaded', () => {

    // ======================= Menu Mobile (Hamburguer) =======================
    const btnMobile = document.getElementById('btn-mobile');

    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
    }

    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                btnMobile.setAttribute('aria-expanded', 'false');
                btnMobile.setAttribute('aria-label', 'Abrir Menu');
            }
        });
    });


    // ======================= Header Fixo com Sombra ao Rolar =======================
    const header = document.getElementById('header');
    const navHeight = header.offsetHeight;

    function changeHeaderWhenScroll() {
        if (window.scrollY >= navHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', changeHeaderWhenScroll);


    // ======================= Carrossel de Depoimentos (LÓGICA ATUALIZADA) =======================
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (carouselContainer && prevBtn && nextBtn && testimonials.length > 0) {
        let currentIndex = 0;
        let itemsPerView = window.innerWidth >= 768 ? 2 : 1;
        const totalItems = testimonials.length;

        // ATUALIZAÇÃO: Função para definir a largura dos itens do carrossel
        function setItemWidths() {
            testimonials.forEach(item => {
                item.style.flex = `0 0 calc(${100 / itemsPerView}% - 30px)`;
            });
        }

        function updateCarousel() {
            const offset = -currentIndex * (100 / itemsPerView);
            carouselContainer.style.transform = `translateX(${offset}%)`;
        }
        
        function updateButtons() {
            prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex >= totalItems - itemsPerView ? 'none' : 'flex';
        }

        function showNext() {
            if (currentIndex < totalItems - itemsPerView) {
                currentIndex++;
                updateCarousel();
                updateButtons();
            }
        }

        function showPrev() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                updateButtons();
            }
        }
        
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);
        
        // Ajusta o carrossel ao redimensionar a janela
        window.addEventListener('resize', () => {
            const newItemsPerView = window.innerWidth >= 768 ? 2 : 1;
            if (newItemsPerView !== itemsPerView) {
                itemsPerView = newItemsPerView;
                
                // ATUALIZAÇÃO: Garante que a largura dos itens seja recalculada no resize
                setItemWidths();

                if (currentIndex > totalItems - itemsPerView) {
                    currentIndex = totalItems - itemsPerView;
                }
                updateCarousel();
                updateButtons();
            }
        });

        // Inicializa o carrossel
        setItemWidths(); // ATUALIZAÇÃO: Define a largura inicial correta
        updateCarousel();
        updateButtons();
    }


    // ======================= Animação de Fade-in ao Rolar =======================
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});
