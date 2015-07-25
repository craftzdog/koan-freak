module.exports = function* () {

  if(this.assertCSRF()) {
    this.body = [{
      title: 'Hello',
      content: 'World!'
    }];
  }
  else {
    yield this.error.invalidRequest();
  }

};
