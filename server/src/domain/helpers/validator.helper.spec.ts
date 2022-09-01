import { ValidationResult } from "ts.validator.fluent/dist";

import { buildErrors } from "./validator.helper";

describe("validator.helper", () => {
  it("build erros list successfully", () => {
    // arrange
    const validationResult: ValidationResult = {
      IsValid: false,
      IdentifierStartsWith: null,
      Identifier: null,
      Errors: [
        {
          Value: "",
          Identifier: "Waifu.id",
          Message: "Should not be null",
        },
        {
          Value: "",
          Identifier: "Waifu.name",
          Message: "Maximum length is 40 characters",
        },
      ],
    };

    // act
    const mappedErrors = buildErrors(validationResult);

    // assert
    expect(mappedErrors.length).toBe(2);
    expect(mappedErrors[0]).toBe("Waifu.id - Should not be null");
    expect(mappedErrors[1]).toBe("Waifu.name - Maximum length is 40 characters");
  });
});
