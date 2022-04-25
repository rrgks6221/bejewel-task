## 목적

> 이미지를 제외한 상품 등록 API

## 구현기능

- [ ] 상품 등록

<br>

### 💡 API 명세서

> 1. 상품 등록

- Request

**URL : /api/brand/:brandId/product** ex)`/api/brand/1/product`<br>
**Method : POST** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

**brandMap**

```json
  1: 브릴피스,
  2: 레끌라,
  3: 퓨어블랙 스튜디오,
  4: 핀리,
  5: 앙스모멍,
  6: 마마카사르,
  7: 애,
  8: 미드나잇모먼트,
  9: 헤이,
  10: 앵브록스
```

**productCategoryMap**

```json
  1: 반지,
  2: 목걸이,
  3: 귀걸이,
  4: 이어커프,
  5: 팔찌,
  6: 향수,
  7: 헤어,
  8: 타입피스,
  9: 팬던트,
  10: ACC,
  11: DIGITAL,
  12: Mes's,
  13: For Couples,
  14: LUXURY/GLOBAL
```

<br>
<br>

**Request Body**

```js
{
  name: String, //상품 이름 (이 값은 필수로 입력해야합니다.)
  description: String, //상품 설명 ((이 값은 필수로 입력해야합니다.))
  price: Number, //상품 가격 (이 값은 필수로 입력해야합니다.)
  shippringFee: Number, //배송비 (입력하지 않을 시 0)
  discountRate: Number, //할인률 (입력하지 않을 시 0)
  material: Array[String], //상품 소재/재료들
  color: Array[String], //상품 색깔들
  patten: Array[String], //상품 패턴들
  shape: Array[String], //상품 모양들
  size: Array[String], //상품 사이즈들
  weight: Array[String], //상품 무게들
  categories: Array[Number], //상품의 카테고리들
  options: Array[Object{ //상품 구매시 보이는 추가 옵션의 이름과 추가 가격
    name: String,
    addPrice: String
    }]
}
```

- 예시

```js
{
  "name":"asd",
	"description":"asd",
	"price":123,
	"shippingFee":12,
	"discountRate":12,

  "material": ["asd", "asd"],
	"color": ["asd", "asd"],
	"patten": ["asd", "asd"],
	"shape": ["asd", "asd"],
	"size": ["asd", "asd"],
	"weight": ["asd", "asd"],

  "categories": [1,2,3,4],

  "options": [
    {
      "name": "asjdbda",
      "addPrice": 1235
    },
    {
      "name": "asjdbda",
      "addPrice": 1235
    }
  ]
}
```

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
  productId: Number //생성된 상품 고유ID(해당 ID를 가지고 이미지 저장 API 요청을 보내야함)
}
```

- 예시

```js
{
  "success": true,
  "msg": "상품 등록에 성공했습니다.",
  "status": 201,
  "productId": 115
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

```js (필수로 입력해야하는 값이 없을 경우)
{
  "success": false,
  "msg": 'name, description은(는) 필수로 입력해야 합니다.'
  "status": 400
}
```

```js (저장하는 값의 타입이 맞지 않는 경우)
{
  "success": false,
  "msg": '타입 오류로 상품 등록에 실패했습니다.'
  "status": 400
}
```

```js (상품의 카테고리 고유 ID가 존재하지 않는 경우)
{
  "success": false,
  "msg": '1, 2은(는) 존재하지 않는 카테고리번호 입니다.'
  "status": 400
}
```

```js (존재하지 않는 브랜드의 id로 접근 할 경우)
{
  "success": false,
  "msg": '존재하지 않는 브랜드입니다.',
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
