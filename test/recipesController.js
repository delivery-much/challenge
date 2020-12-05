const request = require('supertest');

const app = require('../src/app');

describe('GET RECIPES', () => {
  it('/', (done) => {
    request(app)
      .get('/recipes?i=onion,tomatoes,pepper')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET RECIPES WITH MORE THAN 3 INGREDIENTS', () => {
  it('/', (done) => {
    request(app)
      .get('/recipes?i=onion,tomatoes,pepper,garlic')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
