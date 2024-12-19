# super-secret-led-wall

## Installation

Follow these steps to check out the development version:

1. Install [Homebrew](https://brew.sh/).

2. Install nvm and yarn:

    ```
    brew reinstall nvm yarn
    ```

3. Follow the instructions printed by the preceding step. This
   makes sure that the `nvm` command is available in your shell.

4. Clone this repository:

    ```
    git clone https://github.com/GwennyGreen/super-secret-led-wall.git
    ```

5. `cd` into the cloned directory.

6. Install the latest LTS release of Node.js 10 (aka Dubnium):

    ```
    nvm install
    ```

7. Instruct NVM to prepend the proper Node.js version to your `PATH`:

    ```
    nvm use
    ```

8. Run `yarn install`.

9. Run `yarn serve`.

10. Direct your browser to `http://localhost:1234/negative.html` or `http://localhost:1234/positive.html`.

## Setting up a self-hosted Debian server

```bash
mkdir -p /usr/share/led-wall-webclient-wall/www/html
chgrp led-wall /usr/share/led-wall-webclient-wall/www/html
chmod 775 /usr/share/led-wall-webclient-wall/www/html
a2enmod alias
a2enmod proxy
a2enmod proxy_http
touch /etc/apache2/sites-available/led-wall-webclient-wall.conf
a2ensite led-wall-webclient-wall.conf
systemctl restart apache2.service
```

## Deploying to a self-hosted Debian server

```bash
rsync -ciprt --rsync-path="sudo rsync" contrib/apache2/sites-available/ led-wall:/etc/apache2/sites-available/
yarn build && rsync -aci --delete dist/ led-wall:/usr/share/led-wall-webclient-wall/www/html/
```

## Setting up Debian-based web clients

```bash
ssh HOST mkdir -p .config/systemd/user
scp contrib/systemd/user/* HOST:.config/systemd/user/
ssh HOST systemctl --user daemon-reload
ssh HOST systemctl --user enable --now \
  web-wall-positive@led-wall.local.service
# or:
ssh HOST systemctl --user enable --now \
  web-wall-negative@led-wall.local.service
```

## Acknowledgements

- [Anime](http://animejs.com/) by [Julian Garnier](https://github.com/juliangarnier) ([license](https://github.com/juliangarnier/anime/blob/69131dc2a9fee58de6a9a986015a78341a15deca/LICENSE.md))
