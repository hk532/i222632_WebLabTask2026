function cleanUsername(name) {
  let cleaned = name.trim().toLowerCase();
  cleaned = cleaned.replace(/\s+/g, '_');
  return cleaned;
}

console.log(cleanUsername(" AHMAD_kHan123 "));
console.log(cleanUsername("  humair  "));

function validateUsername(name) {
  if (name.length < 5 || name.length > 20) return false;
  if (!/[a-zA-Z]/.test(name.charAt(0))) return false;
  if (!/^[a-zA-Z0-9_]+$/.test(name)) return false;
  return true;
}

console.log(validateUsername("ahmad_khan123"));
console.log(validateUsername("1ahmad"));
console.log(validateUsername("ah"));
console.log(validateUsername("ahmad@123"));