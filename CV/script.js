document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para el Portafolio (sin cambios aquí) ---
    const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    document.querySelector('.portfolio-filters .filter-btn[data-filter="all"]').click();

    // --- Lógica REVISADA para las Barras de Progreso de Habilidades ---
    const skillProgressBars = document.querySelectorAll('.skill-item .progress');

    // Función para animar las barras de progreso cuando están en la vista
    function animateProgressBars() {
        skillProgressBars.forEach(bar => {
            const skillItem = bar.closest('.skill-item');
            const skillItemPosition = skillItem.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Define un umbral para cuándo queremos que la animación se dispare.
            // Por ejemplo, cuando el 80% del elemento es visible.
            if (skillItemPosition < screenHeight * 0.8 && skillItemPosition > -skillItem.offsetHeight * 0.5) { // Evita que se dispare si ya pasó mucho
                // Verifica si la animación ya se ha aplicado para evitar repetirla
                if (!bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-progress'); // ¡Leemos del data-attribute!
                    bar.style.setProperty('--skill-width', width);
                    bar.style.animation = 'fillProgress 1.5s ease-out forwards'; // Aplicamos la animación
                    bar.classList.add('animated'); // Marcamos como animado
                }
            } else {
                // Si la barra no está en la vista (o se desplaza fuera), resetea la animación
                bar.style.animation = 'none'; // Elimina la animación actual
                bar.style.setProperty('--skill-width', '0%'); // Reinicia el ancho
                bar.classList.remove('animated'); // Permite que se anime de nuevo si entra en vista
                // Forzar un "repaint" para asegurar que el 'none' se aplique antes de re-añadir
                void bar.offsetWidth;
            }
        });
    }

    // Ejecuta la animación al cargar la página (por si las barras ya son visibles)
    animateProgressBars();

    // Vuelve a ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateProgressBars);

    // --- Desplazamiento suave para enlaces de anclaje (sin cambios aquí) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});