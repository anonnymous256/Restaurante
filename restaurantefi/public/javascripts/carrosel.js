
        const images = document.querySelectorAll('.carrosel img');
        let currentImageIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        }

        document.getElementById('prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });

        document.getElementById('next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });

        // Mostrar a primeira imagem inicialmente
        showImage(currentImageIndex);

        