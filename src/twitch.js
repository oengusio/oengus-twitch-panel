const twitch = window.Twitch.ext;
let configCallback = () => {};
window.currentGame = '';
// window.previousGame = '';

function updateTwitchConfig(config) {
    twitch.configuration.set('broadcaster', '1.0', JSON.stringify(config));

    // notify the extension about the updated config
    twitch.send('broadcast', 'application/json', {
        type: 'CONFIG_UPDATE',
        config,
    });
}

twitch.listen('broadcast', (target, contentType, message) => {
    log('broadcast', target, contentType, message);
    const msg = JSON.parse(message);

    switch (msg.type) {
        case 'CONFIG_UPDATE':
            configCallback(msg.config);
            break;
    }
});

twitch.onAuthorized((auth) => {
    // log('auth', auth);
    fetchGameFromApi(auth);
});

function fetchGameFromApi(auth) {
    // ignore this if we already have a game
    if (window.currentGame) {
        return;
    }

    fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${auth.channelId}`, {
        method: 'GET',
        headers:{
            'client-id': auth.clientId,
            'Authorization': `Extension ${auth.helixToken}`,
        },
    })
        .then((r) => r.json())
        .then((json) => {
            // log('json', json);
            if (json.data && json.data.length) {
                window.currentGame = json.data[0].game_name;
            }
            log('Current game is', window.currentGame);
        }).catch(e => log(e));
}

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
    configCallback = callback;

    twitch.configuration.onChanged(() => {
        log('config changed');
        callback(getParsedConfig());
    });
}

twitch.onError((err) => {
    log(err);
});
