if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        if (navigator.serviceWorker.controller) {
            console.log('ServiceWorker already registered.');
        } else {
            // Listen to messages from service workers.
            navigator.serviceWorker.addEventListener('message', function (event) {
                console.log('ServiceWorker actived successful.');
            });

            navigator.serviceWorker.register('./service-worker.js').then(
                function (registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    if (registration.active && registration.active.state == 'activated') {
                        console.log('ServiceWorker actived successful.');
                    }
                },
                function (error) {
                    console.log('ServiceWorker registration failed: ', error);
                }
            );
        }
    });
} else {
    console.log('ServiceWorker not supported.');
}

function registerSafariFallbackSync() {
    if (navigator.serviceWorker && !window.SyncManager) {
        window.addEventListener('online', function () {
            navigator.serviceWorker.ready.then(function (registration) {
                if (registration.active) {
                    registration.active.postMessage('watchlist_sync');
                }
            })
        });
    }
}