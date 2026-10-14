#!/bin/bash
set -euo pipefail

sed -i 's|/usr/bin/node|/usr/local/bin/node|' /home/ubuntu/entrance_tricks_web/config/entrance-web.service
cp /home/ubuntu/entrance_tricks_web/config/entrance-web.service /etc/systemd/system/entrance-web.service
cp /home/ubuntu/entrance_tricks_web/config/nginx-moenationalexam.conf /etc/nginx/conf.d/moenationalexam.conf
mkdir -p /var/www/certbot

sudo -u ubuntu -H bash -lc 'cd /home/ubuntu/entrance_tricks_web && pnpm config set ignore-scripts false && pnpm rebuild sharp'

systemctl daemon-reload
systemctl enable entrance-web
systemctl restart entrance-web
sleep 2
systemctl is-active entrance-web
curl -s -o /dev/null -w "local:%{http_code}\n" http://127.0.0.1:3001/

nginx -t
systemctl reload nginx
curl -s -o /dev/null -w "http_domain:%{http_code}\n" -H "Host: moenationalexam.com" http://127.0.0.1/

python3 /tmp/add-cors-origins.py
systemctl reload app
systemctl is-active app
