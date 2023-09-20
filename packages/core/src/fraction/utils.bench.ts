import { Fraction } from "@uniswap/sdk-core";
import { bench, group, run } from "mitata";
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
  fractionToNumber,
} from "./utils.js";

const rmFraction = createFraction(5, 2);
const uniFraction = new Fraction(5, 2);

group("create fraction", () => {
  bench("reverse mirage", () => {
    createFraction(52, 1);
  });

  bench("uniswap", () => {
    new Fraction(52, 1);
  });
});

group("fraction quotient", () => {
  bench("reverse mirage", () => {
    fractionQuotient(rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.quotient;
  });
});

group("fraction remainder", () => {
  bench("reverse mirage", () => {
    fractionRemainder(rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.remainder;
  });
});

group("fraction add", () => {
  bench("reverse mirage", () => {
    fractionAdd(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.add(uniFraction);
  });
});

group("fraction subtract", () => {
  bench("reverse mirage", () => {
    fractionSubtract(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.subtract(uniFraction);
  });
});

group("fraction multiply", () => {
  bench("reverse mirage", () => {
    fractionMultiply(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.multiply(uniFraction);
  });
});

group("fraction divide", () => {
  bench("reverse mirage", () => {
    fractionDivide(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.divide(uniFraction);
  });
});

group("fraction less than", () => {
  bench("reverse mirage", () => {
    fractionLessThan(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.lessThan(uniFraction);
  });
});

group("fraction equal to", () => {
  bench("reverse mirage", () => {
    fractionEqualTo(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.equalTo(uniFraction);
  });
});

group("fraction greater than", () => {
  bench("reverse mirage", () => {
    fractionGreaterThan(rmFraction, rmFraction);
  });

  bench("uniswap", () => {
    uniFraction.greaterThan(uniFraction);
  });
});

group("fraction to fixed", () => {
  bench("reverse mirage", () => {
    fractionToNumber(rmFraction).toFixed(2);
  });
  bench("uniswap", () => {
    uniFraction.toFixed(2);
  });
});

group("fraction to significant", () => {
  bench("reverse mirage", () => {
    fractionToNumber(rmFraction).toPrecision(2);
  });
  bench("uniswap", () => {
    uniFraction.toSignificant(2);
  });
});

await run();
