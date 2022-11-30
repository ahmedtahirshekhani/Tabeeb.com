const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "https://b97c-58-27-202-37.in.ngrok.io",
			changeOrigin: true,
		})
	);
};
