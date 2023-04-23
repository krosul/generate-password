interface Props {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
const getStrength = ({length, lowercase, numbers, symbols, uppercase}: Props): number[] => {
  //   console.log({uppercase});
  let strength = [1, 1, 1, 1];
  if (length > 4) {
    strength.unshift(0);
    strength.pop();
  }
  if (length > 6) {
    strength.unshift(0);
    strength.pop();
  }
  if (uppercase) {
    strength.unshift(0);
    strength.pop();
  }
  if (symbols) {
    strength.unshift(0);
    strength.pop();
  }
  if (numbers) {
    strength.unshift(0);
    strength.pop();
  }
  if (length <= 2) {
    strength = strength.map(() => 1);
  }
  return strength;
};

export default getStrength;
