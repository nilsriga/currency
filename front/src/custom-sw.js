self.addEventListener('install', function (event) {
    console.log('Service Worker installing.', event.request.url);
    // Add custom install steps
});
self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.', event.request.url);
    // Add custom activate steps
});
self.addEventListener('fetch', function (event) {
    console.log('Fetching:', event.request.url);
    // Add custom fetch steps
});
