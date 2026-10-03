import { describe, expect, it } from 'vitest';
import { calculateTip, formatEuro } from './calc';
import type { RawInput } from './types';

function input(bill: string, tipPercent: string, people: string): RawInput {
  return { bill, tipPercent, people };
}

describe('calculateTip – valid calculation', () => {
  it('computes tip, total and per-person for 100 / 10 / 2', () => {
    const outcome = calculateTip(input('100', '10', '2'));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.tipCents).toBe(1000);
      expect(outcome.result.totalCents).toBe(11000);
      expect(outcome.result.perPersonCents).toBe(5500);
    }
  });

  it('formats the 100 / 10 / 2 result as German euro values', () => {
    const outcome = calculateTip(input('100', '10', '2'));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(formatEuro(outcome.result.tipCents)).toBe('10,00 €');
      expect(formatEuro(outcome.result.totalCents)).toBe('110,00 €');
      expect(formatEuro(outcome.result.perPersonCents)).toBe('55,00 €');
    }
  });

  it('accepts a comma as decimal separator', () => {
    const outcome = calculateTip(input('99,50', '10', '1'));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.tipCents).toBe(995);
      expect(outcome.result.totalCents).toBe(10945);
      expect(outcome.result.perPersonCents).toBe(10945);
    }
  });
});

describe('calculateTip – rounding to whole cents', () => {
  it('rounds 99,99 with 17,5 % and 3 persons to whole cents', () => {
    const outcome = calculateTip(input('99,99', '17,5', '3'));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      // billCents 9999, tip = round(9999 * 17.5 / 100) = 1750
      expect(outcome.result.tipCents).toBe(1750);
      expect(outcome.result.totalCents).toBe(11749);
      // round(11749 / 3) = 3916
      expect(outcome.result.perPersonCents).toBe(3916);
    }
  });
});

describe('calculateTip – per-person split', () => {
  it('splits the total across the given number of people', () => {
    const outcome = calculateTip(input('50', '20', '4'));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.result.tipCents).toBe(1000);
      expect(outcome.result.totalCents).toBe(6000);
      expect(outcome.result.perPersonCents).toBe(1500);
    }
  });
});

describe('calculateTip – determinism', () => {
  it('returns identical output for identical input', () => {
    const a = calculateTip(input('42,42', '12,5', '3'));
    const b = calculateTip(input('42,42', '12,5', '3'));
    expect(a).toEqual(b);
    expect(a.ok).toBe(true);
  });
});

describe('calculateTip – invalid input', () => {
  it('rejects a negative bill', () => {
    const outcome = calculateTip(input('-5', '10', '2'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.bill).toBeTruthy();
      expect(outcome.errors.tipPercent).toBeUndefined();
      expect(outcome.errors.people).toBeUndefined();
    }
  });

  it('rejects a non-numeric bill', () => {
    const outcome = calculateTip(input('abc', '10', '2'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.bill).toBeTruthy();
    }
  });

  it('rejects a negative percent', () => {
    const outcome = calculateTip(input('100', '-1', '2'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.tipPercent).toBeTruthy();
      expect(outcome.errors.bill).toBeUndefined();
    }
  });

  it('rejects a non-numeric percent', () => {
    const outcome = calculateTip(input('100', 'abc', '2'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.tipPercent).toBeTruthy();
    }
  });

  it('rejects people = 0', () => {
    const outcome = calculateTip(input('100', '10', '0'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.people).toBeTruthy();
    }
  });

  it('rejects people = -1', () => {
    const outcome = calculateTip(input('100', '10', '-1'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.people).toBeTruthy();
    }
  });

  it('rejects people = 2,5', () => {
    const outcome = calculateTip(input('100', '10', '2,5'));
    expect(outcome.ok).toBe(false);
    if (!outcome.ok) {
      expect(outcome.errors.people).toBeTruthy();
    }
  });
});

describe('formatEuro', () => {
  it('always uses exactly two decimals and the euro sign', () => {
    expect(formatEuro(0)).toBe('0,00 €');
    expect(formatEuro(1000)).toBe('10,00 €');
    expect(formatEuro(5)).toBe('0,05 €');
    expect(formatEuro(100000000)).toBe('1.000.000,00 €');
  });
});
