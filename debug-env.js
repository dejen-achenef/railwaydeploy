// Debug script to check environment variables
console.log('=== Environment Variables ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('MYSQLHOST:', process.env.MYSQLHOST);
console.log('MYSQLPORT:', process.env.MYSQLPORT);
console.log('MYSQLUSER:', process.env.MYSQLUSER);
console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? '***' : 'NOT SET');
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE);
console.log('PORT:', process.env.PORT);
console.log('===========================');

