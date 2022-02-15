let interval = -1;

const scheduleLink = document.getElementById('schedule-link');

scheduleLink.addEventListener('click', () => {
    if (window.marathonId) {
        gtag('event', 'ScheduleLinkClick', {
            'event_category': 'Click',
            'event_label': window.marathonId,
        });
    }
});

/*
gtag('event', 'your_event', {
    'event_action': '',
    'event_category': '',
    'event_label': '',
    'value': '' (value is a number)
});
*/

gtag('event', 'PageLoaded', {
    'event_category': 'Page',
    'event_label': 'ticker',
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

    gtag('event', 'TickerReady', {
        'event_category': 'Ticker',
        'event_label': config.marathonId,
        'non_interaction': true,
    });

    updateTicker();

    const curr = new Date();
    const startInterval = () => {
        // update every 60 seconds
        interval = setInterval(() => {
            redrawTicker(false);
        }, 30 * 1000);
    };
    // TODO: 30 sec in ms MINUS seconds in ms + ms
    const secUntilNextMin = 30 - curr.getSeconds();
    // sync to the computer time
    setTimeout(startInterval, secUntilNextMin * 1000);
});
