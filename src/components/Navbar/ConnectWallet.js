import React from "react";
import "./ConnectWallet.css";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stackon",
      icon: window.location.origin + "/stackon-logo.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession: userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
