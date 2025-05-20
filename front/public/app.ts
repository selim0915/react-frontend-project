/* eslint-disable @typescript-eslint/no-unused-vars */
import Router from "../src/core/router";
import { NewsDetailView, NewsFeedView } from "../src/pages";
import { Store } from "../src/types";


const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

// router
router.setDefaultPage(newsFeedView);

router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();
