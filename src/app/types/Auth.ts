export interface CognitoJWTPayload {
  exp: number;
  iat: number;
  sub: string;
  username: string;
}
