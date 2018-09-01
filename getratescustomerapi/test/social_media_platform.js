"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let social_media_platforms_id;

/*******
 *
 *
 */

describe('Testing the social-media-platforms API', () => {

    describe('GET test for get /social-media-platforms', ()=>{
        it('it should return 200', (done)=>{
            api.get('/social-media-platforms').expect(200, done);
        })
    });

    describe('POST test for Post /social-media-platforms', ()=>{
        it('it should return 200', (done)=>{
            api.post('/social-media-platforms')
                .send({
                    'social_media_name':'sfdgfhgjh'
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test social-media-platforms created');
                        social_media_platforms_id = parseInt((response.body).id);
                        console.log(social_media_platforms_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a social-media-platforms by Id /social-media-platforms/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/social-media-platforms/${social_media_platforms_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a social-media-platforms by Id social-media-platforms/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/social-media-platforms/${social_media_platforms_id}`)
                .send({
                    'social_media_name' : 'dsfgfy'
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
        return api.delete(`/social-media-platforms/${social_media_platforms_id}`)
            .then(()=>{
                console.log("After: social-media-platforms successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});