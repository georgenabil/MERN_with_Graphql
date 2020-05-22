export const getJwt = () => {
  return "bearer " + localStorage.getItem("JWT");
};

export const currentuser = () => {
  return sessionStorage.getItem("currentuser");
};
