const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "https://7d2b-110-93-234-10.in.ngrok.io",
			changeOrigin: true,
		})
	);
};
