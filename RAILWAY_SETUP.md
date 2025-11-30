# Railway Setup Instructions

## The Problem
Railway uses template variables like `${{RAILWAY_PRIVATE_DOMAIN}}` which need to be resolved. These variables are not being resolved in your environment.

## Solution: Fix Railway Variables

### Option 1: Use Railway Service Connection (Recommended)

1. **In Railway Dashboard:**
   - Go to your `railwaydeploy` service
   - Click on "Settings" tab
   - Scroll to "Service Connections" or "Connected Services"
   - Make sure your MySQL service is connected to `railwaydeploy`

2. **Remove Template Variables:**
   - Go to Variables tab in `railwaydeploy` service
   - DELETE these variables (they use template syntax that doesn't work):
     - `MYSQLHOST="${{RAILWAY_PRIVATE_DOMAIN}}"`
     - `MYSQLPASSWORD="${{MYSQL_ROOT_PASSWORD}}"`
     - `MYSQLDATABASE="${{MYSQL_DATABASE}}"`
   
3. **Railway will auto-inject:**
   - When services are connected, Railway automatically provides:
     - `MYSQLHOST` (actual hostname)
     - `MYSQLPORT` (actual port)
     - `MYSQLUSER` (usually "root")
     - `MYSQLPASSWORD` (actual password)
     - `MYSQLDATABASE` (actual database name)

### Option 2: Use MYSQL_URL (Alternative)

If Railway provides `MYSQL_URL`, you can parse it:

```javascript
// Parse MYSQL_URL if available
// Format: mysql://user:password@host:port/database
```

### Option 3: Manual Variable Setup

If auto-injection doesn't work, manually set these in `railwaydeploy` Variables:

1. Go to MySQL service → Variables tab
2. Copy the actual values (not templates):
   - `MYSQLHOST` = (copy from MySQL service's `RAILWAY_PRIVATE_DOMAIN` or actual host)
   - `MYSQLPORT` = `3306` (or the actual port)
   - `MYSQLUSER` = `root`
   - `MYSQLPASSWORD` = (copy from MySQL service's `MYSQL_ROOT_PASSWORD`)
   - `MYSQLDATABASE` = `railway`

3. Paste these as **plain values** (not templates) in `railwaydeploy` service Variables

## Current Code Support

The code now supports:
- `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `RAILWAY_PRIVATE_DOMAIN` (as fallback for host)
- `RAILWAY_TCP_PROXY_PORT` (as fallback for port)

## Debug

After deployment, check logs for the debug output showing which variables are available.

