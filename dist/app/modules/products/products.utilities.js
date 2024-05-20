"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFilter = void 0;
const queryFilter = (query) => {
    const filter = Object.assign({}, query);
    const nonFilterFields = ['searchTerm', 'minPrice', 'maxPrice'];
    nonFilterFields.forEach((field) => delete filter[field]);
    for (const key in filter) {
        if (filter[key] == '') {
            delete filter[key];
        }
    }
    if (query.maxPrice && query.minPrice) {
        const price = {
            price: {
                $gte: Number(query.minPrice),
                $lte: Number(query.maxPrice),
            },
        };
        filter['price'] = price.price;
    }
    return filter;
};
exports.queryFilter = queryFilter;
