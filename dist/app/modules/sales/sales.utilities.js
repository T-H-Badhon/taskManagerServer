"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterGenerator = void 0;
const filterGenerator = (query) => {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    const start = startDate.toISOString().split('T')[0];
    const filter = {
        date: {
            $gte: new Date(start),
            $lte: endDate,
        },
    };
    return filter;
};
exports.filterGenerator = filterGenerator;
