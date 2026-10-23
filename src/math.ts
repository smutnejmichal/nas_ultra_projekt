/**
 * Spočítá procentuální část z celku.
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) {
    throw new Error("Celková hodnota (total) nesmí být nula.");
  }
  return (value / total) * 100;
}

/**
 * Vybere náhodný prvek z pole s typovou bezpečností.
 */
export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}