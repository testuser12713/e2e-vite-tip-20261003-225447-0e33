# Trinkgeld-Rechner

Eine kleine Single-Page-Web-App, mit der man Rechnungsbetrag, Trinkgeld-Prozentsatz und Personenzahl eingibt und sofort sieht, wie viel Trinkgeld fällig ist, welchen Gesamtbetrag die Rechnung ergibt und wie viel jede Person bezahlt. Die Rechenlogik liegt in einer reinen Funktion ohne React- oder DOM-Abhängigkeit und rechnet durchgängig in ganzen Cent, sodass die angezeigten Geldbeträge immer kaufmännisch gerundet und auf zwei Nachkommastellen formatiert sind.

## Tech-Stack

- **Sprache:** TypeScript
- **Framework:** React
- **Bundler:** Vite
- **Tests:** Vitest
- **Paketmanager:** npm
- **Laufzeit:** Browser, vollständig clientseitig

## Installation

Voraussetzung: Node.js 20.19+ (oder 22.12+) und npm.

```bash
npm ci
```

## Entwicklung starten

```bash
npm run dev
```

Vite startet einen Entwicklungsserver (standardmäßig unter `http://localhost:5173`) und öffnet die App hot-reloading im Browser.

## Produktions-Build

```bash
npm run build
```

Der Befehl typecheckt zuerst das Projekt mit `tsc` und erzeugt anschließend den optimierten Build im Ordner `dist/`. Diesen Build kann man lokal mit `npm run preview` (Port `4173`) ansehen.

## Tests

```bash
npm test
```

Führt die Vitest-Suite einmalig aus.

## Verwendung

1. **Rechnungsbetrag** eintragen, z. B. `100,00` (Komma oder Punkt als Dezimaltrennzeichen).
2. **Trinkgeld (%)** eintragen, z. B. `10`.
3. **Personenzahl** eintragen, z. B. `2`.

Die drei Ergebniszeilen **Trinkgeld**, **Gesamt** und **pro Person** aktualisieren sich live bei jeder Eingabe — es gibt keinen Berechnen-Knopf. Solange noch kein gültiges Ergebnis vorliegt, zeigen die Zeilen einen Platzhalter statt eines Geldwerts. Eine ungültige Eingabe (z. B. negativer Betrag, Text bei Prozent oder Personenzahl `0`) wird pro Feld mit einer Fehlermeldung angezeigt.

## Funktionen

- Live-Berechnung von Trinkgeld, Gesamtbetrag und Betrag pro Person
- Rechnen in ganzen Cent, dadurch konsistente Rundung auf zwei Nachkommastellen
- Deutsche Geldformatierung (`10,00 €`, Tausenderpunkt, Dezimalkomma)
- Aufteilung des Gesamtbetrags auf die angegebene Personenzahl
- Inline-Validierung mit feldbezogenen Fehlermeldungen
- Einspaltiges, responsives Layout, das bis 320 px Breite nutzbar bleibt
