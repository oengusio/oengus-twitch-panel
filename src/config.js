const marathonInput = _('#marathon');
const marathonNameInput = _('#marathon_name');
const domainSelect = _('#domainSelector');

// we don't want to update the UI when the config is saved
window.listenForUpdates = false;

// Allow myself to use oengus.dev
// Just so that I don't have to mess with sandbox or prod.
if (document.location.host === 'localhost:8080') {
    const devOption = document.createElement('option');

    devOption.setAttribute('value', 'oengus.dev');
    devOption.innerHTML = 'oengus.dev';

    domainSelect.appendChild(devOption);
}

_('#config-form').addEventListener('submit', (event) => {
    event.preventDefault();

    saveConfig();

    return false;
});

_('#disable').addEventListener('click', disableExtension);


async function saveConfig() {
    bulmaToast.toast({
        duration: 4000,
        single: true,
        message: 'Saving....',
        type: 'is-warning',
        position: 'top-center',
        dismissible: true,
    });

    const marathonId = marathonInput.value;
    const oengusDomain = domainSelect.value;
    let marathonName = null;

    // Set the domain here so that we can fetch the info from the correct api
    window.oengusDomain = oengusDomain;

    try {
        if (marathonId) {
            marathonName = await getMarathonName(marathonId);
            marathonNameInput.value = marathonName;
        } else {
            marathonNameInput.value = 'None';
        }

        const newConfig = {
            marathonId: marathonId,
            domain: oengusDomain,
            marathonName,
        };

        updateTwitchConfig(newConfig);

        gtag('event', 'ConfigSaved', {
            'event_category': 'config',
            'event_label': marathonId,
        });

        bulmaToast.toast({
            duration: 2000,
            single: true,
            message: 'Config saved!',
            type: 'is-success',
            position: 'top-center',
            dismissible: true,
        });
    } catch (e) {
        bulmaToast.toast({
            duration: -1,
            single: true,
            message: `No marathon with id "${marathonId}" found.`,
            type: 'is-warning',
            position: 'top-center',
            dismissible: true,
        });
    }
}

function disableExtension() {
    marathonInput.value = '';

    saveConfig();
}

gtag('event', 'PageLoaded', {
    'event_category': 'Page',
    'event_label': 'config',
});

loadConfig((config) => {
    marathonInput.value = config.marathonId || '';
    marathonNameInput.value = config.marathonName || 'None';
    window.oengusDomain = config.domain || 'oengus.io';
    domainSelect.value = window.oengusDomain;

    gtag('event', 'ConfigLoaded', {
        'event_category': 'config',
        // 'event_label': '',
        'non_interaction': true,
    });
});
