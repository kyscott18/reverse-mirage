import { type ERC20 } from "@/lib/types";
import { useState } from "react";
import { createContainer } from "unstated-next";
import type { Hex } from "viem";

const useEnvironmentInternal = () => {
  const [id, setID] = useState<Hex | undefined>(undefined);
  const [token, setToken] = useState<ERC20 | undefined>(undefined);
  return { id, setID, token, setToken };
};

export const { Provider: EnvironmentProvider, useContainer: useEnvironment } =
  createContainer(useEnvironmentInternal);
