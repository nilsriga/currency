'use client'
export function registerServiceWorker() {
    console.log(1)
    console.log(2)
    console.log(window)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        console.log(3)
        const swUrl = `/sw.js`; // Adjust for public URL
        console.log(4)

        const registerSW = () => {
            console.log(5, 'listener loaded'); 
            navigator.serviceWorker
            .register(swUrl)
            .then((registration) => {
                    console.log(6, "registering"); 
                    console.log('Service Worker registered with scope:', registration.scope);
                    
                    // Check for updates
                    registration.onupdatefound = () => {
                        console.log(7); 
                        const installingWorker = registration.installing;
                        if (installingWorker) {
                            console.log(8); 
                            installingWorker.onstatechange = () => {
                                console.log(9); 
                                if (installingWorker.state === 'installed') {
                                    console.log(10); 
                                    if (navigator.serviceWorker.controller) {
                                        console.log(11); 
                                        // New update available, notify the user
                                        console.log('New content is available; please refresh.');
                                    } else {
                                        console.log('Content is cached for offline use.');
                                    }
                                }
                            };
                        }
                    };
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        };

        if (document.readyState === 'complete') {
            console.log(12); 
            registerSW();
        } else {
            console.log(13); 
            window.addEventListener('load', registerSW);
        }
    } else {
        console.log(14); 
        console.log('Service workers are not supported in this browser.');
    }
}
