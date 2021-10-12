function insetTemplate(templateId, target, data) {
    const template = document.getElementById(templateId);

    // Clone the new row and insert it into the table
    const clone = template.content.cloneNode(true);

    for (const key in data) {
        const slot = clone.querySelector(`span#${key}`);

        if (slot) {
            slot.removeAttribute('id');
            slot.innerHTML = data[key];
        }
    }

    target.appendChild(clone);
}

function updateTicker() {
    console.log('Updating ticker');

    getTickerData(window.marathonId, (current, next) => {
        const target = document.querySelector('.container');

        target.innerHTML = '';

        if (current) {
            insetTemplate('current-run-template', target, {
                game: current.gameName,
                category: current.categoryName,
                console: current.console,
                runners: current.runners.map((runner) => runner.username).join(', ')
            });
        }

        if (next) {
            insetTemplate('next-run-template', target, {
                game: next.gameName,
                category: next.categoryName,
                console: next.console,
                time: formatDate(Date.parse(next.date)),
                runners: next.runners.map((runner) => runner.username).join(', ')
            });
        }
    });
}
