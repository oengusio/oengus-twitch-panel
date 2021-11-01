let interval = -1;

loadConfig((config) => {
    if (interval > -1) {
        interval = -1;
        clearInterval(interval);
    }

    if (!config.marathonId) {
        // reset the link in case of a config update
        document.getElementById('schedule-link').setAttribute('href', 'https://oengus.io/');
        document.querySelector('.container').innerHTML = '<p>Extension not configured!</p>' +
            '<p>Please configure the extension within the settings.</p>';
        return;
    }

    window.marathonId = config.marathonId;

    updateTicker();

    // update every 60 seconds
    interval = setInterval(() => {
        redrawTicker(false);
    }, 60 * 1000);
});
