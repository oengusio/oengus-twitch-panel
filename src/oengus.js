function getTickerData(marathon, callback) {
    if (!marathon) {
        return; // sanity check
    }

    fetch(
        `https://oengus.io/api/marathons/${marathon}/schedule/ticker`,
        {
            headers: {
                'User-Agent': 'OengusIO Twitch Panel'
            },
        }
    )
        .then((r) => r.json())
        .then((data) => {
            callback(data.current, data.next);
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getMarathonName(marathon) {
    if (!marathon) {
        return; // sanity check
    }

    const res = await fetch(
        `https://oengus.io/api/marathons/${marathon}`,
        {
            headers: {
                'User-Agent': 'OengusIO Twitch Panel'
            },
        }
    );
    const json = await res.json();

    return json.name;
}
