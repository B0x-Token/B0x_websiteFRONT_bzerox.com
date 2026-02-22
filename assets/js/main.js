/**
 * B0x Website JavaScript
 */

// Slideshow functionality
(function() {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const interval = 6000; // 6 seconds

    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    setInterval(showNextSlide, interval);
})();

// Dynamic Mining Stats
(function() {
    const JSON_URL = 'https://data.bzerox.org/mainnet/B0x_Mainnet_APY_STATS.json';
    const statsElement = document.getElementById('mining-stats');
    
    if (!statsElement) return;

    async function updateMiningStats() {
        try {
            const response = await fetch(JSON_URL);
            const data = await response.json();

            statsElement.innerHTML = `
                <p>Right now miners pay about ${data.mining.mining_fee_percentage}% of fees to mine the token to the contract,
                about $${data.mining.mining_cost_usd} a token and pay another ${data.mining.swap_fee_percentage}% to cashout.<br>
                So instead of 0% fees to mine and 0.3% to cashout they actually pay towards helping the system.</p>
                <p>Staking is currently at ${data.staking.apy}%.
                Mining at 31Gh/s equates to $${data.mining.daily_net_profit} USD in b0x value per day.</p>
            `;
        } catch (error) {
            console.log('Stats API unavailable, using defaults');
        }
    }

    // Load stats on page load
    updateMiningStats();
    
    // Refresh stats every 5 minutes
    setInterval(updateMiningStats, 300000);
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection Observer for scroll animations
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections that should animate on scroll
    document.querySelectorAll('.content-section, .stats-section, .paper-wallet-section, .token-info').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
})();

// Video autoplay fallback
(function() {
    const video = document.querySelector('.video-bg video');
    if (!video) return;

    video.play().catch(() => {
        // If autoplay fails, show poster image
        video.style.display = 'none';
        video.parentElement.style.backgroundImage = `url(${video.getAttribute('poster')})`;
        video.parentElement.style.backgroundSize = 'cover';
        video.parentElement.style.backgroundPosition = 'center';
    });
})();

// Console easter egg
console.log(`
⛏️  B0x - B ZERO X
━━━━━━━━━━━━━━━━━━━━━
Proof of Work on Base Chain
Mine it yourself!

https://bzerox.org
https://discord.gg/xWrRCRJEFC
`);
