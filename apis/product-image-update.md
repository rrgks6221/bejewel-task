## 목적

> 상품 이미지 등록 API

## 구현기능

- [ ] 상품 이미지 등록

<br>

### 💡 API 명세서

> 1. 상품 이미지 등록

- Request

**URL : /api/brand/:brandId/product/:productId/image** ex)`/api/brand/1/product/13/image`<br>
**Method : PUT** <br>
**Headers :** "Content-type" : "multipart/form-data;"

<br>
<br>

**Request files**

```js
{
  images: [image, image]; //요청 files에 이미지 객체를 통해서 해당 이미지들을 배열에 담아서 보내주면 됩니다.
}
```

- 예시

![image](https://user-images.githubusercontent.com/46591459/165053718-1e787d8b-b5c8-4306-a8d7-aa642ed5130c.png)

<br>

- Response

**Status**

> **성공 :** 201(OK)
> **실패 :** 400(Bad Request), 404(Not Found), 500(Internal Server Error), 502(Bad Gateway)

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
  "msg": "이미지 저장에 성공했습니다.",
  "status": 201,
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

```js (저장할 이미지가 존재하지 않는 경우)
{
  "success": false,
  "msg": '저장할 이미지가 존재하지 않습니다.',
  "status": 400
}
```

```js (존재하지 않는 상품에 대한 이미지를 추가하려는 경우)
{
  "success": false,
  "msg": '존재하지 않는 상품입니다.' ,
  "status": 404
}
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
