const marathonInput = document.getElementById('marathon');
document.getElementById('config-form').addEventListener('submit', (event) => {
    event.preventDefault();

    saveConfig();

    return false;
});

function saveConfig() {
    twitch.configuration.set('broadcaster', '1.0', JSON.stringify({
        marathonId: marathonInput.value,
    }));

    bulmaToast.toast({
        duration: 2000,
        message: 'Config saved!',
        type: 'is-success',
        position: 'top-center',
        dismissible: true,
    });
}

function disableExtension() {
    marathonInput.value = '';

    saveConfig();
}

loadConfig((config) => {
    marathonInput.value = config.marathonId || '';
});
