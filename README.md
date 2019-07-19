# Sunrinthon Server

# Table Of Contents

- [How to use](#How-to-use)
- [Error Codes](#Error-Codes)
- [API](#API)
  - [POST /v1/user](#post-/v1/user)

# How to use

`npm run dev` 명령어로 개발 서버를 시작할 수 있고, `npm build`로 ES5 스펙으로 빌드할 수 있습니다. `npm start`를 치면 빌드 후 실행합니다.

# Error Codes

에러 코드는 `error_type` 속성에 들어가 있습니다.

| Error Code   | description                                          |
| ------------ | ---------------------------------------------------- |
| NOT_FOUND    | 액션을 찾을 수 없습니다. 404 스펙과 동일합니다.      |
| SERVER_ERROR | 서버에서 에러가 발생했습니다. 500 스펙과 동일합니다. |

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
  "success": true
}
```

### 실패

StatusCode: 400

```json
{
    "success": false,
    "error_type: "NO_REQUIRED_ITEMS",
    "error_message": "필수인 정보가 없습니다.",
    "status_code": 400
}
```
