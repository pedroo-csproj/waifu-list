import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { uuid } from "uuidv4";

import { PrismaService } from "../../../infra/data/prisma.service";
import { UserRepository } from "../../../infra/data/repositories/user.repository";
import { hashPassword } from "../../helpers/password.helper";
import { RegisterUserCommandRequest } from "./registerUser.command.request";
import { RegisterUserHandler } from "./registerUser.handler";

describe("registerUser.handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    prismaService = new PrismaService();
    userRepository = new UserRepository(prismaService);
    commandHandler = new RegisterUserHandler(userRepository);

    validCommandRequest = new RegisterUserCommandRequest(faker.internet.userName(), faker.internet.password());
    invalidCommandRequest = new RegisterUserCommandRequest("", faker.internet.password());
  });

  let prismaService: PrismaService;
  let userRepository: UserRepository;
  let commandHandler: RegisterUserHandler;

  let validCommandRequest: RegisterUserCommandRequest;
  let invalidCommandRequest: RegisterUserCommandRequest;

  it("name already registered", async () => {
    // arrange
    const user: User = {
      id: uuid(),
      name: faker.internet.userName(),
      password: hashPassword(faker.internet.password()),
      createDate: new Date(),
    };

    const create = jest.spyOn(UserRepository.prototype, "create");

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => user);

    // act
    const handleResult = await commandHandler.execute(validCommandRequest);

    // assert
    expect(handleResult.status).toBe(false);
    expect(handleResult.errors.length).toBe(1);
    expect(handleResult.errors[0]).toBe("name already registered");
    expect(handleResult.data).toStrictEqual(undefined);
    expect(create).toBeCalledTimes(0);
  });

  it("invalid user", async () => {
    // arrange
    const create = jest.spyOn(UserRepository.prototype, "create");

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => null);

    // act
    const handleResult = await commandHandler.execute(invalidCommandRequest);

    // assert
    expect(handleResult.status).toBe(false);
    expect(handleResult.errors.length).toBe(1);
    expect(handleResult.errors[0]).toBe("User.name - Should not be empty");
    expect(handleResult.data).toStrictEqual(undefined);
    expect(create).toBeCalledTimes(0);
  });

  it("register successfully", async () => {
    // arrange
    const create = jest.spyOn(UserRepository.prototype, "create");

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => null);

    // act
    const handleResult = await commandHandler.execute(validCommandRequest);

    // assert
    expect(handleResult.status).toBe(true);
    expect(handleResult.errors).toBe(undefined);
    expect(handleResult.data).toStrictEqual(undefined);
    expect(create).toBeCalledTimes(1);
  });
});
