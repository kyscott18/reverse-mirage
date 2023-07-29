import {
  createFraction,
  fractionAdd,
  fractionDivide,
  fractionEqualTo,
  fractionGreaterThan,
  fractionLessThan,
  fractionMultiply,
  fractionQuotient,
  fractionRemainder,
  fractionSubtract,
} from "./fractionUtils.js";
import { Fraction } from "@uniswap/sdk-core";
import { bench, describe } from "vitest";

const rmFraction = createFraction(5, 2);
const uniFraction = new Fraction(5, 2);

describe("create fraction", () => {
  bench("reverse mirage", () => {
    createFraction(52, 1);
  });

  bench("uniswap", () => {
    new Fraction(52, 1);
  });
});

describe("fraction quotient", () => {
  bench("reverse mirage", () => {
    fractionQuotient(rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.quotient;
  });
});

describe("fraction remainder", () => {
  bench("reverse mirage", () => {
    fractionRemainder(rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.remainder;
  });
});

describe("fraction add", () => {
  bench("reverse mirage", () => {
    fractionAdd(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.add(uniFraction);
  });
});

describe("fraction subtract", () => {
  bench("reverse mirage", () => {
    fractionSubtract(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.subtract(uniFraction);
  });
});

describe("fraction multiply", () => {
  bench("reverse mirage", () => {
    fractionMultiply(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.multiply(uniFraction);
  });
});

describe("fraction divide", () => {
  bench("reverse mirage", () => {
    fractionDivide(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.divide(uniFraction);
  });
});

describe("fraction less than", () => {
  bench("reverse mirage", () => {
    fractionLessThan(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.lessThan(uniFraction);
  });
});

describe("fraction equal to", () => {
  bench("reverse mirage", () => {
    fractionEqualTo(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.equalTo(uniFraction);
  });
});

describe("fraction greater than", () => {
  bench("reverse mirage", () => {
    fractionGreaterThan(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.greaterThan(uniFraction);
  });
});
