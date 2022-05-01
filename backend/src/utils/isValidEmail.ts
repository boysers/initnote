export default function isValidEmail(email: string): boolean {
  const regexEmail =
    /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  return email.match(regexEmail) ? true : false
}
