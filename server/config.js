import 'dotenv/config';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       "mongodb://admin:hotdog123@ds139959.mlab.com:39959/skeleton-testing";
exports.PORT = process.env.PORT || 8080;
exports.HOST = process.env.HOST;
