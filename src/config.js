const marathonInput = _('#marathon');
const marathonNameInput = _('#marathon_name');


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
    let marathonName = null;

    try {
        if (marathonId !== '') {
            marathonName = await getMarathonName(marathonId);
            marathonNameInput.value = marathonName;
        } else {
            marathonNameInput.value = 'None';
        }

        twitch.configuration.set('broadcaster', '1.0', JSON.stringify({
            marathonId: marathonId,
            marathonName,
        }));

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

loadConfig((config) => {
    marathonInput.value = config.marathonId || '';
    marathonNameInput.value = config.marathonName || 'None';
});
