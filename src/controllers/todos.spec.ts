import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import apiRequest from "../test/apiRequest";
import { createUserRequest, createTodoRequest } from "../test/utils";

describe("Todos", () => {
  const email = "foo@example.com";
  const description = "Hello, World!";

  describe("Create", async () => {
    it("Should create new Todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      await createTodoRequest(id, description).expect(StatusCodes.CREATED);
    });
  });

  describe("Get", async () => {
    it("Should get users todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const descriptions = ["Foo", "Bar", "Baz"];

      for (const description of descriptions) {
        await createTodoRequest(id, description);
      }

      const {
        body: { todos },
      } = await apiRequest.get(`/users/${id}/todos`).expect(StatusCodes.OK);

      expect(todos.length).to.be.equal(descriptions.length);

      for (const index in descriptions) {
        expect(todos[index].description).to.be.equal(descriptions[index]);
      }
    });

    it("Should get specific todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      const { body } = await apiRequest
        .get(`/users/${id}/todos/${uuid}`)
        .expect(StatusCodes.OK);

      expect(body.description).to.be.equal(description);
    });

    it("Should response with 404 when specific todo was not found", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const uuid = "00000000-0000-0000-0000-000000000000";

      await apiRequest
        .get(`/users/${id}/todos/${uuid}`)
        .expect(StatusCodes.NOT_FOUND);
    });
  });
});
