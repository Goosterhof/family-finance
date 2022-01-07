#!/bin/bash
if [ "$APP_ENV" == "local" ] ; then
	echo "Development environment detected"

	echo "Performing php artisan migrate:fresh --seed"
    php artisan migrate:fresh --seed
else
   echo "Running in $APP_ENV"
   php artisan migrate --force
fi
