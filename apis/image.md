## 목적

> 상품의 이미지 조회 API

## 구현기능

- [ ] 이미지 조회

<br>

### 💡 API 명세서

> 1. 상품 등록

- Request

**URL : /images/:brandId/:productId/:imageName** ex)`/images/1/111/12af49b5c7%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png`<br>
**Method : GET** <br>

- 상품 조회시 images 에 있는 url을 base url에 붙여넣은 꼴 ex) `http://localhost:3000/images/1/111/12af49b5c7%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png`

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 404(Not Found)

**Content-type :** image/${파일의 확장자명}

- 성공

```js
{
  이미지 파일을 그래도 반환
}
```

<br>
<br>

- 실패

```js (존재하지 않는 이미지 파일 경로에 대한 요청시)
{
  404 html 문서
}
```

<br>
<br>
