import Router from "koa-router";
import { authMiddleware } from "../../lib/auth";
import { throwNoRequiredItems } from "../../lib/errors";
import Comment from "../../models/Comment";
const router = new Router();

router.post("/:article/comment", authMiddleware, async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.params, "article");
  const { article } = ctx.params;

  const { _id } = ctx.state.user;
  const { contents } = ctx.request.body;

  throwNoRequiredItems(ctx.throw, ctx.request.body, "contents");

  const comment = new Comment({
    contents,
    article: article,
    by: _id
  });
  await comment.save();

  ctx.status = 201;
  ctx.body = {
    contents
  };
});
router.get("/:id/comment", async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.params, "id");
  const { id } = ctx.params;

  ctx.body = {
    comments: await Comment.find({
      article: id
    })
  };
});

export default router;
