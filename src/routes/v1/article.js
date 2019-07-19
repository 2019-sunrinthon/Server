import Router from "koa-router";
import { authMiddleware } from "../../lib/auth";
import Article from "../../models/Article";
import { throwNoRequiredItems } from "../../lib/errors";
import commentRouter from "./comment";

const router = new Router();

router.use(commentRouter.routes());

router.post("/", authMiddleware, async ctx => {
  const { _id } = ctx.state.user;
  throwNoRequiredItems(ctx.throw, ctx.request.body, "title", "contents");
  const { title, contents } = ctx.request.body;

  const article = new Article({ title, contents, by: _id });
  await article.save();

  ctx.status = 201;
  ctx.body = { id: article._id };
});

router.get("/", async ctx => {
  let data = await Article.find().populate("by", "username");
  ctx.body = {
    articles: data
  };
});

router.get("/:id", async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.params, "id");
  const { id } = ctx.params;

  ctx.body = {
    article: await Article.findOne({ _id: id })
  };
});

export default router;
