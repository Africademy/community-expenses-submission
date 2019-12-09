import Auth0Lock from "auth0-lock";

const TOKEN_STORAGE_KEY = "_authToken";
const USER_ID_STORAGE_KEY = "_userId";
const ROLES_STORAGE_KEY = "_roles";

const lock = new Auth0Lock(
  "mZeX1QFQKvmzwjZKYRcvmzYsO8d1Ygox",
  "community-expenses-dev.eu.auth0.com"
);

lock.on("authenticated", (authResult: AuthResult) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, authResult.idToken);
  localStorage.setItem(USER_ID_STORAGE_KEY, authResult.idTokenPayload.sub);

  const roles = (authResult.idTokenPayload as any)[
    "https://hasura.io/jwt/claims"
  ]["x-hasura-allowed-roles"];
  localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
});

export const showLock = () => {
  lock.show();
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_STORAGE_KEY);
};

export const getRoles = (): string[] => {
  return JSON.parse(localStorage.getItem(ROLES_STORAGE_KEY) || `["user"]`);
};

export const userHasRole = (role: string) => {
  const roles = getRoles();
  return roles.indexOf(role) !== -1;
};