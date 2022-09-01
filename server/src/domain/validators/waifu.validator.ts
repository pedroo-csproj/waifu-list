import { Waifu } from "@prisma/client";
import { IValidator, ValidationResult, Validator } from "ts.validator.fluent/dist";

import { buildErrors } from "domain/helpers/validator.helper";

const validateWaifuRules = (validator: IValidator<Waifu>): ValidationResult => {
  return validator
    .NotNull((w) => w.id, "Should not be null", "Waifu.id")
    .NotEmpty((w) => w.id, "Should not be empty", "Waifu.id")
    .Length((w) => w.id, 36, 36, "Should contain 36 characters", "Waifu.id")
    .NotNull((w) => w.userId, "Should not be null", "Waifu.userId")
    .NotEmpty((w) => w.userId, "Should not be empty", "Waifu.userId")
    .Length((w) => w.userId, 36, 36, "Should contain 36 characters", "Waifu.userId")
    .NotNull((w) => w.name, "Should not be null", "Waifu.name")
    .NotEmpty((w) => w.name, "Should not be empty", "Waifu.name")
    .Length((w) => w.name, 0, 40, "Maximum length is 40 characters", "Waifu.name")
    .Length((w) => w.image, 40, 40, "Should contain 40 characters", "Waifu.image")
    .NotNull((w) => w.origin, "Should not be null", "Waifu.origin")
    .NotEmpty((w) => w.origin, "Should not be empty", "Waifu.origin")
    .NotNull((w) => w.myAnimeListUrl, "Should not be null", "Waifu.myAnimeListUrl")
    .NotEmpty((w) => w.myAnimeListUrl, "Should not be empty", "Waifu.myAnimeListUrl")
    .NotNull((w) => w.createDate, "Should not be null", "Waifu.createDate")
    .ToResult();
};

export const validateWaifu = (waifu: Waifu): string[] => {
  const validationResult = new Validator(waifu).Validate(validateWaifuRules);

  return buildErrors(validationResult);
};
