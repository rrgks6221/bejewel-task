# Bejewel dev task

### 구현 기능

- 상품 등록
- 상품 수정
- 상품 조회(전체조회, 브랜드별 조회, 카테고리별 조회, 상세조회)
- 상품 삭제
- 상품에 대한 이미지 조회
- 상품에 대한 이미지 등록 및 수정

<br>

### 환경변수

> 환경변수는 노출되면 안되는 내용이 있기에 올리지 않고 메일에 프로젝트 압축 파일을 통해 공유

<br>

### 데이터베이스

> 데이터베이스는 AWS RDS 5.7 버전을 사용

<br>

### ERD

![KakaoTalk_20220424_210530117](https://user-images.githubusercontent.com/46591459/165110455-910b74d1-a574-45f9-819b-3b105112dbeb.png)

<br>

### 서버 실행 방법

> 1. git clone https://github.com/rrgks6221/bejewel-task.git
> 2. bejewel-task/app 경로에서 npm i
> 3. bejewel-task/app 경로에서 npm start (개발 단계에선 npm run dev 명령으로 하는것이 일반적이나 개발의 편의성을 위해 npm start로 처리함)

<br>

### 이미지 처리

> 이미지 처리는 AWS S3를 이용하여 처리할 수 있지만 로컬에서 처리하는 방향으로 함 또한 이미지 파일 업로드 request할 때 base64로 인코딩하여 보내는것이 아닌 form-data를 통해 요청하여 상품에 대한 요청과 이미지에 대한 요청을 분리하여 구현함

<br>

### API 명세

> 각 기능에 대한 명세서는 bejewel-task/apis의 md 파일로 정리

<br>

### git flow

> feature => master
> 기능 브랜치를 만든 뒤 해당 브랜치에서 작업한 뒤 기능에 대한 구현이 끝나면 master 브랜치로 pull request를 보내 merge

<br>

### git branch

> Add: 특정 기능을 하는 코드를 구현 하였을 때
> Modify: 이미 구현된 기능을 수정하는데, 기능의 향상이나 수정이 이루어졌을 때
> Close: 일반적인 개발 이슈를 완료 했을 때
> Refactor: 리펙토링을 했을 때(기능 향상이 아닌 코드 리펙토링)
