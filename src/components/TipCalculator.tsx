import { useTouchedFields } from '../hooks/useTouchedFields';
import { FieldErrors } from './FieldErrors';
import { ResultPanel } from './ResultPanel';

export function TipCalculator(): JSX.Element {
  const { touched } = useTouchedFields();

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
              value=""
              readOnly
              disabled
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
              value=""
              readOnly
              disabled
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
              value=""
              readOnly
              disabled
            />
          </div>
        </div>
      </div>

      <FieldErrors errors={{}} touched={touched} />

      <ResultPanel outcome={{ ok: false, errors: {} }} />
    </section>
  );
}
