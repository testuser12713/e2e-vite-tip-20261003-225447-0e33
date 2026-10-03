import type { CalcOutcome, FieldErrors, RawInput } from './types';

const NUMBER_PATTERN = /^-?\d+(?:\.\d+)?$/;

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return null;
  }
  const normalized = trimmed.replace(',', '.');
  if (!NUMBER_PATTERN.test(normalized)) {
    return null;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function calculateTip(input: RawInput): CalcOutcome {
  const errors: FieldErrors = {};

  const bill = parseNumber(input.bill);
  if (bill === null || bill < 0) {
    errors.bill = 'Rechnungsbetrag muss eine Zahl ≥ 0 sein.';
  }

  const tipPercent = parseNumber(input.tipPercent);
  if (tipPercent === null || tipPercent < 0) {
    errors.tipPercent = 'Trinkgeld (%) muss eine Zahl ≥ 0 sein.';
  }

  const people = parseNumber(input.people);
  if (people === null || !Number.isInteger(people) || people < 1) {
    errors.people = 'Personenzahl muss eine ganze Zahl ≥ 1 sein.';
  }

  if (
    Object.keys(errors).length > 0 ||
    bill === null ||
    tipPercent === null ||
    people === null
  ) {
    return { ok: false, errors };
  }

  const billCents = Math.round(bill * 100);
  const tipCents = Math.round((billCents * tipPercent) / 100);
  const totalCents = billCents + tipCents;
  const perPersonCents = Math.round(totalCents / people);

  return {
    ok: true,
    result: { tipCents, totalCents, perPersonCents },
  };
}

export function formatEuro(cents: number): string {
  const rounded = Math.round(cents);
  const sign = rounded < 0 ? '-' : '';
  const absolute = Math.abs(rounded);
  const euros = Math.floor(absolute / 100);
  const remainder = absolute % 100;
  const eurosWithSeparators = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimals = String(remainder).padStart(2, '0');
  return `${sign}${eurosWithSeparators},${decimals} €`;
}
