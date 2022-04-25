## 목적

> 상품 조회 API

## 구현기능

- [ ] 전 상품 조회
- [ ] 상품 카테고리 별 조회
- [ ] 상품 브랜드별 조회
- [ ] 상품 상세조회

<br>

### 💡 API 명세서

> 1. 상품 카테고리별 전체조회

- Request

**URL : /api/brand/:brandId/product/:productId** ex)`/api/brand/1/product/13`<br>
**Method : DELETE** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

<br>
<br>

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 404(Not Found), 500(Internal Server Error)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean, //성공 여부
  msg: String, //메시지
  status: Number, //응답에 대한 상태코드

}
```

- 예시

```js
{
  "success": true,
  "msg": "상품 삭제에 성공했습니다.",
  "status": 200,
}
```

<br>
<br>

- 실패

```js
{
  success: Boolean,
  msg: String,
  status: Number
}
```

- 예시

```js (존재하지 않는 상품에 대해 요청할 경우)
  "success": false,
  "msg": '해당 상품이 존재하지 않습니다.',
  "status": 404
```

```js (예상하지 못한 오류로 서버에러가 난 경우)
  "success": false,
  "msg": '서버 에러입니다. 서버 개발자에게 문의해주세요.',
  "status": 500
```

```js (데이터베이스 접근 중 네트워크 통신에 오류가 있는 경우)
  "success": false,
  "msg": '서버 에러입니다. 서버 개발자에게 문의해주세요.',
  "status": 502
```

<br>
<br>
