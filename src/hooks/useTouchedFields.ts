import { useCallback, useState } from 'react';
import type { FieldName } from '../types';

export function useTouchedFields(): {
  touched: Partial<Record<FieldName, boolean>>;
  markTouched: (field: FieldName) => void;
} {
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const markTouched = useCallback((field: FieldName) => {
    setTouched((current) =>
      current[field] === true ? current : { ...current, [field]: true },
    );
  }, []);

  return { touched, markTouched };
}
