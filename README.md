# Oengus twitch extension
Your runs as a twitch panel

## Setting up local development

### Generating the keys
Twitch requires your test server to use https, for this you will need to generate some keys, these keys can be generated with openssl.
To generate the required keys run the following command `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./devserver/keys/selfsigned.key -out ./devserver/keys/selfsigned.crt`.
This is a self-signed certificate so please note that your browser might not like this, but twitch requires it for testing.

### Running the dev server
To run the dev server first you will need to install the required packages with `npm ci`, after that you can run `npm run serve` to start the local dev server on port `8080`
