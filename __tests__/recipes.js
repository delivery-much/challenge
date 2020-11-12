const request = require('supertest');
const assert = require("assert");

// RECIPES ALIVE TEST
describe('GET /recipes?i=cheese,onion', function() {
  it('responds with json', function(done) {
    request('http://localhost:3000')
      .get('/recipes?i=cheese,onion')
      .set('Accept', 'application/json')
      // SHOULD RETURN JSON
      .expect('Content-Type', /json/)
      // SHOULD RETURN HTTP 200
      .expect(200)
      // CHECK THE RETURNING JSON IN THE END
      .then(res => {
        // SHOULD RETURN AN ARRAY WITH CHESSE AND ONION
        assert(res.body.keywords, [ 'cheese', 'onion' ]);

        // SHOULD RETURN A LIST WITH 10 RECIPES
        assert(res.body.recipes.length, 10);

        // CHECK IF THE RECIPE HAS THE FOUR MANDATORY PARAMETERS
        assert(Object.keys(res.body.recipes[0]), ['title', 'ingredients', 'link', 'gif']);

        // CHECK IF THE RECIPE INGREDIENT IS AN ARRAY
        assert(Array.isArray(res.body.recipes[0].ingredients), true);

        done();
      })
  });
});

// RECIPES NOT FOUND TEST
describe('GET /recipes?i=xise', function() {
  it('responds with json', function(done) {
    request('http://localhost:3000')
      .get('/recipes?i=xise')
      .set('Accept', 'application/json')
      // SHOULD RETURN JSON
      .expect('Content-Type', /json/)
      // SHOULD RETURN HTTP 404
      .expect(404, done);
  });
});

// METHOD NOT ALLOWED TEST
describe('POST /recipes?i=xise', function() {
  it('responds with json', function(done) {
    request('http://localhost:3000')
      .post('/recipes?i=xise')
      .set('Accept', 'application/json')
      // SHOULD RETURN JSON
      .expect('Content-Type', /json/)
      // SHOULD RETURN HTTP 405
      .expect(405, done);
  });
});

// METHOD NOT ALLOWED TEST
describe('POST /recipes?i=xise', function() {
  it('responds with json', function(done) {
    request('http://localhost:3000')
      .post('/recipes?i=xise')
      .set('Accept', 'application/json')
      // SHOULD RETURN JSON
      .expect('Content-Type', /json/)
      // SHOULD RETURN HTTP 405
      .expect(405, done);
  });
});

// ANY OTHER URL SHOULD RETURN 404
describe('GET /', function() {
  it('responds with json', function(done) {
    request('http://localhost:3000')
      .get('/')
      // SHOULD RETURN JSON
      .expect('Content-Type', /json/)
      // SHOULD RETURN HTTP 405
      .expect(404, done);
  });
});
