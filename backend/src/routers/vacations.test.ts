import { sign } from "jsonwebtoken";
import app, { start } from "../app";
import request from "supertest";
import config from "config";
import { v4 } from "uuid";
  
describe("vacations router tests", () => {

    beforeAll(async () => {
        await start();
     });

    const jwt = sign(
        { id: "91aafc6a-2da4-41dc-957a-fc04e491e2b1" },
        config.get<string>("app.jwtSecret")
    );

    const validVacation = {
        destination: "Hawaii",
        description: "Sunny and beachy",
        vacationStart: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        vacationEnd: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),   // Day after
        price: 999.99,
      };

    const {description, destination, vacationStart , vacationEnd, price} = validVacation
   
    const fakeImageBuffer = Buffer.from("fake image content");


    describe("GET /vacations/ endpoint test", () => {

        test("it should return 401 if no authorization header", async () => {
        const result = await request(app).get("/vacations");
        expect(result.statusCode).toBe(401);
        });

        test("it should return an array of vacations", async () => {
        const result = await request(app)
            .get("/vacations")
            .set({ "Authorization" : `Bearer ${jwt}` });
        expect(result.statusCode).toBe(200);
        expect(Array.isArray(result.body)).toBeTruthy()
        expect(result.body[0]).toHaveProperty('id')
        expect(result.body[0]).toHaveProperty('destination')
        expect(result.body[0]).toHaveProperty('description')
        expect(result.body[0]).toHaveProperty('vacationStart')
        expect(result.body[0]).toHaveProperty('vacationEnd')
        expect(result.body[0]).toHaveProperty('price')
        expect(result.body[0]).toHaveProperty('imageUrl')
        });
  });



    describe("POST /vacations/ endpoint test", () => {
  
  
      test("should create a vacation with valid data", async () => {
        const result = await request(app)
          .post("/vacations")
          .set("Authorization", `Bearer ${jwt}`)
          .field("destination", destination)
          .field("description", description)
          .field("vacationStart", vacationStart)
          .field("vacationEnd", vacationEnd)
          .field("price", price)
          .attach("vacationImage", fakeImageBuffer, { filename: "test.jpg", contentType: "image/jpeg" });

  
        expect(result.statusCode).toBe(200);
        expect(result.body).toHaveProperty('id')
        expect(result.body).toHaveProperty('destination')
        expect(result.body).toHaveProperty('description')
        expect(result.body).toHaveProperty('vacationStart')
        expect(result.body).toHaveProperty('vacationEnd')
        expect(result.body).toHaveProperty('price')
        expect(result.body).toHaveProperty('imageUrl')
      });
  
      test("should return 422 for invalid image type", async () => {
        const res = await request(app)
          .post("/vacations")
          .set("Authorization", `Bearer ${jwt}`)
          .field("destination", destination)
          .field("description", description)
          .field("vacationStart", vacationStart)
          .field("vacationEnd", vacationEnd)
          .field("price", price)
          .attach("vacationImage", fakeImageBuffer, {
            filename: "test.txt", 
            contentType: "text/plain", 
          });
  
        expect(res.statusCode).toBe(422);
      });

      test('it should return 401 if no authorization header', async () => {
        const result = await request(app).post('/vacations')
        expect(result.statusCode).toBe(401)
    })


    });
  
  
  describe('DELETE /vacations/:id endpoint tests', () => {

    test('should return 422 for an invalid id error', async ()=>{

      const result = await request(app).delete('/vacations/badId').set({ "Authorization" : `Bearer ${jwt}`});
      expect(result.statusCode).toBe(422)
    })
    
    test('should return 404 if vacation is not found', async ()=>{

      const result = await request(app).delete(`/vacations/${v4()}`).set({ "Authorization" : `Bearer ${jwt}`});
      expect(result.statusCode).toBe(404)
      expect(result.text).toBe('Vacation not found or does not exist')
    })

    test('should return success for deleting a vacation', async ()=>{


      const testVacation = await request(app)
      .post("/vacations")
      .set("Authorization", `Bearer ${jwt}`)
      .field("destination", destination)
      .field("description", description)
      .field("vacationStart", vacationStart)
      .field("vacationEnd", vacationEnd)
      .field("price", price)
      .attach("vacationImage", fakeImageBuffer, { filename: "test.jpg", contentType: "image/jpeg" });

      const testVacationId = testVacation.body.id

      const result = await request(app).delete(`/vacations/${testVacationId}`).set({ "Authorization" : `Bearer ${jwt}`});
      expect(result.statusCode).toBe(200)
      expect(result.text).toBe('{\"success\":true}')
    })
  })


  describe('PATCH /vacations/:id endpoint tests', () => {


    test('should return 400 or 422 when required fields are missing in PATCH request', async () => {
      // 1. Create the vacation
      const createRes = await request(app)
        .post("/vacations")
        .set("Authorization", `Bearer ${jwt}`)
        .field("destination", destination)
        .field("description", description)
        .field("vacationStart", vacationStart)
        .field("vacationEnd", vacationEnd)
        .field("price", price)
        .attach("vacationImage", fakeImageBuffer, {
          filename: "test.jpg",
          contentType: "image/jpeg",
        });
    
      const vacationId = createRes.body.id;
      expect(createRes.statusCode).toBe(200);
      expect(vacationId).toBeDefined();
    
      // 2. Attempt to update without `description`
      const patchRes = await request(app)
        .patch(`/vacations/${vacationId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          destination,
          // description is missing here
          vacationStart,
          vacationEnd,
          price,
          imageUrl: createRes.body.imageUrl,
        });
    
      expect(patchRes.statusCode).toBe(422); 
    
      // 3. Cleanup: delete vacation
      const deleteRes = await request(app)
        .delete(`/vacations/${vacationId}`)
        .set("Authorization", `Bearer ${jwt}`);
    
      expect(deleteRes.statusCode).toBe(200);
    });
    


    test('should update the price of an existing vacation', async () => {

      // 1. Create the vacation
      const createRes = await request(app)
        .post("/vacations")
        .set("Authorization", `Bearer ${jwt}`)
        .field("destination", destination)
        .field("description", description)
        .field("vacationStart", vacationStart)
        .field("vacationEnd", vacationEnd)
        .field("price", price)
        .attach("vacationImage", fakeImageBuffer, {
          filename: "test.jpg",
          contentType: "image/jpeg",
        });
  
      const vacationId = createRes.body.id;
      expect(createRes.statusCode).toBe(200);
      expect(vacationId).toBeDefined();
  
      // 2. Update the price
      const updatedPrice = 1234.56;
      const patchRes = await request(app)
        .patch(`/vacations/${vacationId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          destination,
          description,
          vacationStart,
          vacationEnd,
          price: updatedPrice,
        });
  
      expect(patchRes.statusCode).toBe(200);
      expect(patchRes.body.id).toBe(vacationId);
      expect(patchRes.body.price).toBe(updatedPrice);
      expect(patchRes.body.destination).toBe(destination);
  
      // 3. Delete the vacation after test
      const deleteRes = await request(app)
        .delete(`/vacations/${vacationId}`)
        .set("Authorization", `Bearer ${jwt}`);
  
      expect(deleteRes.statusCode).toBe(200);
    });
  });
  


});
