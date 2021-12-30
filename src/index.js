let interval = -1;

const scheduleLink = document.getElementById('schedule-link');

scheduleLink.addEventListener('click', () => {
    ga('send', 'event', {
        eventCategory: 'Click',
        eventAction: 'ScheduleLinkClick',
        eventLabel: 'ButtonClickDetail',
        eventValue: scheduleLink.href,
    });
});

ga('send', 'event', {
    eventCategory: 'Load',
    eventAction: 'PageLoaded',
    // eventLabel: 'Label',
    eventValue: 'home',
});

loadConfig((config) => {
    if (interval > -1) {
        interval = -1;
        clearInterval(interval);
    }

    if (!config.marathonId) {
        // reset the link in case of a config update
        scheduleLink.setAttribute('href', 'https://oengus.io/');
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
