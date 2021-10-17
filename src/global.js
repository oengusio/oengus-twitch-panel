function log(...data) {
    console.log('[oengus]', ...data);
    Twitch.ext.rig.log(...data);
}

document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target) {
        return;
    }

    if (target.dataset.action) {
        // TODO: handle action
        event.preventDefault();
    }
});
