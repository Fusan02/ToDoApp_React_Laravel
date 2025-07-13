FROM php:8.2-apache

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    TZ=UTC

# ---------- 依存パッケージ ----------
RUN apt-get update && apt-get install -y \
        git unzip zip libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# ---------- Composer ----------
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# ---------- Laravel プロジェクト自動生成 ----------
ARG LARAVEL_VERSION=11.*
RUN composer create-project --prefer-dist laravel/laravel:"${LARAVEL_VERSION}" /var/www/html

# Apache に Laravel の public/ をドキュメントルートとして認識させる
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf \
 && printf "\n<Directory /var/www/html/public>\n  AllowOverride All\n  Require all granted\n</Directory>\n" >> /etc/apache2/apache2.conf

# .env 作成＋APP_KEY 生成
RUN php -r "file_exists('/var/www/html/.env') || copy('/var/www/html/.env.example','/var/www/html/.env');" \
 && php /var/www/html/artisan key:generate --force

WORKDIR /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]