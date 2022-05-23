#!/bin/sh

# to download newer versions just update the version numbers here
wget https://cdn.jsdelivr.net/npm/bulma@latest/css/bulma.min.css -O src/assets/bulma.min.css
wget https://cdn.jsdelivr.net/npm/bulmaswatch@latest/solar/bulmaswatch.min.css -O src/assets/theme-solar.min.css
wget https://cdn.jsdelivr.net/npm/bulma-toast@latest/dist/bulma-toast.min.js -O src/assets/bulma-toast.min.js
wget https://www.googletagmanager.com/gtag/js?id=UA-153189507-5 -O src/analytics.js

