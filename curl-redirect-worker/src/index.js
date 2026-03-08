/*
Worker logic:

Detect curl requests and redirect them unless the bypass
cookie `cf-noredir=true` is present.
*/

const REDIRECT_URL = "https://developers.cloudflare.com/workers/about/";
const BYPASS_COOKIE = "cf-noredir=true";

export default {
	async fetch(request) {

		const url = new URL(request.url);

		const userAgent = request.headers.get("user-agent") || "";
		const cookies = request.headers.get("cookie") || "";

		const isCurl = userAgent.toLowerCase().includes("curl");
		const bypassEnabled = cookies.includes(BYPASS_COOKIE);

		if (isCurl && !bypassEnabled) {
			return Response.redirect(REDIRECT_URL, 302);
		}

		return fetch(request);
	},
};