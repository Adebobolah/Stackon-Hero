import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { openSTXTransfer } from "@stacks/connect";
import "./HeroSection.css";
import { userSession } from "../Navbar/ConnectWallet";

const ContractCallPredict = () => {
  const { sign } = useConnect();
  const predict = async () => {
    openSTXTransfer({
      recipient: "ST2EB9WEQNR9P0K28D2DC352TM75YG3K0GT7V13CV",
      amount: "100",
      memo: "Prediction Fee",
      network: new StacksTestnet(),
      appDetails: {
        name: "Stackon",
        icon: window.location.origin + "/stackon-logo.png",
      },
      onFinish: (data) => {
        console.log("Stacks Transaction:", data.stacksTransaction);
        console.log("Transaction ID:", data.txId);
        console.log("Raw transaction:", data.txRaw);
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
    await sign(openSTXTransfer);
  };

  if (!userSession.isUserSignedIn()) {
    return (
      <div className="prebutton">
        You need to connect your wallet before you can use the prediction
        button.
      </div>
    );
  }

  return (
    <div>
      <input
        className="button"
        type="submit"
        onClick={() => predict()}
        value="Predict"
      ></input>{" "}
    </div>
  );
};

export default ContractCallPredict;
