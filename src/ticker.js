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
    const runLink = clone.querySelector('a');

    runLink.dataset.run = data.runId;

    if (data.next) {
        runLink.innerHTML = `Next run ${formatDate(Date.parse(data.date))}`;
    } else {
        runLink.innerHTML = 'Current run';
    }

    target.appendChild(clone);
}

function updateTicker() {
    log('Updating ticker');

    const marathonId = window.marathonId;
    // TODO: Implement i18n
    const link = `https://oengus.io/en-GB/marathon/${marathonId}/schedule#current`;

    document.getElementById('schedule-link').setAttribute('href', link);

    getTickerData(marathonId, (current, next) => {
        localstate.current = current;
        localstate.next = next;

        if (!current && !next) {
            log('Ticker data missing, clearing config');
            updateTwitchConfig({
                marathonId: null,
                marathonName: null,
            });
            return;
        }

        redrawTicker(true);
    });
}

function redrawTicker(fromUpdate) {
    // TODO: test this properly
    // in case the schedule does not align with current run

    // TODO: compare game names, what should the threshold be?
    const distance = levenshtein(localstate.next.gameName, window.currentGame);

    // TODO: could probably test this during the next bsg
    log(`Comparing '${localstate.next.gameName}' to '${window.currentGame}':`, distance)

    if (!fromUpdate && localstate.next &&
        localstate.next.gameName === window.currentGame &&
        Date.parse(localstate.next.date) < Date.now()) {
        log('Next run has started, refreshing ticker');
        updateTicker();
        return;
    }

    log('Redrawing ticker');

    const target = document.querySelector('.container');

    target.innerHTML = '';

    if (localstate.current) {
        const current = localstate.current;
        let data;

        if (current.setupBlock) {
            data = {
                next: false,
                runId: current.id,
                runInfo: [
                    current.setupBlockText ?? 'Setup block',
                ],
                date: current.date,
            };
        } else {
            data = {
                next: false,
                runId: current.id,
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
                runId: next.id,
                runInfo: [
                    next.setupBlockText ?? 'Setup block',
                ],
                date: next.date,
            };
        } else {
            data = {
                next: true,
                runId: next.id,
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

// source https://stackoverflow.com/a/35279162/4807235
/**
 *
 * @param s Source
 * @param t Target
 * @returns {number|*}
 */
function levenshtein(s, t) {
    if (s === t) {
        return 0;
    }
    const n = s.length, m = t.length;
    if (n === 0 || m === 0) {
        return n + m;
    }
    let x = 0, y, a, b, c, d, g, h;
    const p = new Uint16Array(n);
    const u = new Uint32Array(n);
    for (y = 0; y < n;) {
        u[y] = s.charCodeAt(y);
        p[y] = ++y;
    }

    for (; (x + 3) < m; x += 4) {
        const e1 = t.charCodeAt(x);
        const e2 = t.charCodeAt(x + 1);
        const e3 = t.charCodeAt(x + 2);
        const e4 = t.charCodeAt(x + 3);
        c = x;
        b = x + 1;
        d = x + 2;
        g = x + 3;
        h = x + 4;
        for (y = 0; y < n; y++) {
            a = p[y];
            if (a < c || b < c) {
                c = (a > b ? b + 1 : a + 1);
            }
            else {
                if (e1 !== u[y]) {
                    c++;
                }
            }

            if (c < b || d < b) {
                b = (c > d ? d + 1 : c + 1);
            }
            else {
                if (e2 !== u[y]) {
                    b++;
                }
            }

            if (b < d || g < d) {
                d = (b > g ? g + 1 : b + 1);
            }
            else {
                if (e3 !== u[y]) {
                    d++;
                }
            }

            if (d < g || h < g) {
                g = (d > h ? h + 1 : d + 1);
            }
            else {
                if (e4 !== u[y]) {
                    g++;
                }
            }
            p[y] = h = g;
            g = d;
            d = b;
            b = c;
            c = a;
        }
    }

    for (; x < m;) {
        const e = t.charCodeAt(x);
        c = x;
        d = ++x;
        for (y = 0; y < n; y++) {
            a = p[y];
            if (a < c || d < c) {
                d = (a > d ? d + 1 : a + 1);
            }
            else {
                if (e !== u[y]) {
                    d = c + 1;
                }
                else {
                    d = c;
                }
            }
            p[y] = d;
            c = a;
        }
        h = d;
    }

    return h;
}
