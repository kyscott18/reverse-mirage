/**
 * @warning For end-user display purposes only. It loses precision and does rounding
 *
 * There is padding
 *
 * If (Whole number digits > softMaximumSignificantDigits)
 *   Rounds to whole number towards 0
 * Otherwise
 *   Defaults to token.decimals, but respects numberFormatOptions as an override
 *
 * Example for softMaximumSignificantDigits = 7 and token with 6 maxDigits
 *
 * 1234.87654321 => 1234.876 (7 significant figures)
 * 1234567.87654321 => 1234567 (rounded down)
 * 123456789.321 => 123456789
 * 1.87654321 => 1.876543
 */
export const formatDisplayWithSoftLimit = (
  float: number,
  maxDecimals: number,
  softMaximumSignificantDigits = 7,
  numberFormatOptions?: Intl.NumberFormatOptions,
  locale?: string,
): string => {
  if (
    Number.isNaN(softMaximumSignificantDigits) ||
    softMaximumSignificantDigits <= 0
  ) {
    throw new Error("softMaximumSignificantDigits must be greater than 0");
  }

  // Round to integer if there are enough whole digits
  const dropDecimalsAfter = Math.pow(10, softMaximumSignificantDigits - 1);

  if (float >= dropDecimalsAfter) {
    // Round down to display integer amount
    const wholeNumberFormatOptions: Intl.NumberFormatOptions = Object.assign(
      {},
      numberFormatOptions,
      {
        maximumFractionDigits: 0,
      },
    );
    return Math.floor(float).toLocaleString(locale, wholeNumberFormatOptions);
  }

  // Round to maxDecimals if too small
  const sigDerivedDigitsOnRight =
    softMaximumSignificantDigits - Math.floor(Math.log10(float)) - 1;

  const digitsOnRight = Math.min(maxDecimals, sigDerivedDigitsOnRight);
  const flooredToPrecision =
    Math.floor(float * 10 ** digitsOnRight) / 10 ** digitsOnRight;

  const maxFormatOptions: Intl.NumberFormatOptions = Object.assign(
    {
      minimumFractionDigits: digitsOnRight,
      maximumFractionDigits: digitsOnRight,
    },
    numberFormatOptions,
  );
  return flooredToPrecision.toLocaleString(locale, maxFormatOptions);
};

export function whatDecimalSeparator() {
  const n = 1.1;
  return n.toLocaleString().substring(1, 2);
}

export function whatSeparator() {
  const n = 1000;
  const separator = n.toLocaleString().substring(1, 2);

  return Number.isInteger(separator) ? "" : separator;
}
