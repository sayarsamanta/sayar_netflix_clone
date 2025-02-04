import { redirect } from "react-router-dom";
export const profileImage =
  "https://occ-0-3777-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("data");
  if (token) throw redirect("/");
  return null;
};
