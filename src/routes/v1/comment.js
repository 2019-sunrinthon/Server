import Router from "koa-router";
import { authMiddleware } from "../../lib/auth";
import { throwNoRequiredItems, throwError, code } from "../../lib/errors";
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
    contents,
    id: comment._id
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

router.put("/:id/comment/:cid/adopt", authMiddleware, async ctx => {
  throwNoRequiredItems(ctx.throw, ctx.params, "id");
  const { user } = ctx.state;
  const { id, cid } = ctx.params;

  const comment = await Comment.findOne({ _id: cid, article: id });

  if (!comment) {
    return ctx.throw(...throwError(code.NOT_FOUND));
  }
  console.log(comment, user);
  if (comment.by != user._id) {
    return ctx.throw(...throwError(code.PERMISSION_DENINED));
  }

  await Comment.updateOne({ _id: cid }, { adopted: true });
  ctx.body = {};
});

export default router;
