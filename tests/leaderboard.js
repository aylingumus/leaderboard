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
									//res.body.length.should.be.eql(9);
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
							//res.body.length.should.be.eql(3);
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
	});

});