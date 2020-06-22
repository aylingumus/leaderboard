let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Users', function() {
	describe('/GET user/profile/:user_guid', () => {
		it('it should GET user data by the given user GUID', (done) => {
			let user_guid = "a7f3ed72-84f5-4adc-a16b-ccad82611474";			
			chai.request(server)
				.get('/user/profile/' + user_guid)
				.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.all.have.property('user_id');
							res.body.should.all.have.property('display_name');
							res.body.should.all.have.property('points');
							res.body.should.all.have.property('rank');
					done();
				});
		 });
	});

	describe('/POST user/create', () => {
		it('it should POST a user ', (done) => {
				let user = {
						display_name: "player3",
						country: "eu"
				}
					chai.request(server)
					.post('/user/create')
					.send(user)
					.end((err, res) => {
								res.should.have.status(201);
								res.should.be.json;
								res.body.should.all.have.property('user_id');
								res.body.should.all.have.property('display_name');
								res.body.should.all.have.property('points');
								res.body.should.all.have.property('rank');
						done();
					});
			});
	});
}); 