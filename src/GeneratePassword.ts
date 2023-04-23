interface FormData {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
type prop = FormData;
const caracteresWithNumbers = 'abcdefghijklmnopqrstuvwxyz0123456789';
const caracteresOnlyLetters = 'abcdefghijklmnopqrstuvwxyz';
const generatePassword = (options: prop) => {
  const {length, lowercase, numbers, symbols, uppercase} = options;
  let caracteres = numbers ? caracteresWithNumbers : caracteresOnlyLetters;
  if (symbols) {
    caracteres += '|@#~€)¬(/*-+._-<>¿?';
  }
  let passwordGenerated = '';
  for (let i = 0; i < length; i++) {
    let toAdd = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    if (uppercase) {
      const flag = Math.floor((Math.random() * 10) / 5);
      toAdd = flag ? toAdd.toUpperCase() : toAdd;
    }
    passwordGenerated += toAdd;
  }
  return passwordGenerated;
};
export default generatePassword;
