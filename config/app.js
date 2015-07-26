module.exports = {
  "development": {
    "port": 3000,
    "webpack-dev-server": {
      "baseUrl": "http://localhost:8080"
    }
  },
  "production": {
    "port": process.env.PORT || 3000
  }
};
