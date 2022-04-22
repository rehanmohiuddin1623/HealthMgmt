import assign from "../contracts/Assign.json";
import { ethers } from "ethers";

export const assignContract = () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const assignContract = new ethers.Contract(
        assign.networks[5777].address,
        assign.abi,
        signer
      );

      //   console.log("Initialize payment");
      //   let Txn = await assignContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

      //   console.log("please wait...");
      //   await Txn.wait();

      return assignContract;
    } else {
      console.log("Ethereum object does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};
