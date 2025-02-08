import { redirect } from "react-router-dom";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("data");
  if (token) throw redirect("/");
  return null;
};

export const time_convert = (num) => {
  // Calculate the number of hours by dividing num by 60 and rounding down
  var hours = Math.floor(num / 60);

  // Calculate the remaining minutes by taking the remainder when dividing num by 60
  var minutes = num % 60;

  // Return the result as a string in the format "hours:minutes"
  return hours + "h" + minutes + "m";
};
