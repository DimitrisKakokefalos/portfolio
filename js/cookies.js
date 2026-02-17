document.addEventListener('DOMContentLoaded', () => {
    const bannerId = 'cookie-banner';
    const consentKey = 'cookieConsent';
    const container = document.getElementById(bannerId);

    if (!container) return;
    if (localStorage.getItem(consentKey)) return;

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    // Render Cookie Banner - Responsive
    container.innerHTML = `
        <div class="cookie-popup" style="
            position: fixed;
            bottom: ${isMobile ? '1rem' : '1.5rem'};
            left: 50%;
            transform: translateX(-50%);
            background: #161616;
            padding: ${isMobile ? '1.25rem' : '1.25rem 1.75rem'};
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: ${isMobile ? '20px' : '100px'};
            z-index: 9999;
            display: flex;
            flex-direction: ${isMobile ? 'column' : 'row'};
            align-items: center;
            gap: ${isMobile ? '1rem' : '1.5rem'};
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            font-family: 'Plus Jakarta Sans', sans-serif;
            width: ${isMobile ? 'calc(100% - 2rem)' : 'auto'};
            max-width: ${isMobile ? '400px' : '90%'};
            text-align: ${isMobile ? 'center' : 'left'};
        ">
            <p style="
                color: #a0a0a0; 
                margin: 0; 
                font-size: ${isMobile ? '0.85rem' : '0.9rem'}; 
                line-height: 1.5;
            ">
                We use cookies for a better experience.
                <a href="pages/privacy.html" style="color: #fff; margin-left: 0.25rem; text-decoration: underline;">Learn more</a>
            </p>
            <div style="
                display: flex; 
                gap: 0.75rem;
                width: ${isMobile ? '100%' : 'auto'};
                flex-shrink: 0;
            ">
                <button id="acceptCookies" style="
                    background: #fff;
                    color: #0a0a0a;
                    border: none;
                    padding: 0.6rem 1.25rem;
                    border-radius: 100px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
                    font-family: inherit;
                    transition: background 0.2s;
                    flex: ${isMobile ? '1' : 'none'};
                ">Accept</button>
                <button id="declineCookies" style="
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff;
                    padding: 0.6rem 1.25rem;
                    border-radius: 100px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-family: inherit;
                    transition: border-color 0.2s;
                    flex: ${isMobile ? '1' : 'none'};
                ">Decline</button>
            </div>
        </div>
    `;

    // Event Listeners
    document.getElementById('acceptCookies').addEventListener('click', () => {
        localStorage.setItem(consentKey, 'true');
        container.innerHTML = '';
    });

    document.getElementById('declineCookies').addEventListener('click', () => {
        localStorage.setItem(consentKey, 'false');
        container.innerHTML = '';
    });

    // Hover effects
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('mouseenter', () => acceptBtn.style.background = '#e0e0e0');
        acceptBtn.addEventListener('mouseleave', () => acceptBtn.style.background = '#fff');
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('mouseenter', () => declineBtn.style.borderColor = '#fff');
        declineBtn.addEventListener('mouseleave', () => declineBtn.style.borderColor = 'rgba(255,255,255,0.15)');
    }
});