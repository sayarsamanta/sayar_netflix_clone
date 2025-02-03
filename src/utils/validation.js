export function validEmail(email) {
  const isValid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  return isValid;
}

export function validPassword(password) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}
