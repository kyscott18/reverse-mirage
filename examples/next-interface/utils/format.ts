export function whatDecimalSeparator() {
  const n = 1.1;
  return n.toLocaleString().substring(1, 2);
}

export function whatSeparator() {
  const n = 1000;
  const separator = n.toLocaleString().substring(1, 2);

  return Number.isInteger(separator) ? "" : separator;
}
