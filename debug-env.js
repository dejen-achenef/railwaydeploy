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
console.log('MYSQL_URL:', process.env.MYSQL_URL);
console.log('MYSQL_ROOT_PASSWORD:', process.env.MYSQL_ROOT_PASSWORD ? '***' : 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('RAILWAY_PRIVATE_DOMAIN:', process.env.RAILWAY_PRIVATE_DOMAIN);
console.log('RAILWAY_TCP_PROXY_DOMAIN:', process.env.RAILWAY_TCP_PROXY_DOMAIN);
console.log('RAILWAY_TCP_PROXY_PORT:', process.env.RAILWAY_TCP_PROXY_PORT);
console.log('PORT:', process.env.PORT);
console.log('\n=== All MySQL-related vars ===');
Object.keys(process.env).filter(k => k.includes('MYSQL') || k.includes('DB_') || k.includes('RAILWAY')).forEach(k => {
  console.log(`${k}:`, process.env[k] && process.env[k].includes('password') ? '***' : process.env[k]);
});
console.log('===========================');

