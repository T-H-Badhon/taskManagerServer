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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sales_model_1 = require("./sales.model");
const AppError_1 = require("../../errors/AppError");
const http_status_1 = __importDefault(require("http-status"));
const products_model_1 = require("../products/products.model");
const sales_utilities_1 = require("./sales.utilities");
const saleProduct = (saleData, userId, currentQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    saleData.saleBy = userId;
    saleData.date = new Date(saleData.date);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        saleData.date = new Date(saleData.date);
        const sale = yield sales_model_1.Sale.create([saleData], { session });
        if (!sale.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'sale Failed!');
        }
        if (currentQuantity > 0) {
            const newInventory = yield products_model_1.Product.findByIdAndUpdate(saleData.productId, { quantity: currentQuantity }, { new: true, session });
            if (!(newInventory === null || newInventory === void 0 ? void 0 : newInventory.quantity)) {
                throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'sale failed!');
            }
        }
        else {
            yield products_model_1.Product.findByIdAndDelete(saleData.productId, { session });
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to review course');
    }
});
const saleReport = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, sales_utilities_1.filterGenerator)(query);
    const result = yield sales_model_1.Sale.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails', // The alias for the joined data
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $group: {
                _id: null,
                sales: {
                    $push: {
                        productName: '$productDetails.name',
                        buyer: '$buyerName',
                        date: '$date',
                    },
                },
                totalSaleValue: {
                    $sum: { $multiply: ['$sellQuantity', '$productDetails.price'] },
                },
                totalQuantity: { $sum: '$sellQuantity' },
            },
        },
    ]);
    return result[0];
});
exports.saleServices = {
    saleProduct,
    saleReport,
};
