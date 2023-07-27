docker run \
--name mysql.service.com \
-e MYSQL_ROOT_PASSWORD=password \
-d \
-p 3306:3306 \
mysql:8.0.34