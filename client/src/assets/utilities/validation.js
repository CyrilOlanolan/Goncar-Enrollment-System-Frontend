export function validateContact(inputString) {
  let pattern = /(?:0|63)\d{10}/; /* ADD PATTERN HERE */
  let matcher = new RegExp(pattern, 'gm');

  return matcher.test(inputString);
}

export function validateBirthdate(inputString) {
  
  let pattern = / (?<MM>[0-3][0-9])\/(?<DD>[0-3]?[0-9])\/(?<YYYY>[0-2][0-9][0-9][0-9]) /;
  let matcher = new RegExp(pattern, 'gm');

  return matcher.test(inputString);
}

export function validateEmail(inputString) {
  
  let pattern = / ^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ /;
  let matcher = new RegExp(pattern, 'gm');

  return matcher.test(inputString);
}

export function validateSex(inputString) {
  
  let pattern = /^MALE$|^FEMALE$ /;
  let matcher = new RegExp(pattern, 'gm');

  return matcher.test(inputString)
}
