# nestjs와 typeorm 모노레포 스타터팩

### apps

* api서버
* 이체서버
* 알람서버

### libs

* database
* config
  - filter
  - interceptor
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

`http://localhost:8080/api`

`http://localhost:8080/transfer`

`http://localhost:8080/notification`

* scale

```
$ docker-compose up --scale api=2
```

#### k8s

##### alb ingress controller 설치

```bash
$ kubectl --kubeconfig=$KUBE_CONFIG apply -f https://raw.githubusercontent.com/NaverCloudPlatform/nks-alb-ingress-controller/main/docs/install/pub/install.yaml
```

##### contianer registry

```bash
$ kubectl create secret docker-registry \ nestjs-typeorm-monorepo-regcred \      
  --docker-server= \
  --docker-username= \
  --docker-password= \
  --kubeconfig kubeconfig.yaml
```

##### 컨테이너 저장소 환경변수 생성

```bash
$ kubectl create secret generic \
  nestjs-typeorm-db-env \
  --from-literal=DB_HOST='' \
  --from-literal=DB_PORT='' \
  --from-literal=DB_USERNAME='' \
  --from-literal=DB_PASSWORD='' \
  --from-literal=DB_DATABASE='' \
  --kubeconfig=$KUBE_CONFIG
```

##### 컨테이너 서비스 배포

* deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment   # deployment의 이름
  labels:
    app: api-deployment  # deployment의 라벨
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api # replicaset이 관리할 pod 라벨
  template:    # 하위에 pod 정보 설정
    metadata:
      labels:
        app: api # pod의 라벨
    spec: # 컨테이너 설정
      containers:
      - name: api
        image: nestjs-typeorm-monorepo.kr.ncr.ntruss.com/api:latest
        ports:
        - containerPort: 8080
        env:
          - name: SERVER_PORT
            value: "8080"
          - name: DB_HOST
            valueFrom:
              secretKeyRef:
                name: nestjs-typeorm-db-env
                key: DB_HOST
          - name: DB_PORT
            valueFrom:
              secretKeyRef:
                name: nestjs-typeorm-db-env
                key: DB_PORT
          - name: DB_USERNAME
            valueFrom:
              secretKeyRef:
                name: nestjs-typeorm-db-env
                key: DB_USERNAME
          - name: DB_PASSWORD
            valueFrom:
              secretKeyRef:
                name: nestjs-typeorm-db-env
                key: DB_PASSWORD
          - name: DB_DATABASE
            valueFrom:
              secretKeyRef:
                name: nestjs-typeorm-db-env
                key: DB_DATABASE
      imagePullSecrets:
      - name: nestjs-typeorm-monorepo-regcred

---
apiVersion: v1
kind: Service
metadata:
  name: api-svc
spec:
  type: NodePort # ClusterIP, LoadBalancer, NodePort
  selector:
    app: api # 서비스가 부하분산해줄 파드이름
  ports:
    - name: http
      # nodePort: 32000
      port: 8080
      protocol: TCP
      targetPort: 8080  # pod에 실행중인 어플리케이션의 포트(노드 어플리케이션이 8080번 포트로 running중)
    - name: https
      # nodePort: 32001
      port: 443
      protocol: TCP
      targetPort: 8080 # pod에 실행중인 어플리케이션의 포트(노드 어플리케이션이 8080번 포트로 running중)
```

* ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nest-typeorm-monorepo-alb-ingress
  annotations:
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 8080}]'
  labels:
    app: nest-typeorm-monorepo-alb-ingress
spec:
  ingressClassName: alb
  rules:
    - http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-svc
                port:
                  number: 8080
          - path: /transfer
            pathType: Prefix
            backend:
              service:
                name: transfer-svc
                port:
                  number: 8080
          - path: /notification
            pathType: Prefix
            backend:
              service:
                name: notification-svc
                port:
                  number: 8080
```

어노테이션의 listen-ports는 로드벨런서가 요청 받을 때 사용되는 포트

spec.rules.http.path에 따라 spec.rules.http.paths.backend.service로 부하분산이 되며 서비스에서 랜덤으로 생성된 nodePort -> spec.rules.http.paths.backend.service.port.number로 포워딩된다.

서비스 정의시 서비스 타입은 NodePort여야하며 nodePort는 랜덤으로 생성하기위해 명시하지 않는다.

* apply(배포)

```bash
$ kubectl apply -f ./manifest/api.deployment.yaml  --kubeconfig --kubeconfig=$KUBE_CONFIG

$ kubectl apply -f ./manifest/transfer.deployment.yaml  --kubeconfig --kubeconfig=$KUBE_CONFIG

$ kubectl apply -f ./manifest/notification.deployment.yaml  --kubeconfig --kubeconfig=$KUBE_CONFIG

$ kubectl apply -f ./manifest/ingress.yaml  --kubeconfig --kubeconfig=$KUBE_CONFIG
```

##### 컨테이너 접속

```bash
$ kubectl get ingress --kubeconfig=$KUBE_CONFIG
NAME                                CLASS   HOSTS   ADDRESS                                                                               PORTS   AGE
nest-typeorm-monorepo-alb-ingress   alb     *       ing-default-nesttypeormmonorepoalbin-a6ef1-19348597-d2a3b835b499.kr.lb.naverncp.com   80      19h
```

http://ing-default-nesttypeormmonorepoalbin-a6ef1-19348597-d2a3b835b499.kr.lb.naverncp.com/api

http://ing-default-nesttypeormmonorepoalbin-a6ef1-19348597-d2a3b835b499.kr.lb.naverncp.com/transfer

http://ing-default-nesttypeormmonorepoalbin-a6ef1-19348597-d2a3b835b499.kr.lb.naverncp.com/notification

##### 컨테이너 서비스 종료

```bash
$ kubectl delete -f ./manifest/ingress.yaml  --kubeconfig ./kubeconfig.yaml

$ kubectl delete -f ./manifest/api.deployment.yaml  --kubeconfig ./kubeconfig.yaml

$ kubectl delete -f ./manifest/transfer.deployment.
yaml  --kubeconfig ./kubeconfig.yaml

$ kubectl delete -f ./manifest/notification.deployment.yaml  --kubeconfig ./kubeconfig.yaml
```
