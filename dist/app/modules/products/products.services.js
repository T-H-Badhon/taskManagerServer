"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const products_model_1 = require("./products.model");
const products_utilities_1 = require("./products.utilities");
const addProduct = (productData, id) => __awaiter(void 0, void 0, void 0, function* () {
    productData.addedBy = id;
    const product = yield products_model_1.Product.create(productData);
    return product;
});
const getProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query.searchTerm) {
        const products = yield products_model_1.Product.find({
            name: { $regex: query.searchTerm, $options: 'i' },
        });
        return products;
    }
    const filter = (0, products_utilities_1.queryFilter)(query);
    const products = yield products_model_1.Product.find(filter);
    return products;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndDelete(id);
    return result;
});
const deleteProducts = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.deleteMany({ _id: { $in: ids } });
    return result;
});
exports.productServices = {
    addProduct,
    getProducts,
    deleteOne,
    deleteProducts,
};
