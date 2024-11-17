import supertest from "supertest";
import {ContactTest, UserTest} from "./test-util"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging"
import bcrypt from "bcrypt"

// Contact API test
describe('POST /api/contacts', () => {

    // menambahkan sebelum test selesai
    beforeEach(async () => {
        await UserTest.create();
    })

    // menambahkan sesudah
    afterEach(async () => {
        // menghapus semua contact
        await ContactTest.deleteAll()

        await UserTest.delete();
    })

    // test menambahkan contact
    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name : "eko",
                last_name : "khannedy",
                email : "eko@example.com",
                phone : "0899999"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("eko");
        expect(response.body.data.last_name).toBe("khannedy");
        expect(response.body.data.email).toBe("eko@example.com");
        expect(response.body.data.phone).toBe("0899999");
    })
    
    // validasi error
    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name : "",
                last_name : "",
                email : "eko",
                phone : "08999999845989854958498"
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})