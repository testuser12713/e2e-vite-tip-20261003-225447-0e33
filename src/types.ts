export type RawInput = {
  bill: string;
  tipPercent: string;
  people: string;
};

export type FieldName = 'bill' | 'tipPercent' | 'people';

export type FieldErrors = Partial<Record<FieldName, string>>;

export type TipResult = {
  tipCents: number;
  totalCents: number;
  perPersonCents: number;
};

export type CalcOutcome =
  | { ok: true; result: TipResult }
  | { ok: false; errors: FieldErrors };
