// authUtils.ts
export const getTokenFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return null;
  }

  const user: UserType = JSON.parse(userData);
  if (!user) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (user.expirationTime < currentTimestamp + 300) {
    return null;
  }

  return user.token;
};
