import type { ERC20 } from "@/lib/types";
import { clsx } from "clsx";
import TokenIcon from "./tokenIcon";

export default function TokenInfo({
  erc20,
  size,
}: {
  erc20: ERC20;
  size?: number;
}) {
  return (
    <div className={clsx("flex items-center", "space-x-2")}>
      <TokenIcon erc20={erc20} size={size ?? 32} />
      <div className="">
        <p className="p1">{erc20.symbol}</p>
      </div>
    </div>
  );
}
