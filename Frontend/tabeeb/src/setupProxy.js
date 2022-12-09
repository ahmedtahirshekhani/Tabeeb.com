const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "https://6b14-221-120-220-12.in.ngrok.io",
			changeOrigin: true,
		})
	);
};
