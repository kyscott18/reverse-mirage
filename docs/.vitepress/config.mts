import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Reverse Mirage",
  description: "Application level typescript utilities for Ethereum",
  head: [["script", { src: "/_vercel/insights/script.js" }]],
  themeConfig: {
    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting started", link: "/" },
          { text: "Installation", link: "/installation" },
        ],
      },
      {
        text: "ERC20",
        collapsed: true,
        items: [
          { text: "Introduction", link: "" },

          {
            text: "Utilities",
            items: [
              {
                text: "createERC20",
                link: "",
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
                text: "simulateERC20Transfer",
                link: "",
              },
              {
                text: "simulateERC20Approve",
                link: "",
              },
              {
                text: "simulateERC20TransferFrom",
                link: "",
              },
              {
                text: "simulateERC20Permit",
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
          { text: "Introduction", link: "" },
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
          { text: "Introduction", link: "" },

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
                text: "simulateWETHDeposit",
                link: "",
              },
              {
                text: "simulateWETHWithdraw",
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
          { text: "Introduction", link: "" },
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
              {
                text: "createERC721DataID",
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
              {
                text: "getERC721DataID",
                link: "",
              },
            ],
          },
          {
            text: "Wallet Actions",
            items: [
              {
                text: "simulateERC721Transfer",
                link: "",
              },
              {
                text: "simulateERC721Approve",
                link: "",
              },
              {
                text: "simulateERC721SetApprovalForAll",
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
          { text: "Introduction", link: "" },
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
                text: "simulateERC1155Transfer",
                link: "",
              },
              {
                text: "simulateERC1155TransferBatch",
                link: "",
              },
              {
                text: "simulateERC1155SetApprovalForAll",
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
          { text: "Introduction", link: "" },
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
          { text: "Introduction", link: "" },
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
          { text: "Introduction", link: "" },
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
      {
        text: "Utilities",
        items: [
          {
            text: "getQueryKey",
            link: "",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/kyscott18/reverse-mirage" },
    ],
  },
});
