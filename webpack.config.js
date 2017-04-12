module.exports = {
	entry: "./assets/scripts/App.js",
	output: {
		path: "./assets/temp/scripts",
		filename: "App.js"
	},
	module: {
		loaders: [
			{
				loader: "babel",
				query: {
					presets: ["es2015"]
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}
