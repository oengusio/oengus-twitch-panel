const twitch = window.Twitch.ext;
window.currentGame = '';
// window.previousGame = '';

twitch.onAuthorized((auth) => {
    // console.log(auth);
});

twitch.onContext((ctx, changed) => {
    // log('changed', changed);
    // log('ctx', ctx);

    if (changed.includes('game') && updateTicker) {
        // window.previousGame = window.currentGame;
        window.currentGame = ctx.game;

        // Update the ticker
        updateTicker();
    }
});

function getParsedConfig() {
    const configRaw = twitch.configuration.broadcaster?.content ?? '{}';

    return JSON.parse(configRaw);
}

function loadConfig(callback) {
    callback(getParsedConfig());

    twitch.configuration.onChanged(() => {
        log('config changed');
        callback(getParsedConfig());
    });
}

twitch.onError((err) => {
    log(err);
});
