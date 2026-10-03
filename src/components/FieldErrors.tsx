import type { FieldErrors as FieldErrorsMap, FieldName } from '../types';

const FIELD_ORDER: FieldName[] = ['bill', 'tipPercent', 'people'];

export function FieldErrors(props: {
  errors: FieldErrorsMap;
  touched: Partial<Record<FieldName, boolean>>;
}): JSX.Element {
  const { errors, touched } = props;

  const shown = FIELD_ORDER.filter(
    (field) => touched[field] === true && Boolean(errors[field]),
  );

  return (
    <div className="field-errors" aria-live="polite">
      {shown.map((field) => (
        <p className="field-error" key={field} role="alert">
          <span className="field-error__glyph" aria-hidden="true">
            !
          </span>
          <span className="field-error__text">{errors[field]}</span>
        </p>
      ))}
    </div>
  );
}
