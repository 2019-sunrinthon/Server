export const code = {
  NOT_FOUND: "NOT_FOUND",
  SERVER_ERROR: "SERVER_ERROR",
  NO_REQUIRED_ITEMS: "NO_REQUIRED_ITEMS",
  UNIQUE_ERROR: "UNIQUE_ERROR",
  NOT_DEFIND_ENUM: "NOT_DEFIND_ENUM",
  INVAILD_TOKEN: "INVAILD_TOKEN"
};

const error = {
  NOT_FOUND: {
    statusCode: 404,
    message: "리소스를 찾을 수 없습니다."
  },
  SERVER_ERROR: {
    statusCode: 500,
    message: "서버에서 오류가 발생했습니다. 다시 시도해주세요"
  },
  NO_REQUIRED_ITEMS: {
    statusCode: 400,
    message: "필수인 아이템이 없습니다."
  },
  UNIQUE_ERROR: {
    statusCode: 400,
    message: "서버에 겹치는 항목이 있습니다."
  },
  NOT_DEFIND_ENUM: {
    statusCode: 400,
    messasge: "정의된 값 중 하나가 아닙니다."
  },
  INVAILD_TOKEN: {
    statusCode: 403,
    message: "유효한 토큰이 아닙니다."
  }
};

export function throwError(errorCode) {
  return [
    error[errorCode].statusCode,
    error[errorCode].message,
    {
      errorCode
    }
  ];
}

export function getError(errorCode) {
  const { message, statusCode } = error[errorCode];
  return {
    errorCode,
    message,
    statusCode
  };
}

export function throwNoRequiredItems(throwFunc, body, ...args) {
  for (const i of args) {
    if (!body.hasOwnProperty(i) || !body[i]) {
      throwFunc(...throwError(code.NO_REQUIRED_ITEMS));
    }
  }
}

export async function isUniqueError(e) {
  return e.name === "MongoError" && e.code === 11000;
}
