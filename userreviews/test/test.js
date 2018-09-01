let supertest = require('supertest');
let api = supertest('http://localhost:3000');
let reviews_id;

/****
 router.post('/', Controller.create);
 
 router.put('/:id', Controller.updateOne);
 router.delete('/:id', Controller.deleteOne);
 */

describe('Testing the routes for the reviews API' , ()=>{

    describe('GET test for /reviews' , ()=>{
        it('it should return 200' , (done)=>{
            api.get('/reviews').expect(200, done);
        })
    });

    describe('POST test for /reviews' , ()=>{
        it('it should return 200' , (done)=>{
            api.post('/reviews')
                .field('rating' , '3')
                .field('review' , 'hbkkjbkh')
                .field('institution_name' , 'First Bank')
                .field('review_type' , 'services')
                .field('improvement_area' , 'dsajguidhewi')
                .field('service_name' , 'ATM')
                .field('email' , 'iafolabi@gmail.com')
                .attach('document_url', 'v1/public/uploads/0f3f4ca015fe2c426d8a4c107b9ecd39.png')
                .expect(200)
                .end((err, response) =>{
                console.log(response.body);
                if(err){
                    done(err);
                    console.log(response);
                }
                else{
                    reviews_id = parseInt((response.body.row_created).id);
                    console.log(reviews_id);
                    done();
                }
                })
        })
    });

    describe('GET test for /reviews/:id' , ()=>{
        it('it should return 200' , (done)=>{
            api.get(`/reviews/${reviews_id}`).expect(200, done);
        })
    });

    describe('PUT test for /reviews/:id' , ()=>{
        it('it should return 200' , (done)=>{
            api.put(`/reviews/${reviews_id}`)
                .field('institution_name' , 'asertry')
                .expect(200)
                .end((err, response) =>{
                if(err){
                    done(err);
                }
                else{
                    done();
                }
                })
        })
    });

after(()=>{
    return api.delete(`/reviews/${reviews_id}`)
        .then(()=>{
            console.log("After: reviews successfully deleted");
        })
        .catch((err)=>{
        console.log(err);
    });
})

});