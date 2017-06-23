export class AuthInfo {
  id: number;
  user?: AuthUser;
  token?: string;
}

export class AuthUser {
  id;
  loginName;
  nickName;
  realName;
  email;
  lastLoginTime;
}
