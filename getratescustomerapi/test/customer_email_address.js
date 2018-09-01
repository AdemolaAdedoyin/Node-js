"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customer_emails_id;

/*******
 *
 *
 */

describe('Testing the customer-emails API', () => {

    describe('GET test for get /customer-emails', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customer-emails').expect(200, done);
        })
    });

    describe('POST test for Post /customer-emails', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customer-emails')
                .send({
                    'customerId':3,
                    'email_address':'adegdhfjdroj@ldjsfl.com',
                    'isPrimary': false
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test customer-emails created');
                        customer_emails_id = parseInt((response.body).customerId);
                        console.log(customer_emails_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customer-emails by Id /customer-emails/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customer-emails/${customer_emails_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customer-emails by Id customer-emails/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customer-emails/${customer_emails_id}`)
                .send({
                    'isPrimary' : true
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
        return api.delete(`/customer-emails/${customer_emails_id}`)
            .then(()=>{
                console.log("After: customer-emails successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});