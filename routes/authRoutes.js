const passport = require("passport");

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(err, req, res, next) => {
			// custom error handler to catch any errors, such as TokenError
			if (err.name === "TokenError") {
				res.redirect("/auth/google"); // redirect them back to the login page
			} else {
				// Handle other errors here
				console.log(err);
			}
		},
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
