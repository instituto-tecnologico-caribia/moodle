FROM php:8.3-cli

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libxml2-dev \
    libzip-dev libxslt-dev libpq-dev libcurl4-openssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP para Moodle
RUN docker-php-ext-install -j$(nproc) pgsql pdo_pgsql gd intl xml zip mysqli pdo_mysql opcache

# Configuración PHP para Moodle
RUN echo "max_input_vars = 5000" > /usr/local/etc/php/conf.d/moodle.ini && \
    echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/moodle.ini

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar Moodle
WORKDIR /var/www/html/moodle
COPY . /var/www/html/moodle/

# Crear Moodle data
RUN mkdir -p /var/www/html/moodledata && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 0777 /var/www/html/moodledata

# Instalar dependencias PHP del plugin GraphQL
WORKDIR /var/www/html/moodle/local/graphql
RUN composer install

# Exponer puerto
EXPOSE 8080

# Iniciar servidor PHP
WORKDIR /var/www/html/moodle
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html/moodle"]
