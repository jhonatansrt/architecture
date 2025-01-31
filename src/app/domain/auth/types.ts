export class CreateSession {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class FindEmail {
  email: string;

  constructor() {
    this.email = '';
  }
}

export class ResetPasword {
  token: string;
  password: string;

  constructor() {
    this.token = '';
    this.password = '';
  }
}

export class CreateAccount {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  phone: string;
  gender: Gender;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.birth_date = '';
    this.phone = '';
    this.gender = 0;
  }
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
  UNDEFINED = 3,
}

export class UpdateProfile {
  name: string;
  birth_date: string;

  constructor() {
    this.name = '';
    this.birth_date = '';
  }
}

export class UpdatePassword {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;

  constructor() {
    this.password = '';
    this.newPassword = '';
    this.newPasswordConfirmation = '';
  }
}

export type CreateSessionApiResponse = {
  user: User;
  token: string;
  refresh_token: string;
};

export class RefreshToken {
  token: string;

  constructor() {
    this.token = '';
  }
}

export type RefreshTokenApiResponse = {
  token: string;
  refresh_token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  avatar: string;
  type: TypeUser;
};

export enum TypeUser {
  MASTER = 0,
  ADMIN = 1,
  MEMBER = 2,
  VISITOR = 3,
}
