import { numberWithCommas } from '..';

describe('numberWithCommas', () => {
  test('convert decimal numbers to a string separated with commas', () => {
    expect(numberWithCommas(8.8)).toBe('8,8');
    expect(numberWithCommas(102.12)).toBe('102,12');
  });
});
