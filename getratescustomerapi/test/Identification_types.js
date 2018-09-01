"use strict";
let supertest = require('supertest');
let api = supertest('http://localhost:5000');

let identification_types_id;

/*******
 *
 *
 */

describe('Testing the identification-types API', () => {

    describe('GET test for get /identification-types', ()=>{
        it('it should return 200', (done)=>{
            api.get('/identification-types').expect(200, done);
        })
    });

    describe('POST test for Post /identification-types', ()=>{
        it('it should return 200', (done)=>{
            api.post('/identification-types')
                .send({
                    'identification_type':'dsfdgfh'
                })
                .expect(200)
                .end((err, response) =>{
                    console.log(response.body);
                    if(err)
                    {
                        done(err);
                    }
                    else{
                        console.log('test identification-types created');
                        identification_types_id = parseInt((response.body).id);
                        console.log(identification_types_id);
                        done();
                    }
                })
        })
    });

    describe('GET test for get a identification-types by Id /identification-types/id', ()=>{
        it('it should return 200', (done)=>{
            api.get(`/identification-types/${identification_types_id}`).expect(200, done);
        })
    });

    describe('PUT test for get a identification-types by Id identification-types/id', ()=>{
        it('it should return 200', (done)=>{
            api.put(`/identification-types/${identification_types_id}`)
                .send({
                    'identification_type' : 'dffhgfd'
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
        return api.delete(`/identification-types/${identification_types_id}`)
            .then(()=>{
                console.log("After: identification-types successfully deleted");
            })
            .catch((err)=>{
                console.log(err);
            });
    });

});