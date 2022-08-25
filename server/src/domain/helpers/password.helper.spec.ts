import { faker } from "@faker-js/faker";

import { comparePasswords, hashPassword } from "./password.helper";

describe("password.helper", () => {
  describe("hashPassword", () => {
    it("hash password successfully", () => {
      // arrange
      const password = faker.internet.password();

      // act
      const hashedPassword = hashPassword(password);

      // assert
      expect(hashedPassword.length).toBeGreaterThan(1);
    });

    it("provide a empty password", () => {
      // arrange & act & assert
      expect(() => hashPassword("")).toThrow("password can't be null or empty");
    });
  });

  describe("comparePasswords", () => {
    it("provide a valid password", () => {
      // arrange
      const password = faker.internet.password();
      const hashedPassword = hashPassword(password);

      // act
      const comparePasswordsResult = comparePasswords(password, hashedPassword);

      // assert
      expect(comparePasswordsResult).toBe(true);
    });

    it("provide a invalid password", () => {
      // arrange
      const password = faker.internet.password();
      const hashedPassword = hashPassword(faker.internet.password());

      // act
      const comparePasswordsResult = comparePasswords(password, hashedPassword);

      // assert
      expect(comparePasswordsResult).toBe(false);
    });
  });
});
