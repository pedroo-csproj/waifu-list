import * as bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  if (password.trim() === "" || password === null) {
    throw new Error("password can't be null or empty");
  }

  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
