import { User } from "@prisma/client";
import { IValidator, ValidationResult, Validator } from "ts.validator.fluent/dist";

const validateUserRules = (validator: IValidator<User>): ValidationResult => {
  return validator
    .NotNull((w) => w.id, "Should not be null", "User.id")
    .NotEmpty((w) => w.id, "Should not be empty", "User.id")
    .Length((w) => w.id, 36, 36, "Should contain 36 characters", "User.id")
    .NotNull((w) => w.name, "Should not be null", "User.name")
    .NotEmpty((w) => w.name, "Should not be empty", "User.name")
    .Length((w) => w.name, 0, 40, "Maximum length is 40 characters", "User.name")
    .NotNull((w) => w.password, "Should not be null", "User.password")
    .NotEmpty((w) => w.password, "Should not be empty", "User.password")
    .NotNull((w) => w.createDate, "Should not be null", "Waifu.createDate")
    .ToResult();
};

export const validateUser = (user: User): string[] => {
  const validationResult = new Validator(user).Validate(validateUserRules);

  const mappedErrors: string[] = validationResult.Errors.map((e) => `${e.Identifier} - ${e.Message}`);

  return mappedErrors;
};
