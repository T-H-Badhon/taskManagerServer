"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = require("../modules/users/users.routes");
const sales_routes_1 = require("../modules/sales/sales.routes");
const products_routes_1 = require("../modules/products/products.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: users_routes_1.userRoutes,
    },
    {
        path: '/sales',
        route: sales_routes_1.salesRoutes,
    },
    {
        path: '/products',
        route: products_routes_1.productRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
