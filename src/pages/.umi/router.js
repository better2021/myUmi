import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'),
  
}),
    "routes": [
      {
        "path": "/product/modal",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__product__modal" */'../product/modal.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/about",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__about__index" */'../about/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/hook",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__hook__index" */'../hook/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/hooks01",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__hooks01__index" */'../hooks01/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/hooks02",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__hooks02__index" */'../hooks02/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/count",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__count__index" */'../count/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/product",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__product__index" */'../product/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/getDate",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__getDate__index" */'../getDate/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/speak",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__speak__index" */'../speak/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/test",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__test__index" */'../test/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/upImg",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__upImg__index" */'../upImg/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/blog",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__blog__index" */'../blog/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/blog/CodeBlock",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__blog__CodeBlock" */'../blog/CodeBlock.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/user",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__user__index" */'../user/index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  
}),
        "_title": "myumi",
        "_title_default": "myumi"
      },
      {
        "component": () => React.createElement(require('D:/study/myumi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "myumi",
        "_title_default": "myumi"
      }
    ],
    "_title": "myumi",
    "_title_default": "myumi"
  },
  {
    "component": () => React.createElement(require('D:/study/myumi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "myumi",
    "_title_default": "myumi"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
