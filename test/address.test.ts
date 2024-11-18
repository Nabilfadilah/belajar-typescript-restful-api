import supertest from "supertest";
import {AddressTest, ContactTest, UserTest} from "./test-util";
import {web} from "../src/application/web"
import { logger } from "../src/application/logging";

describe('POST /api/contacts/:contactId/addresses', () => {
    
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalan Margacinta",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "11111"
        })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jalan Margacinta");
        expect(response.body.data.city).toBe("Bandung");
        expect(response.body.data.province).toBe("Jawa Barat");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("11111");

        logger.debug("Response status:", response.status);
        logger.debug("Response body:", response.body);
    })
   
    it('should be reject new address if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalan Margacinta",
            city: "Bandung",
            province: "Jawa Barat",
            country: "",
            postal_code: ""
        })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
   
    it('should be reject new address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id + 1}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalan belum ada",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "11111"
        })

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})

// get address
describe('GET /api/contacts/:contactId/addresses/:addressId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    // test berhasil
    it('should be able to get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    })

    // test gagal
    it('should reject get address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined()
    })
})