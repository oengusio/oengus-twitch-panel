const twitch = window.Twitch.ext;

twitch.onAuthorized((auth) => {
    // console.log(auth);
});

twitch.onContext((ctx, changed) => {
    twitch.rig.log('changed', changed);
    twitch.rig.log('ctx', ctx);

    if (changed.includes('game') && updateTicker) {
        // Update the ticker
        updateTicker();
    }
});

function disableExtension() {
    twitch.configuration.set('broadcaster', '0.0', '{}');

    marathonId.value = '';
}

function getParsedConfig() {
    const configRaw = twitch.configuration.broadcaster ? twitch.configuration.broadcaster.content : '{}';

    return JSON.parse(configRaw);
}

function loadConfig(callback) {
    callback(getParsedConfig());

    twitch.configuration.onChanged(() => {
        console.log('config changed');
        callback(getParsedConfig());
    });
}

twitch.onError((err) => {
    console.error(err);
    console.log(err);
});
