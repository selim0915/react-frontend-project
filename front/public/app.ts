/* eslint-disable @typescript-eslint/no-unused-vars */
import Router from '../src/core/router';
import { NewsDetailView, NewsFeedView } from '../src/pages';
import Store from '../src/store/store';

const store = new Store();

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

// router
router.setDefaultPage(newsFeedView);

router.addRoutePath('/page/', newsFeedView, /page\/(\d+)/);
router.addRoutePath('/show/', newsDetailView, /show\/(\d+)/);
