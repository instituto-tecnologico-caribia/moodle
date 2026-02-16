FROM php:8.3-apache

WORKDIR /var/www/html
COPY . .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libfreetype6-dev libpng-dev libjpeg-dev \
    libicu-dev libxml2-dev libzip-dev libxslt-dev libonig-dev \
    && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd intl pdo_pgsql pgsql opcache xml zip xsl soap mbstring exif

# Install Redis extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# Configure PHP settings for Moodle
RUN echo "max_input_vars = 5000" > /usr/local/etc/php/conf.d/moodle.ini && \
    echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/moodle.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/moodle.ini

# Set ServerName to suppress warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Enable Apache modules
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Create entrypoint script
RUN echo '#!/bin/bash\n\
    set -e\n\
    \n\
    # Create and set permissions for moodledata\n\
    mkdir -p /var/www/html/moodledata\n\
    chown -R www-data:www-data /var/www/html/moodledata\n\
    chmod -R 0777 /var/www/html/moodledata\n\
    \n\
    # Ensure www-data owns all web files\n\
    chown -R www-data:www-data /var/www/html\n\
    \n\
    # Start Apache\n\
    exec apache2-foreground' > /usr/local/bin/moodle-entrypoint.sh \
    && chmod +x /usr/local/bin/moodle-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/moodle-entrypoint.sh"]