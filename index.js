const server = require("./api/server.js");

const port = 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
