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
        expect(response.body.id).toBeDefined();
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
        expect(response.body.id).toBeDefined();
    })
   
    it('should be reject new address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id + 1}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalan Margacinta",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "11111"
        })

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.id).toBeDefined();
    })

})