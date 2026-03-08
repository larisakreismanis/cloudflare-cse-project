# Cloudflare Customer Solutions Engineer Technical Project
## Overview
This project demos how Cloudflare services integrate with a simple origin server.

A Flask app runs on an Azure VM and returns HTTP request headers.
Cloudflare sits in front of the origin and provides routing, security, and authentication.

## Architecture
Client  
↓  
Cloudflare DNS + Proxy  
↓  
Cloudflare Worker  
↓  
Cloudflare Access (for `/secure`)  
↓  
Cloudflare Tunnel  
↓  
Azure VM  
↓  
nginx  
↓  
Flask app

## Environment Set Up
Install dependencies:  
`npm install`

Run the Worker locally:  
`wrangler dev`  
This starts a local development server where the Worker can be tested before deployment.

Deploy the Worker:  
`wrangler deploy`

## Testing
**Redirect behavior**  
`curl -I https://larisakdev.com`  
Expected:
`HTTP/2 302
location: https://developers.cloudflare.com/workers/about/`  

**Bypass redirect cookie**  
`curl -I https://larisakdev.com -H "Cookie: cf-noredir=true"`  
Expected:
`HTTP/2 200`  

**Access-protected route**  
`https://larisakdev.com/secure`  
Expected:
Cloudflare Access login page appears before reaching the origin.

## Cloudflare Features Used
**Cloudflare DNS & Proxy**  
Routes traffic through Cloudflare’s edge network.

**Cloudflare Tunnel**  
Creates a secure outbound connection from the origin server to Cloudflare.

**Cloudflare Workers**  
Runs edge logic to detect curl requests and apply redirects.

**Cloudflare Access (Zero Trust)**  
Protects the `/secure` path and requires authentication.

**Cloudflare API**  
Used to retrieve DNS records programmatically.


## Tools Used
- Cloudflare Workers
- Cloudflare Tunnel
- Cloudflare Access
- Cloudflare DNS
- Wrangler CLI
- Azure Virtual Machines
- Ubuntu Linux
- nginx
- Python Flask
- curl
- jq
