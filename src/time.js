// adapted from v2
// twitch provides a locale to us
// const locale = (new URL(document.location)).searchParams.get('locale');
// TODO: change to correct locale, use en for consistency for now
const format = new Intl.RelativeTimeFormat('en-GB');

function formatDate(datetime) {
    const date = new Date(datetime).getTime();
    // seconds
    let diff = (date - Date.now()) / 1000;
    let unit = 'second';

    if (Math.abs(diff) > 89) {
        diff /= 60;
        unit = 'minute';
        if (Math.abs(diff) > 89) {
            diff /= 60;
            unit = 'hour';
            if (Math.abs(diff) > 21) {
                diff /= 24;
                unit = 'day';
                if (Math.abs(diff) > 319) {
                    diff /= 365;
                    unit = 'year'; // (ignoring leap years)
                }
            }
        }
    }

    return format.format(Math.round(diff), unit);
}
