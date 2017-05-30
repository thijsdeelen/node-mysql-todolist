//
// Tests voor versie 1 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
process.env.NODE_ENV = 'test';
process.env.APP_USERNAME = 'username';
process.env.APP_PASSWORD = 'password';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();
var token;

chai.use(chaiHttp);

before(function(done) {
    let user = {
        username: "username",
        password: "password"
    }
    chai.request(server)
        .post('/api/v1/login')
        .send(user)
        .end(function(err, res) {
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            token = res.body.token;
            done();
        });
});

describe('GET /api/v1/todos', function() {

    it('should return all ToDos when logged in', function(done) {
        chai.request(server)
            .get('/api/v1/todos')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                done();
            });
    });


});