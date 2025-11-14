// Animation au scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth scrolling pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fonction de téléchargement
function downloadGame() {
    // Téléchargement depuis Google Play Store (version publique)
    window.open('https://play.google.com/store/apps/details?id=com.vivi.bingo', '_blank');
}

// Animation des badges de sécurité
const securityItems = document.querySelectorAll('.security-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
        }
    });
}, observerOptions);

securityItems.forEach(item => {
    observer.observe(item);
});

// Animation des fonctionnalités
const features = document.querySelectorAll('.features li');
features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        feature.style.transition = 'all 0.5s ease';
        feature.style.opacity = '1';
        feature.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Gestion du formulaire newsletter
const subscribeButton = document.querySelector('.subscribe-button');
const emailInput = document.querySelector('.email-input');

if (subscribeButton && emailInput) {
    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (email === '') {
            alert('⚠️ Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Veuillez entrer une adresse email valide.');
            return;
        }
        
        alert('🎉 Merci pour votre inscription !\n\nVous serez informé(e) de nos nouveaux jeux.');
        
        emailInput.value = '';
    });
    
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            subscribeButton.click();
        }
    });
}

// Compteur de visiteurs (simulation)
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);

// Effet de particules au survol du bouton de téléchargement
const downloadButton = document.querySelector('.download-button');
if (downloadButton) {
    downloadButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    downloadButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
}

// Afficher un message de bienvenue
window.addEventListener('load', () => {
    console.log('🎮 Bienvenue sur Jeux, livres et divers Nouvelle-Calédonie !');
    console.log('🎰 Découvrez BINGO NC - Maintenant sur le Play Store !');
    console.log('🛡️ Version publique disponible');
});

// Créer des étoiles en arrière-plan
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '0';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
    
    document.body.insertBefore(starsContainer, document.body.firstChild);
}

// Ajouter l'animation de scintillement dans une feuille de style
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Créer les étoiles au chargement
createStars();

// Effet de confetti lors du clic sur le bouton de téléchargement
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#38ef7d', '#4facfe', '#fee140'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animation = setInterval(() => {
            x += vx;
            y += vy + 2;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 20);
    }
}

// Ajouter l'effet confetti au bouton de téléchargement
if (downloadButton) {
    downloadButton.addEventListener('click', () => {
        createConfetti();
    });
}
