import { Router, type IRouter } from "express";
import healthRouter from "./health";
import voteRouter from "./vote";
import inquireRouter from "./inquire";
import subscribeRouter from "./subscribe";
import guestbookRouter from "./guestbook";

const router: IRouter = Router();

router.use(healthRouter);
router.use(voteRouter);
router.use(inquireRouter);
router.use(subscribeRouter);
router.use(guestbookRouter);

export default router;
