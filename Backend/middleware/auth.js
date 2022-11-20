const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
	const header = req.headers["authorization"];
	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];
		// jwt verify
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(403).json({
					success: false,
					message: "Invalid token",
				});
			}
			req.decoded = decoded;
			next();
		});
	} else {
		res.status(403).json({
			success: false,
			message: "No token provided",
		});
	}
};

module.exports = {
	checkToken,
};
