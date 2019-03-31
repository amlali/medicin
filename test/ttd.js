chai                        = require('chai');
expect                      = chai.expect;
chai.config.includeStack    = true;

const supertest             = require("supertest");
const server                = supertest.agent('http://localhost:3001');



describe("create global users/staff ", function () {
    it("activate driver", function (done) {
        server
          .post('/api/upload')
          .set('Content-Type', 'multipart/form-data')
          .attach('file',"./images.jpeg")
          .end(function (err, res) {
        
            done();
          });
      });




})