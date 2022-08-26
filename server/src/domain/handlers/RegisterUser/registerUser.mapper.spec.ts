import { faker } from "@faker-js/faker";

import { comparePasswords } from "domain/helpers/password.helper";
import { RegisterUserCommandRequest } from "./registerUser.command.request";
import { mapRegisterUserCommandRequestToUser } from "./registerUser.mapper";

describe("registerUser.mapper", () => {
  it("map successfully", () => {
    // arrange
    const commandRequest = new RegisterUserCommandRequest(faker.internet.userName(), faker.internet.password());

    // act
    const mappedUser = mapRegisterUserCommandRequestToUser(commandRequest);

    // assert
    expect(mappedUser.id).toHaveLength(36);
    expect(mappedUser.name).toStrictEqual(commandRequest.name);
    expect(comparePasswords(commandRequest.password, mappedUser.password)).toBe(true);
  });
});
