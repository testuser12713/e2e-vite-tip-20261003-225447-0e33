import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { calculateTip } from '../calc';
import { ResultPanel } from './ResultPanel';

const NOTICE = 'Behebe das markierte Feld, um die Ergebnisse zu sehen.';

describe('ResultPanel – neutral (untouched) state', () => {
  it('shows the three 0,00 € placeholder rows and no notice', () => {
    const outcome = calculateTip({ bill: '', tipPercent: '', people: '' });
    const html = renderToStaticMarkup(
      <ResultPanel outcome={outcome} touched={{}} />,
    );
    expect(html).toContain('0,00 €');
    expect(html).not.toContain(NOTICE);
    expect(html).toContain('is-placeholder');
    expect(html).toContain('Gesamtbetrag');
    expect(html).toContain('Pro Person');
  });

  it('keeps the neutral rows when only an untouched empty field is erroneous', () => {
    const outcome = calculateTip({ bill: '100', tipPercent: '', people: '' });
    const html = renderToStaticMarkup(
      <ResultPanel outcome={outcome} touched={{ bill: true }} />,
    );
    expect(html).toContain('0,00 €');
    expect(html).not.toContain(NOTICE);
  });
});

describe('ResultPanel – invalid (touched error) state', () => {
  it('shows only the notice, never a money value, for a touched negative bill', () => {
    const outcome = calculateTip({ bill: '-5', tipPercent: '10', people: '2' });
    const html = renderToStaticMarkup(
      <ResultPanel outcome={outcome} touched={{ bill: true }} />,
    );
    expect(html).toContain(NOTICE);
    expect(html).not.toContain('€');
    expect(html).not.toContain('is-placeholder');
  });
});

describe('ResultPanel – valid state', () => {
  it('shows the real euro values and no notice', () => {
    const outcome = calculateTip({ bill: '100', tipPercent: '10', people: '2' });
    const html = renderToStaticMarkup(
      <ResultPanel outcome={outcome} touched={{ bill: true }} />,
    );
    expect(html).toContain('10,00 €');
    expect(html).toContain('110,00 €');
    expect(html).toContain('55,00 €');
    expect(html).not.toContain(NOTICE);
    expect(html).not.toContain('is-placeholder');
  });
});
