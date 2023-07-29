import {
  amountAdd,
  amountDivide,
  amountEqualTo,
  amountGreaterThan,
  amountLessThan,
  amountMultiply,
  amountSubtract,
  createAmountFromRaw,
  createAmountFromString,
} from "./amountUtils.js";
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
const rmAmount = createAmountFromString(mockERC20, "52");
const uniAmount = UniswapCurrencyAmount.fromFractionalAmount(
  uniswapMockERC20,
  52,
  1,
);

describe("create amount from string", () => {
  bench("reverse mirage", () => {
    createAmountFromString(mockERC20, "52");
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromFractionalAmount(uniswapMockERC20, "52", 1);
  });
});

describe("create amount from raw", () => {
  bench("reverse mirage", () => {
    createAmountFromRaw(mockERC20, 1000000000000000000n);
  });

  bench("uniswap", () => {
    UniswapCurrencyAmount.fromRawAmount(
      uniswapMockERC20,
      "1000000000000000000",
    );
  });
});

describe("amount add", () => {
  bench("reverse mirage", () => {
    amountAdd(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.add(uniAmount);
  });
});

describe("amount subtract", () => {
  bench("reverse mirage", () => {
    amountSubtract(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.subtract(uniAmount);
  });
});

describe("amount multiply", () => {
  bench("reverse mirage", () => {
    amountMultiply(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.multiply(uniAmount);
  });
});

describe("amount divide", () => {
  bench("reverse mirage", () => {
    amountDivide(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.divide(uniAmount);
  });
});

describe("amount less than", () => {
  bench("reverse mirage", () => {
    amountLessThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.lessThan(uniAmount);
  });
});

describe("amount equalTo", () => {
  bench("reverse mirage", () => {
    amountEqualTo(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.equalTo(uniAmount);
  });
});

describe("amount greater than", () => {
  bench("reverse mirage", () => {
    amountGreaterThan(rmAmount, rmAmount);
  });
  bench("uniswap", () => {
    uniAmount.greaterThan(uniAmount);
  });
});
