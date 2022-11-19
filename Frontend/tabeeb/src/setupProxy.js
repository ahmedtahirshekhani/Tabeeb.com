const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "https://a4fb-111-68-103-169.in.ngrok.io",
			changeOrigin: true,
		})
	);
};
