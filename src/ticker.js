const localstate = { next: null, current: null };

function fillWithData(data, slot) {
    data.forEach((item) => {
        const span = document.createElement('span');

        span.innerHTML = item;

        slot.appendChild(span);
    });
}

function insetTemplate(target, data) {
    const template = document.getElementById('run-template');

    // Clone the new row and insert it into the table
    const clone = template.content.cloneNode(true);

    if (data.runInfo && data.runInfo.length) {
        fillWithData(data.runInfo, clone.querySelector('.run-info'));
    }

    if (data.runners && data.runners.length) {
        fillWithData(data.runners, clone.querySelector('.runner-info'));
    }

    const clsToAdd = data.next ? 'is-secondary' : 'is-primary';

    clone.querySelector('article').classList.add(clsToAdd);

    if (data.next) {
        clone.querySelector('a').innerHTML = `Next run ${formatDate(Date.parse(data.date))}`;
    } else {
        clone.querySelector('a').innerHTML = 'Current run';
    }

    target.appendChild(clone);
}

function updateTicker() {
    log('Updating ticker');

    const marathonId = window.marathonId;
    // TODO: Implement i18n
    const link = `https://v2.oengus.io/en-GB/marathon/${marathonId}/schedule`;

    document.getElementById('schedule-link').setAttribute('href', link);

    getTickerData(marathonId, (current, next) => {
        localstate.current = current;
        localstate.next = next;

        redrawTicker(true);
    });
}

function redrawTicker(fromUpdate) {
    // TODO: test this properly
    // in case the schedule does not align with current run
    /*if (!fromUpdate && localstate.next &&
        localstate.next.gameName !== window.currentGame &&
        Date.parse(localstate.next.date) < Date.now()) {
        updateTicker();
    }*/

    log('Redrawing ticker');

    const target = document.querySelector('.container');

    target.innerHTML = '';

    if (localstate.current) {
        const current = localstate.current;
        let data;

        if (current.setupBlock) {
            data = {
                next: false,
                runInfo: [
                    current.setupBlockText ?? 'Setup block',
                ],
                date: current.date,
            };
        } else {
            data = {
                next: false,
                runInfo: [
                    current.gameName,
                    current.categoryName,
                    current.console,
                ],
                date: current.date,
                runners: current.runners.map((runner) => runner.username),
            };
        }

        insetTemplate(target, data);
    }

    if (localstate.next) {
        const next = localstate.next;
        let data;

        if (next.setupBlock) {
            data = {
                next: true,
                runInfo: [
                    next.setupBlockText ?? 'Setup block',
                ],
                date: next.date,
            };
        } else {
            data = {
                next: true,
                runInfo: [
                    next.gameName,
                    next.categoryName,
                    next.console,
                ],
                date: next.date,
                runners: next.runners.map((runner) => runner.username),
            };
        }

        insetTemplate(target, data);
    }
}
