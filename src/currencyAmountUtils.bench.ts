import {
  currencyAmountAdd,
  currencyAmountDivide,
  currencyAmountEqualTo,
  currencyAmountGreaterThan,
  currencyAmountLessThan,
  currencyAmountMultiply,
  currencyAmountSubtract,
  makeCurrencyAmountFromRaw,
  makeCurrencyAmountFromString,
} from "./currencyAmountUtils.js";
import { mockERC20 } from "./test/constants.js";
import {
  CurrencyAmount as UniswapCurrencyAmount,
  Token as UniswapToken,
} from "@uniswap/sdk-core";
import { bench, describe } from "vitest";

const uniswapMockERC20 = new UniswapToken(
  mockERC20.chainID,
  mockERC20.address,
  mockERC20.decimals,
  mockERC20.name,
  mockERC20.symbol,
);
const rmAmount = makeCurrencyAmountFromString(mockERC20, "52");
const uniAmount = UniswapCurrencyAmount.fromFractionalAmount(
  uniswapMockERC20,
  52,
  1,
);

describe("create currency amount from string", () => {
  bench("reverse mirage", () => {
    makeCurrencyAmountFromString(mockERC20, "52");
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromFractionalAmount(uniswapMockERC20, "52", 1);
  });
});

describe("create currency amount from raw", () => {
  bench("reverse mirage", () => {
    makeCurrencyAmountFromRaw(mockERC20, 1000000000000000000n);
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromRawAmount(
      uniswapMockERC20,
      "1000000000000000000",
    );
  });
});

describe("currency amount add", () => {
  bench("reverse mirage", () => {
    currencyAmountAdd(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.add(uniAmount);
  });
});

describe("currency amount subtract", () => {
  bench("reverse mirage", () => {
    currencyAmountSubtract(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.subtract(uniAmount);
  });
});

describe("currency amount multiply", () => {
  bench("reverse mirage", () => {
    currencyAmountMultiply(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.multiply(uniAmount);
  });
});

describe("currency amount divide", () => {
  bench("reverse mirage", () => {
    currencyAmountDivide(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.divide(uniAmount);
  });
});

describe("currency amount less than", () => {
  bench("reverse mirage", () => {
    currencyAmountLessThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.lessThan(uniAmount);
  });
});

describe("currency amount equalTo", () => {
  bench("reverse mirage", () => {
    currencyAmountEqualTo(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.equalTo(uniAmount);
  });
});

describe("currency amount greater than", () => {
  bench("reverse mirage", () => {
    currencyAmountGreaterThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.greaterThan(uniAmount);
  });
});
