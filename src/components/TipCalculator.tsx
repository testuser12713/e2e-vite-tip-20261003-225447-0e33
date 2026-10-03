import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { calculateTip } from '../calc';
import type { FieldName, RawInput } from '../types';
import { useTouchedFields } from '../hooks/useTouchedFields';
import { FieldErrors } from './FieldErrors';
import { ResultPanel } from './ResultPanel';

const INITIAL_INPUT: RawInput = { bill: '', tipPercent: '', people: '' };

export function TipCalculator(): JSX.Element {
  const [raw, setRaw] = useState<RawInput>(INITIAL_INPUT);
  const { touched, markTouched } = useTouchedFields();

  const outcome = calculateTip(raw);

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setRaw((previous) => ({ ...previous, [field]: nextValue }));
      markTouched(field);
    };

  return (
    <section className="calculator" aria-labelledby="calculator-title">
      <header className="calculator__header">
        <h1 className="calculator__title" id="calculator-title">
          Trinkgeld-Rechner
        </h1>
        <p className="calculator__subtitle">
          Rechnungsbetrag, Trinkgeld und Personenzahl — die Ergebnisse
          aktualisieren sich beim Tippen.
        </p>
      </header>

      <div className="calculator__fields">
        <div className="field-group">
          <label className="field-label" htmlFor="bill">
            Rechnungsbetrag
          </label>
          <div className="field-control">
            <input
              className="field-input"
              id="bill"
              name="bill"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={raw.bill}
              onChange={handleChange('bill')}
            />
            <span className="field-suffix" aria-hidden="true">
              €
            </span>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="tipPercent">
            Trinkgeld (%)
          </label>
          <div className="field-control">
            <input
              className="field-input"
              id="tipPercent"
              name="tipPercent"
              type="text"
              inputMode="decimal"
              placeholder="10"
              value={raw.tipPercent}
              onChange={handleChange('tipPercent')}
            />
            <span className="field-suffix" aria-hidden="true">
              %
            </span>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="people">
            Personenzahl
          </label>
          <div className="field-control">
            <input
              className="field-input"
              id="people"
              name="people"
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={raw.people}
              onChange={handleChange('people')}
            />
          </div>
        </div>
      </div>

      <FieldErrors
        errors={outcome.ok ? {} : outcome.errors}
        touched={touched}
      />

      <ResultPanel outcome={outcome} />
    </section>
  );
}
