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
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=my_service
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

#### 디비 마이그레이션

* 디비 마이그레이션 비교 후 생성

```bash
$ npm run migration:generate
```

* 마이그레이션 실행

```bash
$ npm run migration:run
```

* 마이그레이션 롤백

```bash
$ npm run migration:revert
```

* 빈 마이그레이션 생성

```bash
$ typeorm-ts-node-esm migration:create libs/database/src/migrations/{마이그레이션 이름}
```

`libs/database/src/migrations/` 아래에 `{타임스탬프}-{마이그레이션 이름}.ts` 형태로 마이그레이션 파일 생성됨

#### 도커배포

```
$ docker-compose up
```