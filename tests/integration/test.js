const request = require("supertest");
const { describe, expect } = require("@jest/globals");
const app = require("../../index");
const { Event } = require("../../models/event");
// const { Attendee } = require('../../models/attendee');

jest.setTimeout(30000)

describe("/events", () => {
  beforeAll(() => {
    const app = require("../../index");
  });
  afterAll(async () => {
    app.close();
    await Event.remove({});
  });
  describe("GET /", () => {
    it("should return all events", async () => {
      await Event.collection.insert([
        {
          name: "Event1",
          description: "The best experience of the word",
          date: "2023-08-09",
          location: "Ijesha",
        },
        { name: "Event2",
          description: "The best experience of the word",
          date: "2023-08-09",
          location: "Ijesha",
        }
      ]);
      const res = await request(app).get("/events");
      expect(res.status).toBe(200);
    });
  });
});