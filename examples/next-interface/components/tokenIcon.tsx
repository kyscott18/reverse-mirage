import type { ERC20 } from "@/lib/types";
import { clsx } from "clsx";
import Image from "next/image";

export default function TokenIcon({
  erc20,
  size,
  className,
}: {
  erc20: ERC20;
  size: number;
  className?: string;
}) {
  return erc20.logoURI ? (
    <Image
      className={clsx("flex overflow-hidden rounded-[50%]", className)}
      height={size}
      width={size}
      src={erc20.logoURI}
      alt="token icon"
    />
  ) : (
    <div className="border-1 flex overflow-hidden rounded-[100%] border-dashed border-gray-200" />
  );
}
