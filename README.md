# nestjs와 typeorm 모노레포 스타터팩

### apps

* api서버
* 이체서버
* 알람서버

### libs

* database
* config
  - filter: 미구현
  - interceptor: 미구현
  - etcs: 미구현


#### 디비 셋업

```
# ./run-mysql.sh
```

#### 환경변수

* 공통

```
# 데이터베이스 정보
HOST=127.0.0.1
PORT=3306
USERNAME=root
PASSWORD=password
DATABASE=my_service
```

* api서버

```
SERVER_PORT=3000
```

* 알람서버

```
SERVER_PORT=4000
```

* 이체서버

```
SERVER_PORT=5000
```

#### 실행 & 빌드

```bash
$ npm run start:api:dev
$ npm run start:transfer:dev
$ npm run start:notification:dev
```

```bash
$ npm run build:api:dev
$ npm run build:transfer:dev
$ npm run build:notification:dev
```