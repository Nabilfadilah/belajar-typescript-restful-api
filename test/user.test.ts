import supertest from "supertest"
import {web} from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util"
import bcrypt from "bcrypt"

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

// user login
describe('POST /api/users/login', () => {

    // menambahkan sebeleum test selesai
    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    // login sukses
    it('should be able to login', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.token).toBeDefined()
    })
    
    // username salah
    // it('should reject login user if username is wrong', async () => {
    //     const response = await supertest(web)
    //         .post("/api/users/login")
    //         .send({
    //             username: "salah",
    //             password: "test"
    //         })

    //     logger.debug(response.body)
    //     expect(response.status).toBe(401)
    //     expect(response.body.errors).toBeDefined()
    // })
    
    // password salah
    // it('should reject login user if password is wrong', async () => {
    //     const response = await supertest(web)
    //         .post("/api/users/login")
    //         .send({
    //             username: "test",
    //             password: "129829182918"
    //         })

    //     logger.debug(response.body)
    //     expect(response.status).toBe(401)
    //     expect(response.body.errors).toBeDefined()
    // })
})

// test get user login
describe('GET /api/users/current', () => {
    
    // menambahkan sebelum test selesai
    beforeEach(async () => {
        await UserTest.create();
    })

    // menambahkan sesudah
    afterEach(async () => {
        await UserTest.delete();
    })

    // tokennya berhasil
    it('should be able to get user', async () => {
        const response = await supertest(web)
        .get("/api/users/current")
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    })
    
    // tokenya salah
    it('should reject get user if token is invalid', async () => {
        const response = await supertest(web)
        .get("/api/users/current")
        .set("X-API-TOKEN", "salah")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})

// update user test
describe('PATCH /api/users/current', () => {
    
    // menambahkan sebelum test selesai
    beforeEach(async () => {
        await UserTest.create();
    })

    // menambahkan sesudah
    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject update user if request is invalid', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "",
                name: ""
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
    
    // tokenya salah
    it('should reject update user if token is wrong', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                password: "benar",
                name: "benar"
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
    
    // update name
    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar"
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("benar")
    })
    
    // update password
    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar"
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        
        // ambil ke database, apakah sudah benar?
        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true)
    })
})