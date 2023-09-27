import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Reverse Mirage",
  description: "Application level typescript utilities for Ethereum",
  head: [
    ["script", { src: "https://cdn.vercel-insights.com/v1/script.debug.js" }],
  ],
  themeConfig: {
    search: {
      provider: "local",
    },

    sidebar: [
      { text: "Introduction", link: "/" },
      {
        text: "Overview",
        items: [
          { text: "Getting started", link: "/start" },
          { text: "Benchmarks", link: "/benchmark" },
          { text: "Examples", link: "/example" },
        ],
      },
      {
        text: "ERC20",
        collapsed: true,
        items: [
          {
            text: "Utilities",
            items: [
              {
                text: "createERC20",
                link: "/erc20/createERC20",
              },
              {
                text: "createERC20Amount",
                link: "",
              },
              {
                text: "createERC20Permit",
                link: "",
              },
              {
                text: "createERC20PermitData",
                link: "",
              },
            ],
          },
          {
            text: "Public Actions",
            items: [
              {
                text: "getERC20BalanceOf",
                link: "",
              },
              {
                text: "getERC20Allowance",
                link: "",
              },
              {
                text: "getERC20TotalSupply",
                link: "",
              },
              {
                text: "getERC20Name",
                link: "",
              },
              {
                text: "getERC20Symbol",
                link: "",
              },
              {
                text: "getERC20Decimals",
                link: "",
              },
              {
                text: "getERC20PermitNonce",
                link: "",
              },
              {
                text: "getERC20PermitData",
                link: "",
              },
              {
                text: "getERC20PermitDomainSeparator",
                link: "",
              },
              {
                text: "getERC20",
                link: "",
              },
              {
                text: "getERC20Permit",
                link: "",
              },
              {
                text: "getIsERC20Permit",
                link: "",
              },
            ],
          },
          {
            text: "Wallet Actions",
            items: [
              {
                text: "writeERC20Transfer",
                link: "",
              },
              {
                text: "writeERC20Approve",
                link: "",
              },
              {
                text: "writeERC20TransferFrom",
                link: "",
              },
              {
                text: "writeERC20Permit",
                link: "",
              },
              {
                text: "signERC20Permit",
                link: "",
              },
            ],
          },
        ],
      },
      {
        text: "Native",
        collapsed: true,
        items: [
          {
            text: "Utilities",
            items: [
              {
                text: "createNativeCurrency",
                link: "",
              },
            ],
          },
          {
            text: "Public Actions",
            items: [
              {
                text: "getNativeBalance",
                link: "",
              },
            ],
          },
        ],
      },
      {
        text: "WETH",
        collapsed: true,
        items: [
          {
            text: "Utilities",
            items: [
              {
                text: "createWETH",
                link: "",
              },
            ],
          },
          {
            text: "Wallet Actions",
            items: [
              {
                text: "writeWETHDeposit",
                link: "",
              },
              {
                text: "writeWETHWithdraw",
                link: "",
              },
            ],
          },
        ],
      },
      {
        text: "ERC721",
        collapsed: true,
        items: [
          {
            text: "Utilities",
            items: [
              {
                text: "createERC721",
                link: "",
              },
              {
                text: "createERC721Data",
                link: "",
              },
            ],
          },
          {
            text: "Public Actions",
            items: [
              {
                text: "getERC721",
                link: "",
              },
              {
                text: "getERC721Approved",
                link: "",
              },
              {
                text: "getERC721IsApprovedForAll",
                link: "",
              },
              {
                text: "getERC721BalanceOf",
                link: "",
              },
              {
                text: "getERC721Name",
                link: "",
              },
              {
                text: "getERC721Symbol",
                link: "",
              },
              {
                text: "getERC721OwnerOf",
                link: "",
              },
              {
                text: "getERC721SupportsInterface",
                link: "",
              },
              {
                text: "getERC721TokenURI",
                link: "",
              },
              {
                text: "getERC721Data",
                link: "",
              },
            ],
          },
          {
            text: "Wallet Actions",
            items: [
              {
                text: "writeERC721Transfer",
                link: "",
              },
              {
                text: "writeERC721Approve",
                link: "",
              },
              {
                text: "writeERC721SetApprovalForAll",
                link: "",
              },
            ],
          },
        ],
      },
      {
        text: "ERC1155",
        collapsed: true,
        items: [
          {
            text: "Utilities",
            items: [
              {
                text: "createERC1155",
                link: "",
              },
              {
                text: "createERC1155Data",
                link: "",
              },
            ],
          },
          {
            text: "Public Actions",
            items: [
              {
                text: "getERC1155",
                link: "",
              },
              {
                text: "getERC1155IsApprovedForAll",
                link: "",
              },
              {
                text: "getERC1155BalanceOf",
                link: "",
              },
              {
                text: "getERC1155URI",
                link: "",
              },
            ],
          },
          {
            text: "Wallet Actions",
            items: [
              {
                text: "writeERC1155Transfer",
                link: "",
              },
              {
                text: "writeERC1155TransferBatch",
                link: "",
              },
              {
                text: "writeERC1155SetApprovalForAll",
                link: "",
              },
            ],
          },
        ],
      },
      {
        text: "Amount",
        collapsed: true,
        items: [
          {
            text: "createAmountFromString",
            link: "",
          },
          {
            text: "createAmountFromFraction",
            link: "",
          },
          {
            text: "createAmountFromRaw",
            link: "",
          },
          {
            text: "amountAdd",
            link: "",
          },
          {
            text: "amountSubtract",
            link: "",
          },
          {
            text: "amountMultiply",
            link: "",
          },
          {
            text: "amountDivide",
            link: "",
          },
          {
            text: "isAmount",
            link: "",
          },
          {
            text: "amountLessThan",
            link: "",
          },
          {
            text: "amountGreaterThan",
            link: "",
          },
          {
            text: "amountEqualTo",
            link: "",
          },
          {
            text: "amountToNumber",
            link: "",
          },
        ],
      },
      {
        text: "Price",
        collapsed: true,
        items: [
          {
            text: "createPrice",
            link: "",
          },
          {
            text: "createPriceFromAmounts",
            link: "",
          },
          {
            text: "createPriceFromFraction",
            link: "",
          },
          {
            text: "priceInvert",
            link: "",
          },
          {
            text: "priceAdd",
            link: "",
          },
          {
            text: "priceSubtract",
            link: "",
          },
          {
            text: "priceMultiply",
            link: "",
          },
          {
            text: "priceDivide",
            link: "",
          },
          {
            text: "isPrice",
            link: "",
          },
          {
            text: "priceLessThan",
            link: "",
          },
          {
            text: "priceGreaterThan",
            link: "",
          },
          {
            text: "priceEqualTo",
            link: "",
          },
          {
            text: "priceToNumber",
            link: "",
          },
          {
            text: "priceQuote",
            link: "",
          },
          {
            text: "rawPrice",
            link: "",
          },
          {
            text: "adjustedPrice",
            link: "",
          },
        ],
      },
      {
        text: "Fraction",
        collapsed: true,
        items: [
          {
            text: "createFraction",
            link: "",
          },
          {
            text: "fractionRemainder",
            link: "",
          },
          {
            text: "fractionQuotient",
            link: "",
          },
          {
            text: "fractionInvert",
            link: "",
          },
          {
            text: "fractionAdd",
            link: "",
          },
          {
            text: "fractionSubtract",
            link: "",
          },
          {
            text: "fractionMultiply",
            link: "",
          },
          {
            text: "fractionDivide",
            link: "",
          },
          {
            text: "isFraction",
            link: "",
          },
          {
            text: "fractionLessThan",
            link: "",
          },
          {
            text: "fractionGreaterThan",
            link: "",
          },
          {
            text: "fractionEqualTo",
            link: "",
          },
          {
            text: "fractionToNumber",
            link: "",
          },
        ],
      },
      {
        text: "Chains",
        link: "",
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/kyscott18/reverse-mirage" },
    ],
  },
});
