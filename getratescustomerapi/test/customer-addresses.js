'use strict';
let supertest = require('supertest');
let api = supertest('http://localhost:5000');
let customer_addresses_id ;

/*

 */

describe('Testing for all the routes for this file(customer-addresses)', function(){

    describe('GET /customer-addresses', function () {
        it('should return a 200 status response', function (done) {
            api.get('/customer-addresses').expect(200, done);
        });
    });


    describe('POST /customer-addresses', function () {
        it('should return a 200 status response', function (done) {
            api.post('/customer-addresses')
                .send({
                    'customer_id':3,
                    'street_address':'qwerty',
                    'city':'qwerty',
                    'state':'qwerty',
                    'country':'qwerty'
                })
                .expect(200)
                .end((err, response) => {
                    if (err) {
                        console.log(response);
                        done(err);
                    }
                    else {
                        console.log('test customer-addresses created');
                        customer_addresses_id = parseInt((response.body).id);
                        console.log(customer_addresses_id);
                        done();
                    }
                });
        });
    });

    describe('GET /customer-addresses/:id', function(){
        it('it should return 200 if okay' ,function(done){
            api.get(`/customer-addresses/${customer_addresses_id}`).expect(200, done);
        });
    });

    describe('PUT /customer-addresses/:id', function () {
        it('should return a 200 status response', function (done) {

            api.put(`/customer-addresses/${customer_addresses_id}`)
                .send({
                    'state': 'khsjbkfl'
                })
                .expect(200)
                .end((err, response) => {
                    if (err) {
                        done(err);
                    } else {
                        // console.log(response.body);
                        done();
                    }
                });
        });
    });

    after(function(){
        return api.delete(`/customer-addresses/${customer_addresses_id}`)
            .then(() => {
                console.log('After: test customer-addresses deleted');
            })
            .catch((err) =>{
                console.log(err);
            });
    });
});


