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

**URL : /api/product?category=?** ex)`/api/product?category=3`<br>
**Method : GET** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

**productCategoryMap**

- queryString을 넣지 않을경우 모든 상품 조회

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

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 500(Internal Server Error)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean, //성공 여부
  msg: String, //메시지
  status: Number, //응답에 대한 상태코드
  products: [
    {
      id: Number, //상품 고유번호
      brandId: Number, //상품의 브랜드 고유번호
      brandName: String, //상품의 브랜드 이름
      name: String, //상품 이름
      description: String, // 상품 설명
      price: Number, //상품 가격
      shippingFee: Number, //상품 배송가격
      discountRate: Number, //상품 할인률
      imagePath: String //상품 이미지 썸네일 요청 경로(해당 주소로 요청하면 됩니다. ex) localhost:3000/images/1/111/12af49b5c7%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png)
    }, {} ...
  ]
}
```

- 예시

```js
{
{
  "success": true,
  "msg": "카테고리별 상품 조회",
  "status": 200,
  "products": [
    {
      "id": 89,
      "brandId": 1,
      "brandName": "브릴피스",
      "name": "asd",
      "description": "asd",
      "price": 123,
      "shippingFee": 12,
      "discountRate": 12,
      "imagePath": null
    },
    {
      "id": 90,
      "brandId": 1,
      "brandName": "브릴피스",
      "name": "asd",
      "description": "asd",
      "price": 123,
      "shippingFee": 12,
      "discountRate": 12,
      "imagePath": null
    }
  ]
}
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

```js (예상하지 못한 오류로 서버에러가 난 경우)
  "success": false,
  "msg": '서버 에러입니다. 서버 개발자에게 문의해주세요.',
  "status": 500
```

<br>
<br>

> 2. 상품 브랜드별 전제 조회

- Request

**URL : /api/brand/brandId?category=?** ex)`/api/brand/1?category=1`<br>
**Method : GET** <br>
**Headers :** "Content-type" : "application/json; charset=utf-8"

- queryString을 넣지 않을경우 해당 브랜드의 전체 상품 조회

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

- Response

**Status**

> **성공 :** 200(OK)
> **실패 :** 500(Internal Server Error)

**Content-type :** application/json; charset=utf-8

- 성공

```js
{
  success: Boolean, //성공 여부
  msg: String, //메시지
  status: Number, //응답에 대한 상태코드
  products: [
    {
      id: Number, //상품 고유번호
      brandId: Number, //상품의 브랜드 고유번호
      brandName: String, //상품의 브랜드 이름
      name: String, //상품 이름
      description: String, // 상품 설명
      price: Number, //상품 가격
      shippingFee: Number, //상품 배송가격
      discountRate: Number, //상품 할인률
      imagePath: String //상품 이미지 썸네일 요청 경로(해당 주소로 요청하면 됩니다. ex) localhost:3000/images/1/111/12af49b5c7%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png)
    }, {} ...
  ]
}
```

- 예시

```js
{
{
  "success": true,
  "msg": "카테고리별 상품 조회",
  "status": 200,
  "products": [
    {
      "id": 89,
      "brandId": 1,
      "brandName": "브릴피스",
      "name": "asd",
      "description": "asd",
      "price": 123,
      "shippingFee": 12,
      "discountRate": 12,
      "imagePath": null
    },
    {
      "id": 90,
      "brandId": 1,
      "brandName": "브릴피스",
      "name": "asd",
      "description": "asd",
      "price": 123,
      "shippingFee": 12,
      "discountRate": 12,
      "imagePath": null
    }
  ]
}
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

```js (예상하지 못한 오류로 서버에러가 난 경우)
  "success": false,
  "msg": '서버 에러입니다. 서버 개발자에게 문의해주세요.',
  "status": 500
```

<br>
<br>

> 3. 상품 상세 조회

- Request

**URL : /api/product/:productId** ex)`/api/product/111`<br>
**Method : GET** <br>
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
  products: {
    id: Number, //상품 고유번호
    brandId: Number, //상품의 브랜드 고유번호
    brandName: String, //상품의 브랜드 이름
    name: String, //상품 이름
    description: String, // 상품 설명
    price: Number, //상품 가격
    shippingFee: Number, //상품 배송가격
    discountRate: Number, //상품 할인률
    material: String, //상품 소재
    patten: String, //상품 패턴
    shape: String, //상품 모양
    size: String, //상품 사이즈
    weight: String, //상품 무게
    options: [ //상품 추가 옵션
      {
        optionName: String,
        addPrice: Number
      }
    ],
    categories: [String], //상품 카테고리
    images: [String], //상품 이미지
  }
}
```

- 예시

```js
{
  "success": true,
  "msg": "상품 상세 조회",
  "status": 200,
  "product": {
    "id": 111,
    "brandId": 1,
    "brandName": "브릴피스",
    "name": "asd",
    "description": "asd",
    "price": 123,
    "shippingFee": 12,
    "discountRate": 12,
    "material": "asd,asd",
    "color": "asd,asd",
    "patten": "asd,asd",
    "shape": "asd,asd",
    "size": "asd,asd",
    "weight": "asd,asd",
    "options": [
      {
        "optionName": "asjdbda",
        "addPrice": 1235
      },
      {
        "optionName": "asjdbda",
        "addPrice": 1235
      }
    ],
    "categories": [
      "반지",
      "목걸이",
      "귀걸이",
      "이어커프"
    ],
    "images": [
      "/images/1/111/12af49b5c7%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png",
      "/images/1/111/0b4287597at%1D8.jpg",
      "/images/1/111/0b543d47a0%EF%BF%BDl%EF%BF%BD%EF%BF%BD(1).png",
      "/images/1/111/ce173c9249t%1D8.jpg"
    ]
  }
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

```js (존재하지 않는 상품 고유번에 대해 요청할 경우)
  "success": false,
  "msg": '해당 상품이 존재하지 않습니다.',
  "status": 404
```

```js (예상하지 못한 오류로 서버에러가 난 경우)
  "success": false,
  "msg": '서버 에러입니다. 서버 개발자에게 문의해주세요.',
  "status": 500
```

<br>
<br>
