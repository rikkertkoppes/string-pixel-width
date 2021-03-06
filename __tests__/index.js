import index from '../src/index';

test('test basic', () => {
  expect(index('test string')).toBe(435);
});

test('test basic with settings', () => {
  expect(index('test string', { size: 10 })).toBe(43.5);
});

test('test diacritic', () => {
  const lengthWithDiacritics = index('test ěščřžýáíé');
  const lengthWithoutDiacritics = index('test escrzyaie');
  expect(lengthWithDiacritics).toBe(lengthWithoutDiacritics);
});

test('test non-printable chars', () => {
  // LF, NULL byte, ESC
  const string = `${String.fromCharCode(10)}${String.fromCharCode(0)}${String.fromCharCode(27)}`;
  expect(index(string)).toBe(0);
});

test('test non-existing font', () => {
  expect(() => {
    index('foo', { font: 'bar' });
  }).toThrow();
});
