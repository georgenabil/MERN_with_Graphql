export const getJwt = () => {
  return "bearer " + localStorage.getItem("JWT");
};
