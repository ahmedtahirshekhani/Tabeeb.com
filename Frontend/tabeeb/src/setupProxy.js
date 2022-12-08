const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/v1",
		createProxyMiddleware({
			target: "https://0c00-111-68-103-169.in.ngrok.io",
			changeOrigin: true,
		})
	);
};
