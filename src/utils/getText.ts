import { enCharset } from '../configs';

export function getText(length = 10, charset = enCharset) {
  let text = '';
  for (let i = 0; i < length; i += 1) {
    const charAt = Math.floor(Math.random() * charset.length);
    text += charset[charAt];
  }
  return text;
}
