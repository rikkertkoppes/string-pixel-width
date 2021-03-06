import _ from 'lodash';
import widthsMap from './widthsMap';

const settingsDefaults = { font: 'Arial', size: 100 };

const toAscii = string => _.deburr(string);

const getWidth = (string, settings) => {
  const sett = { ...settingsDefaults, ...settings };
  const font = sett.font.toLowerCase();
  const size = sett.size;
  if (font !== 'arial') {
    throw new Error('The only supported string is Arial only at this time.');
  }
  let totalWidth = 0;
  toAscii(string).split('').forEach((char) => {
    if (/[\x00-\x1F]/.test(char)) { // non-printable character
      return true;
    }
    const width = widthsMap[font][char];
    totalWidth += width;
    return true;
  });
  return totalWidth * (size / 100);
};

export default getWidth;
