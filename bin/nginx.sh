#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

# Check that the machine is setup
if [ -f "/usr/local/etc/nginx/nginx.conf" ];
then
  echo ""
else
  echo "Please run the main setup script to bootstrap the laptop"
fi


# If need be nginx can proxy to another ip eg for docker env, or virtual machine

if [ ! -f .env ]; then
    echo ".env file not found!"
    exit 1
fi

set -a
source .env
set +a


# Create config file for the app / site.

cat > "/usr/local/etc/nginx/servers/qbank-admin.conf" <<-EOF
server {
    listen *:443;
    server_name qbank-player.atomicjolt.xyz;

    ssl on;
    ssl_session_cache         builtin:1000  shared:SSL:10m;
    ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers               HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    ssl_prefer_server_ciphers on;

    ssl_certificate     ssl/STAR_atomicjolt_xyz.crt;
    ssl_certificate_key ssl/STAR_atomicjolt_xyz.key;

    location / {

      proxy_set_header   Host \$host;
      proxy_set_header   X-Forwarded-Ssl on;
      proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto  \$http_x_forwarded_proto;
      proxy_set_header   X-Real-IP        \$remote_addr;
      proxy_set_header   Upgrade \$http_upgrade;
      proxy_set_header   Connection "upgrade";
      proxy_http_version 1.1;

      proxy_pass         http://127.0.0.1:${ASSETS_PORT}/;

    }
}

EOF


# Restarting nginx
echo "Restarting nginx..."
sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.nginx.plist && echo "nginx started."
echo "-------------------------------------"
echo "QBank Player has been setup."
echo "Visit your app here: https://qbank-player.atomicjolt.xyz"
echo "-------------------------------------"
