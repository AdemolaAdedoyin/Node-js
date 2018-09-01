"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customer_identification_id;

/*******
 *
 *
 */

describe('Testing the customer-identification API', () => {

    describe('GET test for get /customer-identification', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customer-identification').expect(200, done);
        })
    });

    describe('POST test for Post /customer-identification', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customer-identification')
                .send({
                    'customerId':3,
                    'id_reference':10,
                    'identificationTypesId': 3
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test customer-identification created');
                        customer_identification_id = parseInt((response.body).id);
                        console.log(customer_identification_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customer-identification by Id /customer-identification/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customer-identification/${customer_identification_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customer-identification by Id customer-identification/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customer-identification/${customer_identification_id}`)
                .send({
                    'id_reference' : 45
                })
                .expect(200)
                .end((err, response) =>{
                    if(err){
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
        return api.delete(`/customer-identification/${customer_identification_id}`)
            .then(()=>{
                console.log("After: customer-identification successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});