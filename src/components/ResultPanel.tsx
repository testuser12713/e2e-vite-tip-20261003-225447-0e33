import { formatEuro } from '../calc';
import type { CalcOutcome } from '../types';

export function ResultPanel(props: { outcome: CalcOutcome }): JSX.Element {
  const { outcome } = props;
  const hasResult = outcome.ok;
  const hasErrors = !outcome.ok && Object.keys(outcome.errors).length > 0;

  const tipValue = hasResult
    ? formatEuro(outcome.result.tipCents)
    : formatEuro(0);
  const totalValue = hasResult
    ? formatEuro(outcome.result.totalCents)
    : formatEuro(0);
  const perPersonValue = hasResult
    ? formatEuro(outcome.result.perPersonCents)
    : formatEuro(0);

  const valueClass = hasResult
    ? 'result-row__value'
    : 'result-row__value is-placeholder';

  return (
    <section className="results" aria-label="Ergebnisse">
      <h2 className="results__heading">Ergebnisse</h2>
      {!hasErrors && (
        <div className="results__rows">
          <div className="result-row">
            <span className="result-row__label">Trinkgeld</span>
            <span className={valueClass}>{tipValue}</span>
          </div>
          <div className="result-row">
            <span className="result-row__label">Gesamtbetrag</span>
            <span className={valueClass}>{totalValue}</span>
          </div>
          <div className="result-row result-row--emphasis">
            <span className="result-row__label">Pro Person</span>
            <span className={valueClass}>{perPersonValue}</span>
          </div>
        </div>
      )}
      {hasErrors && (
        <p className="results__notice" role="status" aria-live="polite">
          Behebe das markierte Feld, um die Ergebnisse zu sehen.
        </p>
      )}
      <p className="status-line">Aktualisiert sich während der Eingabe.</p>
    </section>
  );
}
