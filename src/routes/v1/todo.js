import Router from "koa-router";
import Todo from "../../models/Todo";
import { throwNoRequiredItems } from "../../lib/errors";
import { authMiddleware } from "../../lib/auth";
const router = new Router();

router.post("/", authMiddleware, async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.request.body, "title", "list");
  const { _id } = ctx.state.user;
  const { title, list } = ctx.request.body;
  const nlist = list.map(el => {
    return { todo: el };
  });
  const todo = new Todo({
    title,
    list: nlist,
    by: _id
  });
  await todo.save();
  ctx.body = { id: todo._id };
});

router.get("/", authMiddleware, async ctx => {
  const { _id } = ctx.state.user;
  let data = await Todo.find({ by: _id });
  ctx.body = { todos: data };
});

router.put("/:id/:idx/toggle", authMiddleware, async ctx => {
  const { id, idx } = ctx.params;
  const { _id } = ctx.state.user;
  let data = await Todo.findOne({ _id: id, by: _id });
  data.list[idx].completed = !data.completed;
  await Todo.update({ _id: data._id }, data);
  ctx.body = { todos: data };
});

export default router;
