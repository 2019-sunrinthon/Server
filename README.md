# Sunrinthon Server

# Table Of Contents

- [How to use](#How-to-use)
- [Error Codes](#Error-Codes)
- [API](#API)

# How to use

`npm run dev` 명령어로 개발 서버를 시작할 수 있고, `npm build`로 ES5 스펙으로 빌드할 수 있습니다. `npm start`를 치면 빌드 후 실행합니다.

# Error Codes

에러 코드는 `error_type` 속성에 들어가 있습니다.

| Error Code         | description                                                     |
| ------------------ | --------------------------------------------------------------- |
| NOT_FOUND          | 액션을 찾을 수 없습니다. 404 스펙과 동일합니다.                 |
| SERVER_ERROR       | 서버에서 에러가 발생했습니다. 500 스펙과 동일합니다.            |
| NO_REQUIRED_ITEMS  | 필수인 항목이 없을 때 발생하는 오류입니다.                      |
| UNIQUE_ERROR       | 유니크한 항목에 이미 존재하는 것을 넣을 때 발생하는 오류입니다. |
| NOT_DEFIND_ENUM    | 정해진 값 중 하나가 아닌 경우 발생합니다.                       |
| PERMISSION_DENINED | 권한이 없을 때 발생합니다.                                      |

# API

Restful하게 구성되었습니다.

## POST /v1/user

User를 새로 만듭니다.

| 항목          | 설명                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| `username`    | 사용자 인증에 사용될 `id`입니다. (필수)(유니크)                        |
| `password`    | 사용자 인증에 사용될 `password`입니다. SHA512 암호화 처리됩니다.(필수) |
| `name`        | 사용자의 이름입니다. (필수)                                            |
| `email`       | 사용자의 이메일입니다. (필수)(유니크)                                  |
| `phoneNumber` | 사용자의 전화번호입니다. (필수)(유니크)                                |
| `age`         | 사용자의 나이대입니다. (10, 20, 30대 등 10 단위로 써도 됩니다.) (필수) |

### 성공

StatusCode: 201

```json
{
  "success": true,
  "username": "username",
  "email": "mail@gmail.com",
  "phoneNumber": "010-1234-5678",
  "age": "13"
}
```

### 실패

StatusCode: 400

```json
{
  "success": false,
  "error_type": "NO_REQUIRED_ITEMS",
  "error_message": "필수인 정보가 없습니다.",
  "status_code": 400
}
```

## POST /v1/auth/token

토큰을 발급받습니다. 토큰의 유효 기간은 5일입니다.

요청 예시

```json
{
  "provider": "local",
  "email": "test1",
  "password": "password"
}
```

성공

```json
{
  "success": true,
  "token": "Token....",
  "username": "username",
  "age": 10,
  "phoneNumber": "010-1234-5678",
  "name": "Name"
}
```

## POST /v1/article

글을 씁니다. `x-access-token` 헤더에 토큰을 넣어주세요.

요청 예시

```json
{
  "title": "글의 제목",
  "contents": "글의 내용"
}
```

성공

```json
{
  "success": true,
  "id": "글의 아이디"
}
```

## GET /v1/article

글들을 모두 받아옵니다. Query `age`에 나이 값을 넣어주세요. (17 등의 수를 넣어도 자동으로 10~19로 인식합니다.)

성공

```json
{
  "success": true,
  "articles": [
    {
      "_id": "4ds8q3rf0dsf",
      "title": "Hello World!",
      "contents": "글",
      "by": {
        "_id": "352dsgsfg234",
        "age": 30
      },
      "__v": 0
    }
    //...
  ]
}
```

## GET /v1/article/:id/comment

:id 글에 있는 댓글들을 가져옵니다.

성공

```json
{
  "success": true,
  "comments": [
    {
      "content": "댓글",
      "by": "Id",
      "adopted": false
    }
  ]
}
```

## POST /v1/article/:id/comment

:id 글에 댓글을 답니다. `x-access-token` 헤더가 필요합니다.

성공

```json
{
  "success": true,
  "contents": "댓글 내용",
  "id": "댓글 아이디"
}
```

## PUT /v1/article/:id/comment/:comment_id/adope

:id 글에 있는 :comment_id 댓글을 채택합니다. `x-access-token`이 필요하고, 유저가 같아야 합니다.

성공

```json
{
  "success": true
}
```
