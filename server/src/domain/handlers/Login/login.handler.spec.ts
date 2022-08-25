import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { uuid } from "uuidv4";

import { PrismaService } from "../../../infra/data/prisma.service";
import { UserRepository } from "../../../infra/data/repositories/user.repository";
import { LoginCommandRequest } from "./login.command.request";
import { LoginHandler } from "./login.handler";
import { hashPassword } from "../../helpers/password.helper";
import { LoginCommandResponse } from "./login.command.response";

describe("login.handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    prismaService = new PrismaService();
    userRepository = new UserRepository(prismaService);
    commandHandler = new LoginHandler(userRepository);
  });

  let prismaService: PrismaService;
  let userRepository: UserRepository;
  let commandHandler: LoginHandler;

  it("user not found", async () => {
    // arrange
    const commandRequest = new LoginCommandRequest(faker.internet.userName(), faker.internet.password());

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => null);

    // act
    const handleResult = await commandHandler.execute(commandRequest);

    // assert
    expect(handleResult.status).toBe(false);
    expect(handleResult.errors.length).toBe(1);
    expect(handleResult.errors[0]).toBe("name or password are incorrect");
    expect(handleResult.data).toBe(undefined);
  });

  it("invalid password", async () => {
    // arrange
    const user: User = {
      id: uuid(),
      name: faker.internet.userName(),
      password: hashPassword(faker.internet.password()),
      createDate: new Date(),
    };

    const commandRequest = new LoginCommandRequest(faker.internet.userName(), faker.internet.password());

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => user);

    // act
    const handleResult = await commandHandler.execute(commandRequest);

    // assert
    expect(handleResult.status).toBe(false);
    expect(handleResult.errors.length).toBe(1);
    expect(handleResult.errors[0]).toBe("name or password are incorrect");
    expect(handleResult.data).toBe(undefined);
  });

  it("invalid password", async () => {
    // arrange
    const password = faker.internet.password();

    const user: User = {
      id: uuid(),
      name: faker.internet.userName(),
      password: hashPassword(password),
      createDate: new Date(),
    };

    const commandRequest = new LoginCommandRequest(faker.internet.userName(), password);

    jest.spyOn(UserRepository.prototype, "getByName").mockImplementation(async () => user);

    // act
    const handleResult = await commandHandler.execute(commandRequest);

    // assert
    expect(handleResult.status).toBe(true);
    expect(handleResult.errors).toBe(null);
    expect(handleResult.data).toStrictEqual(new LoginCommandResponse(user.id, user.name));
  });
});
