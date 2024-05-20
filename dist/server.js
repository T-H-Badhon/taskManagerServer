"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config/config");
let server;
function main() {
    mongoose_1.default.connect(config_1.config.db_url);
    server = app_1.default.listen(config_1.config.port, () => {
        console.log(`app listening on port ${config_1.config.port}`);
    });
}
main();
process.on('unhandledRejection', () => {
    console.log('Unhandled Rejection is detected. shuting down...');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', () => {
    console.log('Uncaught Exception is detected. shutting down ...');
    process.exit(1);
});
