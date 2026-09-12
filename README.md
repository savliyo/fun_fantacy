# Mx boilerplate

docker run -it --rm \
 -v "$(pwd)/certbot/www:/var/www/certbot" \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
 certbot/certbot certonly --webroot -w /var/www/certbot \
 -d app.funfantasy11.com -d server.funfantasy11.com \
 --email zalamahipal0808@gmail.com --agree-tos --no-eff-email --cert-name app.funfantasy11.com
