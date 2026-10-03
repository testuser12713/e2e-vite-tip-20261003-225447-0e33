import type { CalcOutcome, RawInput } from './types';

export function calculateTip(input: RawInput): CalcOutcome {
  return { ok: false, errors: {} };
}

export function formatEuro(cents: number): string {
  return '';
}
