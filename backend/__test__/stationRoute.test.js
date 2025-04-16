import supertest from "supertest";
import app from "../index.js";


describe("Station Routes", () => {
    it("Get Train Details", async () => {
        const res = await supertest(app).get("/station/get-train-details?trainNo=12345");
        console.log(res.body);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.train.train_no).toBe(12345);
    });
});
