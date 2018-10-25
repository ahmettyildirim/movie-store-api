const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token;
let movie_id;
describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'ahmety', password: '12345' })
            .end((err,res) => {
                token=res.body.token;
                done();
            })
    });

    describe('/GET movies', () => {
        it('it should get all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                })
            done();
        });
    })

    describe('/POST one movie', () => {
        it('it should POST a movies', (done) => {
            const movie ={
                title: 'example',
                director_id:'5bd0c7e70b1a05227465c714',
                category: 'Comics',
                country: 'Turkey',
                year: 2012,
                imdb_score: 7
            }
            chai.request(server)
                .post('/api/movies/')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    movie_id = res.body._id;
                    done();
                })
        });
    })

    describe('/GET/:movie_id movie', () => {
        console.log('*---------------------------------****');
        console.log( movie_id);
        console.log('*---------------------------------****');
        it('it should get a movie by the given id', (done) => {
            console.log('************************************************');
            console.log(movie_id);
            chai.request(server)
                .get('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                })
        });
    })

    describe('/PUT a movie', () => {
        it('it should update a movies', (done) => {
            const movie ={
                title: 'example 2 3',
                director_id:'5bd0c7e70b1a05227465c714',
                category: 'Comics',
                country: 'Turkey',
                year: 2012,
                imdb_score: 7
            }
            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    done();
                })
        });
    })
    describe('/DELETE a movie', () => {
        it('it should delete a movie', (done) => {

            chai.request(server)
                .delete('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        });
    })

});