import { ValidationResult } from "ts.validator.fluent/dist";

export const buildErrors = (validationResult: ValidationResult): string[] => {
  const mappedErrors = validationResult.Errors.map((e) => `${e.Identifier} - ${e.Message}`);

  return mappedErrors;
};
