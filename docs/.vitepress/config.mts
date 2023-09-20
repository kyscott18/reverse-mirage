import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Reverse Mirage",
  description: "Application level typescript utilities for Ethereum",
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
      },
      {
        text: "WETH",
        collapsed: true,
      },
      {
        text: "ERC721",
        collapsed: true,
      },
      {
        text: "ERC1155",
        collapsed: true,
      },
      {
        text: "Amount",
        collapsed: true,
      },
      {
        text: "Price",
        collapsed: true,
      },
      {
        text: "Fraction",
        collapsed: true,
      },
      {
        text: "Chains",
        collapsed: true,
      },
      { text: "Utilities" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/kyscott18/reverse-mirage" },
    ],
  },
});
