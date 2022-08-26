import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { uuid } from "uuidv4";

import { hashPassword } from "domain/helpers/password.helper";
import { validateUser } from "./user.validator";

describe("user.validator", () => {
  it("pass valid user", () => {
    // arrange
    const user: User = {
      id: uuid(),
      name: faker.internet.userName(),
      password: hashPassword(faker.internet.password()),
      createDate: new Date(),
    };

    // act
    const validationResult = validateUser(user);

    // assert
    expect(validationResult.length).toBe(0);
  });

  it("pass invalid user", () => {
    // arrange
    const user: User = {
      id: "",
      name: "",
      password: "",
      createDate: new Date(),
    };

    // act
    const validationResult = validateUser(user);

    // assert
    expect(validationResult.length).toBe(4);
    expect(validationResult[0]).toBe("User.id - Should not be empty");
    expect(validationResult[1]).toBe("User.id - Should contain 36 characters");
    expect(validationResult[2]).toBe("User.name - Should not be empty");
    expect(validationResult[3]).toBe("User.password - Should not be empty");
  });
});
