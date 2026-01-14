FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libxml2-dev libzip-dev libxslt-dev libpq-dev libcurl4-openssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

# Configure GD and install PHP extensions
RUN docker-php-ext-install -j$(nproc) pgsql pdo_pgsql gd intl xml zip mysqli pdo_mysql opcache


# Configure PHP settings for Moodle
RUN echo "max_input_vars = 5000" > /usr/local/etc/php/conf.d/moodle.ini && \
    echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/moodle.ini

# Copy Moodle source code
WORKDIR /var/www/html/moodle
COPY . /var/www/html/moodle/

# Create Moodle data directory
RUN mkdir -p /var/www/html/moodledata && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 0777 /var/www/html/moodledata

EXPOSE 8080

# Start PHP built-in web server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html/moodle"]
