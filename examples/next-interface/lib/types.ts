import type { ERC20 as _ERC20 } from "reverse-mirage";

export type ERC20 = _ERC20 & { logoURI?: string };
