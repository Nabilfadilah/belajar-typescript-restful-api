// import supertest from "supertest";
// import {ContactTest, UserTest} from "./test-util"
// import {web} from "../src/application/web"
// import { logger } from "../src/application/logging"
// import bcrypt from "bcrypt"

// // Contact API test
// describe('POST /api/contacts', () => {

//     // menambahkan sebelum test selesai
//     beforeEach(async () => {
//         await UserTest.create();
//     })

//     // menambahkan sesudah
//     afterEach(async () => {
//         // menghapus semua contact
//         await ContactTest.deleteAll()

//         await UserTest.delete();
//     })

//     // test menambahkan contact
//     it('should create new contact', async () => {
//         const response = await supertest(web)
//             .post("/api/contacts")
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name : "eko",
//                 last_name : "khannedy",
//                 email : "eko@example.com",
//                 phone : "0899999"
//             })

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.id).toBeDefined();
//         expect(response.body.data.first_name).toBe("eko");
//         expect(response.body.data.last_name).toBe("khannedy");
//         expect(response.body.data.email).toBe("eko@example.com");
//         expect(response.body.data.phone).toBe("0899999");
//     })
    
//     // validasi error
//     it('should reject create new contact if data is invalid', async () => {
//         const response = await supertest(web)
//             .post("/api/contacts")
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name : "",
//                 last_name : "",
//                 email : "eko",
//                 phone : "08999999845989854958498"
//             })

//         logger.debug(response.body);
//         expect(response.status).toBe(400);
//         expect(response.body.errors).toBeDefined();
//     })
// })

// // get contatc api test
// describe('GET /api/contacts/:contactId', () => {

//     // menambahkan sebelum test selesai
//     beforeEach(async () => {
//         await UserTest.create();
//         await ContactTest.create();
//     })

//     // menambahkan sesudah
//     afterEach(async () => {
//         // menghapus semua contact
//         await ContactTest.deleteAll()

//         await UserTest.delete();
//     })

//     // datanya benar
//     it('should be able get contact', async () => {
//         // ambil contact nya 
//         const contact = await ContactTest.get()
//         const response = await supertest(web)
//             .get(`/api/contacts/${contact.id}`)
//             .set("X-API-TOKEN", "test")
        
//         logger.debug(response.body)
//         expect(response.status).toBe(200)
//         expect(response.body.data.id).toBeDefined()
//         expect(response.body.data.first_name).toBe(contact.first_name)
//         expect(response.body.data.last_name).toBe(contact.last_name)
//         expect(response.body.data.email).toBe(contact.email)
//         expect(response.body.data.phone).toBe(contact.phone)
//     })
    
//     // datanya salah
//     it('should reject get contact if contact is not found', async () => {
//         // ambil contact nya 
//         const contact = await ContactTest.get()
//         const response = await supertest(web)
//             .get(`/api/contacts/${contact.id + 1}`)
//             .set("X-API-TOKEN", "test")
        
//         logger.debug(response.body)
//         expect(response.status).toBe(404)
//         expect(response.body.errors).toBeDefined()
//     })
// })

// // update contact api test
// describe('PUT /api/contacts/:contactId', () => {

//     // menambahkan sebelum test selesai
//     beforeEach(async () => {
//         await UserTest.create();
//         await ContactTest.create();
//     })

//     // menambahkan sesudah
//     afterEach(async () => {
//         // menghapus semua contact
//         await ContactTest.deleteAll()

//         await UserTest.delete();
//     })

//     // data sukses
//     it('should be able to update contact', async () => {
//         const contact = await ContactTest.get();
//         const response = await supertest(web)
//             .put(`/api/contacts/${contact.id}`)
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name: "eko",
//                 last_name: "khannedy",
//                 email: "eko@example.com",
//                 phone: "9999"
//             })
        
//         logger.debug(response.body)
//         expect(response.status).toBe(200)
//         expect(response.body.data.id).toBe(contact.id)
//         expect(response.body.data.first_name).toBe("eko")
//         expect(response.body.data.last_name).toBe("khannedy")
//         expect(response.body.data.email).toBe("eko@example.com")
//         expect(response.body.data.phone).toBe("9999")
//     })

//     // test update gagal
//     it('should reject update contact if request is invalid', async () => {
//         const contact = await ContactTest.get();
//         const response = await supertest(web)
//             .put(`/api/contacts/${contact.id}`)
//             .set("X-API-TOKEN", "test")
//             .send({
//                 first_name: "",
//                 last_name: "",
//                 email: "ekocom",
//                 phone: ""
//             })
        
//         logger.debug(response.body);
//         expect(response.status).toBe(400);
//         expect(response.body.errors).toBeDefined();
//     })
// })

// // delete contct api test
// describe('DELETE /api/contacts/:contactId', () => {

//      // menambahkan sebelum test selesai
//      beforeEach(async () => {
//         await UserTest.create();
//         await ContactTest.create();
//     })

//     // menambahkan sesudah
//     afterEach(async () => {
//         // menghapus semua contact
//         await ContactTest.deleteAll()

//         await UserTest.delete();
//     })

//     // test sukses
//     it('should be able to remove contact', async () => {
//         const contact = await ContactTest.get();
//         const response = await supertest(web)
//             .delete(`/api/contact/${contact.id}`)
//             .set("X-API-TOKEN", "test");
        
//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data).toBe("OK")
//     })
    
//     // test gagal
//     it('should reject remove contact if contact is not found', async () => {
//         const contact = await ContactTest.get();
//         const response = await supertest(web)
//             .delete(`/api/contact/${contact.id + 1}`)
//             .set("X-API-TOKEN", "test");
        
//         logger.debug(response.body);
//         expect(response.status).toBe(404);
//         expect(response.body.errors).toBeDefined();
//     })
    
// })

// // search api test
// describe('GET /api/contacts', () => {

//     // menambahkan sebelum test selesai
//     beforeEach(async () => {
//         await UserTest.create();
//         await ContactTest.create();
//     })

//     // menambahkan sesudah
//     afterEach(async () => {
//         // menghapus semua contact
//         await ContactTest.deleteAll()

//         await UserTest.delete();
//     })

//     // tanpa mengirim parameter apapun
//     it('should be able to search contact', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.paging.current_page).toBe(1);
//         expect(response.body.paging.total_page).toBe(1);
//         expect(response.body.paging.size).toBe(10);
//     })

//     // test dari name
//     it('should be able to search contact using name', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .query({
//                 name: "es"
//             })
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.paging.current_page).toBe(1);
//         expect(response.body.paging.total_page).toBe(1);
//         expect(response.body.paging.size).toBe(10);
//     })
    
//     // test dari email
//     it('should be able to search contact using email', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .query({
//                 email: ".com"
//             })
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.paging.current_page).toBe(1);
//         expect(response.body.paging.total_page).toBe(1);
//         expect(response.body.paging.size).toBe(10);
//     })
    
//     // test dari phone
//     it('should be able to search contact using phone', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .query({
//                 phone: "99"
//             })
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(1);
//         expect(response.body.paging.current_page).toBe(1);
//         expect(response.body.paging.total_page).toBe(1);
//         expect(response.body.paging.size).toBe(10);
//     })

//     // test contact tidak ada
//     it('should be able to search contact no result', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .query({
//                 name: "salah"
//             })
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(0);
//         expect(response.body.paging.current_pasge).toBe(1);
//         expect(response.body.paging.total_page).toBe(0);
//         expect(response.body.paging.size).toBe(10);
//     })

//     // test beda page
//     it('should be able to search contact with paging', async () => {
//         const response = await supertest(web)
//             .get("/api/contacts")
//             .query({
//                 page: 2,
//                 size: 1
//             })
//             .set("X-API-TOKEN", "test")

//         logger.debug(response.body);
//         expect(response.status).toBe(200);
//         expect(response.body.data.length).toBe(0);
//         expect(response.body.paging.current_page).toBe(2);
//         expect(response.body.paging.total_page).toBe(1);
//         expect(response.body.paging.size).toBe(1);
//     })

// })