import { ALICE } from "@/constants";
import { useEnvironment } from "@/contexts/environment";
import { testClient, walletClient } from "@/pages/_app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createERC20 } from "reverse-mirage";
import invariant from "tiny-invariant";
import { type Hex } from "viem";
import { parseEther } from "viem/utils";
import { useChainId, usePublicClient } from "wagmi";
import ERC20 from "../../../contracts/out/ERC20.sol/ERC20.json";
import { erc20ABI } from "../generated";

export const useSetup = () => {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  const chainID = useChainId();
  const { id, setID, setToken } = useEnvironment();

  return useMutation({
    mutationFn: async () => {
      if (id === undefined) {
        const deployHash = await walletClient.deployContract({
          account: ALICE,
          abi: erc20ABI,
          bytecode: ERC20.bytecode.object as Hex,
          args: ["Marshall Rogan INU", "MRI", 18],
        });

        const { contractAddress } =
          await publicClient.waitForTransactionReceipt({
            hash: deployHash,
          });
        invariant(contractAddress);

        setToken({
          ...createERC20(contractAddress, "Mock ERC", "MOCK", 18, chainID),
          logoURI:
            "https://assets.coingecko.com/coins/images/23784/small/mri.png?1647693409",
        });

        const mintHash = await walletClient.writeContract({
          abi: erc20ABI,
          functionName: "mint",
          address: contractAddress,
          args: [ALICE, parseEther("10")],
        });
        await publicClient.waitForTransactionReceipt({ hash: mintHash });

        setID(await testClient.snapshot());
      } else {
        await testClient.revert({ id });
        setID(await testClient.snapshot());
        await queryClient.invalidateQueries();
      }
    },
  });
};
