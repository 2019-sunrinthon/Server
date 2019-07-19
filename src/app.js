import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import routes from "./routes";
import { code, getError, throwError } from "./lib/errors";

import "./lib/connect";

export const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(...throwError(code.NOT_FOUND));
    }
    if (status >= 200 && status < 300 && typeof ctx.body === "object") {
      ctx.body.success = true;
    }
  } catch (e) {
    let errorCode = code.SERVER_ERROR;

    if (e.errorCode) {
      errorCode = e.errorCode;
    } else {
      console.error(e);
    }

    const { statusCode, message } = getError(errorCode);

    ctx.status = statusCode || 500;
    ctx.body = {
      success: false,
      error_type: errorCode,
      error_message: message,
      status_code: statusCode
    };
  }
});
routes.forEach(router => {
  app.use(router.routes()).use(router.allowedMethods());
});
