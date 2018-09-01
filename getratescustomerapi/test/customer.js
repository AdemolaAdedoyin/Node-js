"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customers_id;

/*******
 *
 *
 */

describe('Testing the customers API', () => {

    describe('GET test for get /customers', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customers').expect(200, done);
        })
    });

    describe('POST test for Post /customers', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customers')
                .send({
                    'last_name':'dahdbwjabdu',
                    'first_name':'aybuuieda',
                    'date_of_birth':'1994-01-30',
                    'account_created_where':'trandhbjahsfer1'
                })
                .expect(200)
                .end((err, response) =>{
                    if(err)
                    {
                        console.log(response);
                        done(err);
                    }
                    else{
                        console.log('test customers created');
                        customers_id = parseInt((response.body).id);
                        console.log(customers_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customers by Id /customers/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customers/${customers_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customers by Id customers/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customers/${customers_id}`)
                .send({
                    'account_created_where' : 'transfer1'
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
        return api.delete(`/customers/${customers_id}`)
            .then(()=>{
                console.log("After: customers successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});