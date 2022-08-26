import * as fs from "fs";
import { uuid } from "uuidv4";

import { FileProvider } from "./file.provider";

describe("file.provider", () => {
  beforeEach(() => {
    fileProvider = new FileProvider();
  });

  let fileProvider: FileProvider;

  it("save image successfully", () => {
    // arrange
    const fileName = `${uuid()}.jpg`;

    // act
    fileProvider.save("test", fileName);

    // assert
    expect(fs.existsSync(`public/${fileName}`)).toBe(true);
  });
});
