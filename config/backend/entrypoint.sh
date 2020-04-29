#!/usr/bin/env bash

python manage.py collectstatic --noinput

until python manage.py makemigrations
do
    echo "Waiting for postgres ready..."
    sleep 2
done

python manage.py migrate --noinput

uvicorn mi_rrss.asgi:application --workers 2 --host 0.0.0.0 --port 8000 --reload --proxy-headers

