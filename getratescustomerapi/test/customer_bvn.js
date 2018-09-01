"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customer_bvns_id;

/*******
 *
 *
 */

describe('Testing the customer-bvns API', () => {

    describe('GET test for get /customer-bvns', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customer-bvns').expect(200, done);
        })
    });

    describe('POST test for Post /customer-bvns', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customer-bvns')
                .send({
                    'bvn':'1234567890',
                    'customerId':3
                })
                .expect(200)
                .end((err, response) =>{
                    if(err)
                    {
                        console.log(response);
                        done(err);
                    }
                    else{
                        console.log('test customer-bvns created');
                        customer_bvns_id = parseInt((response.body).id);
                        console.log(customer_bvns_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customer-bvns by Id /customer-bvns/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customer-bvns/${customer_bvns_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customer-bvns by Id customer-bvns/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customer-bvns/${customer_bvns_id}`)
                .send({
                    'bvn' : '2345678'
                })
                .expect(200)
                .end((err, response) =>{
                    if(err){
                        console.log(response.body);
                        done(err);
                    }
                    else{
                        // console.log(response.body);
                        done();
                    }
                })
        })
    });

    after(()=>{
        return api.delete(`/customer-bvns/${customer_bvns_id}`)
            .then(()=>{
                console.log("After: customer-bvns successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});