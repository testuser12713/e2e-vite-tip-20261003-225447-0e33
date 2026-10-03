import type { FieldName } from '../types';

export function useTouchedFields(): {
  touched: Partial<Record<FieldName, boolean>>;
  markTouched: (field: FieldName) => void;
} {
  return {
    touched: {},
    markTouched: () => {},
  };
}
