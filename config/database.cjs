require("dotenv").config();

// Parse MYSQL_URL if available (Railway format: mysql://user:password@host:port/database)
function parseMysqlUrl() {
  const mysqlUrl = process.env.MYSQL_URL;
  if (!mysqlUrl) return null;
  
  try {
    const url = new URL(mysqlUrl);
    return {
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.replace('/', '')
    };
  } catch (e) {
    return null;
  }
}

const mysqlUrlConfig = parseMysqlUrl();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "user_video_db",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: (process.env.DB_NAME || "user_video_db") + "_test",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: mysqlUrlConfig?.user || process.env.DB_USER || process.env.MYSQLUSER || process.env.MYSQL_USER || "root",
    password: mysqlUrlConfig?.password || process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD || "",
    database: mysqlUrlConfig?.database || process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "railway",
    host: mysqlUrlConfig?.host || process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.RAILWAY_PRIVATE_DOMAIN || "localhost",
    port: mysqlUrlConfig?.port || parseInt(process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.RAILWAY_TCP_PROXY_PORT || "3306"),
    dialect: "mysql",
    logging: console.log, // Enable logging to debug connection
    retry: {
      max: 5,
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ]
    }
  },
};
