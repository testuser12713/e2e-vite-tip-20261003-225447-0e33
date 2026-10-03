import { formatEuro } from '../calc';
import type { CalcOutcome } from '../types';

const DASH = '—';

export function ResultPanel(props: { outcome: CalcOutcome }): JSX.Element {
  const { outcome } = props;

  const tipValue = outcome.ok ? formatEuro(outcome.result.tipCents) : DASH;
  const totalValue = outcome.ok ? formatEuro(outcome.result.totalCents) : DASH;
  const perPersonValue = outcome.ok
    ? formatEuro(outcome.result.perPersonCents)
    : DASH;

  return (
    <section className="results" aria-label="Ergebnisse">
      <h2 className="results__heading">Ergebnisse</h2>
      <div className="results__rows">
        <div className="result-row">
          <span className="result-row__label">Trinkgeld</span>
          <span className="result-row__value">{tipValue}</span>
        </div>
        <div className="result-row">
          <span className="result-row__label">Gesamt</span>
          <span className="result-row__value">{totalValue}</span>
        </div>
        <div className="result-row result-row--emphasis">
          <span className="result-row__label">pro Person</span>
          <span className="result-row__value">{perPersonValue}</span>
        </div>
      </div>
    </section>
  );
}
