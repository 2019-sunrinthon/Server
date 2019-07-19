import Router from "koa-router";
import Todo from "../../models/Todo";
import { throwNoRequiredItems } from "../../lib/errors";
const router = new Router();

router.post("/", async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.request.body, "title", "lists");

  const { title, lists } = ctx.request.body;
  const todo = new Todo({
    title,
    lists
  });
  c;
});
