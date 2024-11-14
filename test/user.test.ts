import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"

// testing user register
describe('POST /api/users', () => {

    // menambahkan sesudah test selesai
    afterEach(async () => {
        await UserTest.delete();
    })

    // test error register tidak valid maka akan direject
    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(web)
        // post ke api user
        .post("/api/users")
        // selanjutnya send data yang error/kosong
        .send({
            username: "",
            password: "",
            name: ""
        })

        // log debug dari response body nya
        logger.debug(response.body);
    
        // expektasinya adalah si resonse statusnya 400
        expect(response.status).toBe(400);
    
        // dan response body nya ada error dengan detail errornya
        expect(response.body.errors).toBeDefined();
    })

    // test suksees regsiteer
    it('should register new user', async () => {
        const response = await supertest(web)
        // post ke api user
        .post("/api/users")
        // selanjutnya send data yang error/kosong
        .send({
            username: "test",
            password: "test",
            name: "test"
        })

        // log debug dari response body nya
        logger.debug(response.body);
        // expektasinya adalah si resonse statusnya 200
        expect(response.status).toBe(200);
    
        // dan response body nya sukses
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    })

})