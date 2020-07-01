let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Leaderboard', function() {
	describe('/GET leaderboard', () => {
			it('it should GET global leaderboard', (done) => {
			chai.request(server)
					.get('/leaderboard')
					.end((err, res) => {
									res.should.have.status(200);
									res.body.should.be.a('array');
									res.body.length.should.be.above(0);
							done();
					});
			});
	});

	describe('/GET leaderboard/:country_iso_code', () => {
		it('it should GET leaderboard records by the given country iso code', (done) => {
			let country_iso_code = "eu";			
			chai.request(server)
				.get('/leaderboard/' + country_iso_code)
				.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('array');
							res.body.length.should.be.above(0);
					done();
				});
		 });

		 it('it should check the leaderboard for given country which is not exist in the records', (done) => {
			let country_iso_code = "none";
			chai.request(server)
				.get('/leaderboard/' + country_iso_code)
				.end((err, res) => {
						res.should.have.status(404);
						res.body.should.have.property('message');
						res.body.should.have.property('message').eql(`Not found any leaderboard data with country code ${country_iso_code}.`);
					done();
				});
		 });
	});

	describe('/POST score/submit', () => {
		it('it should UPDATE a score given the score_worth and user_id', (done) => {
				let score = {score_worth: 11, user_id: "a666c433-666c-498e-9539-200d54917666"}
					chai.request(server)
					.post('/score/submit/')
					.send(score)
					.end((err, res) => {
								res.should.have.status(201);
								res.body.should.be.a('object');
								res.body.should.all.have.property('score_worth');
								res.body.should.all.have.property('user_id');
								res.body.should.all.have.property('timestamp');
						done();
					});
			});
		
		it('it should NOT UPDATE a score when score_worth and user_id are not given', (done) => {
			let score = {score_worth: null, user_id: null}
			chai.request(server)
				.post('/score/submit/')
				.send(score)
				.end((err, res) => {
						res.should.have.status(404);
						res.body.should.have.property('message');
						res.body.should.have.property('message').eql(`Not found user with user_id ${score.user_id}.`);
					done();
				});
			});
	});

});