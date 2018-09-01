"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customer_phone_numbers_id;

/*******
 *
 *
 */

describe('Testing the customer-phone-numbers API', () => {

    describe('GET test for get /customer-phone-numbers', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customer-phone-numbers').expect(200, done);
        })
    });

    describe('POST test for Post /customer-phone-numbers', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customer-phone-numbers')
                .send({
                    'customerId':3,
                    'phone_number':12345345563423456789999,
                    'isPrimary': true
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test customer-phone-numbers created');
                        customer_phone_numbers_id = parseInt((response.body).customerId);
                        console.log(customer_phone_numbers_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customer-phone-numbers by Id /customer-phone-numbers/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customer-phone-numbers/${customer_phone_numbers_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customer-phone-numbers by Id customer-phone-numbers/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customer-phone-numbers/${customer_phone_numbers_id}`)
                .send({
                    'isPrimary' : false
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
        return api.delete(`/customer-phone-numbers/${customer_phone_numbers_id}`)
            .then(()=>{
                console.log("After: customer-phone-numbers successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});