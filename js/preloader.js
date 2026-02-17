/* ===================================
   Preloader Logic (Minimal Counter)
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
});

function initPreloader() {
    const counterElement = document.getElementById('loaderCounter');
    const preloader = document.getElementById('preloader');
    
    // Κλείδωμα scroll
    document.body.classList.add('loading');

    let currentValue = 0;
    const duration = 2000; // 2 δευτερόλεπτα συνολική διάρκεια
    const intervalTime = 20; // Ανανέωση κάθε 20ms
    const steps = duration / intervalTime; // Πόσα βήματα θα γίνουν
    const increment = 100 / steps; // Πόσο αυξάνεται κάθε φορά (κατά προσέγγιση)

    let timer = setInterval(() => {
        // Τυχαία μικρή αύξηση για "φυσική" αίσθηση
        currentValue += Math.random() * (increment + 1.5); 
        
        if (currentValue >= 100) {
            currentValue = 100;
            clearInterval(timer);
            counterElement.textContent = "100";
            
            // Τέλος φόρτωσης
            setTimeout(() => {
                finishLoading();
            }, 300); // Μικρή παύση στο 100
        } else {
            counterElement.textContent = Math.floor(currentValue);
        }
    }, intervalTime);

    function finishLoading() {
        preloader.classList.add('finished');
        document.body.classList.remove('loading');
    }
}