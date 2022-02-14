function _(sel) {
    const res = document.querySelectorAll(sel);

    return sel.includes('#') ? res[0] : res;
}

function log(...data) {
    console.log('[oengus]', ...data);
    Twitch.ext.rig.log(...data);
}

// setup Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-153189507-5', { 'anonymize_ip': true });


document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target) {
        return;
    }

    if (target.dataset.action) {
        // TODO: handle action
        event.preventDefault();

        if (target.dataset.action === 'run-details') {
            const run = target.dataset.run;
            const url = `https://oengus.io/en-GB/marathon/${window.marathonId}/schedule#run-${run}`;

            gtag('event', 'RunLinkClick', {
                'event_category': 'Click',
                'event_label': `run-${run}`,
                'value': url
            });

            window.open(url, '_blank');
        }
    }
});
