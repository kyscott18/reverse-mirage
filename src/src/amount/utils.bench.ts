import {
  CurrencyAmount as UniswapCurrencyAmount,
  Token as UniswapToken,
} from "@uniswap/sdk-core";
import { bench, group, run } from "mitata";
import { zeroAddress } from "viem";
import { mockToken } from "../_test/constants.js";
import {
  amountAdd,
  amountDivide,
  amountEqualTo,
  amountGreaterThan,
  amountLessThan,
  amountMultiply,
  amountSubtract,
  amountToNumber,
  createAmountFromRaw,
  createAmountFromString,
} from "./utils.js";

const uniswapMockERC20 = new UniswapToken(
  mockToken.chainID,
  zeroAddress,
  18,
  "name",
  "symbol",
);
const rmAmount = createAmountFromString(mockToken, "52");
const uniAmount = UniswapCurrencyAmount.fromFractionalAmount(
  uniswapMockERC20,
  52,
  1,
);

group("create amount from string", () => {
  bench("reverse mirage", () => {
    createAmountFromString(mockToken, "52");
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromFractionalAmount(uniswapMockERC20, "52", 1);
  });
});

group("create amount from raw", () => {
  bench("reverse mirage", () => {
    createAmountFromRaw(mockToken, 1000000000000000000n);
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromRawAmount(
      uniswapMockERC20,
      "1000000000000000000",
    );
  });
});

group("amount add", () => {
  bench("reverse mirage", () => {
    amountAdd(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.add(uniAmount);
  });
});

group("amount subtract", () => {
  bench("reverse mirage", () => {
    amountSubtract(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.subtract(uniAmount);
  });
});

group("amount multiply", () => {
  bench("reverse mirage", () => {
    amountMultiply(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.multiply(uniAmount);
  });
});

group("amount divide", () => {
  bench("reverse mirage", () => {
    amountDivide(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.divide(uniAmount);
  });
});

group("amount less than", () => {
  bench("reverse mirage", () => {
    amountLessThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.lessThan(uniAmount);
  });
});

group("amount equalTo", () => {
  bench("reverse mirage", () => {
    amountEqualTo(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.equalTo(uniAmount);
  });
});

group("amount greater than", () => {
  bench("reverse mirage", () => {
    amountGreaterThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.greaterThan(uniAmount);
  });
});

group("amount to number", () => {
  bench("reverse mirage", () => {
    amountToNumber(rmAmount);
  });
  bench("uniswap", () => {
    +uniAmount.toExact();
  });
});

group("amount to fixed", () => {
  bench("reverse mirage", () => {
    amountToNumber(rmAmount).toFixed(2);
  });
  bench("uniswap", () => {
    uniAmount.toFixed(2);
  });
});

group("amount to significant", () => {
  bench("reverse mirage", () => {
    amountToNumber(rmAmount).toPrecision(2);
  });
  bench("uniswap", () => {
    uniAmount.toSignificant(2);
  });
});

await run();
