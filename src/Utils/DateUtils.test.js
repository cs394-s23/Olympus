import {describe, expect, test} from 'vitest';
import {parseDate} from './DateUtils';

describe('Date utils tests', () => {
  test("parseDate", () => {
    let testDate = "6/22/2002"
    let testOutput = parseDate(testDate);

    expect(testOutput.getDate()).toBe(22);
    expect(testOutput.getMonth()).toBe(5)  // Only months start at 0 in JS...
    expect(testOutput.getFullYear()).toBe(2002);

    let testDate2 = "11/3/0021"
    let testOutput2 = parseDate(testDate2);
    // console.log(testOutput2);
    expect(testOutput2.getDate()).toBe(3);
    expect(testOutput2.getMonth()).toBe(10)  // Only months start at 0 in JS...
    expect(testOutput2.getFullYear()).toBe(21);

    expect(testOutput2.getDate()).not.toBe(4);
    expect(testOutput2.getMonth()).not.toBe(12)  // Only months start at 0 in JS...
    expect(testOutput2.getFullYear()).not.toBe(24);
    
  });
})
