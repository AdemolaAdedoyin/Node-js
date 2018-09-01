"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let customer_social_media_id;

/*******
 *
 *
 */

describe('Testing the customer-social-media API', () => {

    describe('GET test for get /customer-social-media', ()=>{
        it('it should return 200', (done)=>{
            api.get('/customer-social-media').expect(200, done);
        })
    });

    describe('POST test for Post /customer-social-media', ()=>{
        it('it should return 200', (done)=>{
            api.post('/customer-social-media')
                .send({
                    'user_name':'sfdgfhjhkgfhgjh',
                    'customerId':3,
                    'socialMediaPlatformId': 3
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test customer-social-media created');
                        customer_social_media_id = parseInt((response.body).id);
                        console.log(customer_social_media_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a customer-social-media by Id /customer-social-media/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/customer-social-media/${customer_social_media_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a customer-social-media by Id customer-social-media/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/customer-social-media/${customer_social_media_id}`)
                .send({
                    'user_name' : 'ddsdasfgfy'
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
        return api.delete(`/customer-social-media/${customer_social_media_id}`)
            .then(()=>{
                console.log("After: customer-social-media successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});