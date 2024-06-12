import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { ethers } from "ethers";
import Navbar from "./Navbar";
const Swap = () => {
  const options = [
    { value: "0x120b900cEb2037B04C1C1A90a24bBE1e85338cff", label: "Stoned Cobras", icon: "/images/coins/cronos-cro-logo.png" },
    { value: "0x90028AAf9653a81Db0940FD3c4A6859251087B44", label: "Mega Kong", icon: "/images/coins/cronos-cro-logo.png" },
    { value: "0xFEF8E458B355bCaAf27d9d876D02FFae75BeDc9A", label: "The Kongz", icon: "/images/coins/cronos-cro-logo.png" },
  ];
  const rewardTokenOptions = [{ value: "0x353654835E4e788e6e39BdAD794A28F4Fd9cD1Da", label: "King Coin", icon: "/images/coins/cronos-cro-logo.png" }];
  const [payOption, setPayOption] = useState(options[0]);
  const [receiveOption, setReceiveOption] = useState(rewardTokenOptions[0]);
  const [swapNftId, setSwapNftId] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [isWalletConnected, setisWalletConnected] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const [isSwapTokenForNft, setIsSwapTokenForNft] = useState(false);

  const [swapTokenForNft_Amount, setswapTokenForNft_Amount] = useState("");
  let swapABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_coinToken",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "CoinsSwappedForNFT",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
      ],
      name: "NFTContractAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
      ],
      name: "NFTContractRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "NFTSwappedForCoins",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newRatio",
          type: "uint256",
        },
      ],
      name: "SwapRatioUpdated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "nftContracts",
          type: "address[]",
        },
      ],
      name: "addNFTContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "coinToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "nftsHeld",
      outputs: [
        {
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
      ],
      name: "removeNFTContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "supportedNFTs",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "swapCoinsForNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "swapNFTForCoins",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "swapRatioInWei",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_coinToken",
          type: "address",
        },
      ],
      name: "updateCoinToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "tokenIds",
          type: "uint256[]",
        },
      ],
      name: "updateNftsHeld",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_swapRatioInWei",
          type: "uint256",
        },
      ],
      name: "updateSwapRatio",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const handleSelectPay = (option) => {
    setPayOption(option);
  };

  const handleSelectReceive = (option) => {
    setReceiveOption(option);
  };
  function handleErrors(err) {
    let alertMessage = "";
    let errMessage = err.message;

    let errArray = [
      "No NFTs available in contract",
      "NFT contract not supported",
      "You do not own this NFT",
      "NFT not approved for transfer",
      "Not enough coins in contract",
      "Not enough coins",
      "Coins not approved for transfer",
      "No NFTs available in contract",
      "NFT contract not supported",
      "1 or more NFT ids are not transferred to the contract",
      "approve caller is not token owner or approved for all",
    ];
    for (let index = 0; index < errArray.length; index++) {
      const element = errArray[index];
      if (errMessage.includes(element)) {
        alertMessage = element;
        alert(alertMessage);
        return;
      }
    }
    alert(errMessage);
  }

  const handleSwapChange = () => {
    // setPayOption(receiveOption);
    // setReceiveOption(payOption);
    // setSwapNftId(receiveAmount);
    // setReceiveAmount(swapNftId);
    setIsSwapTokenForNft(!isSwapTokenForNft);
  };
  const coinContractAddress = "0x353654835E4e788e6e39BdAD794A28F4Fd9cD1Da";
  const swapContractAddress = "0x3183fd0470db9e9923b66942963138374b3025d0"; // Replace with your contract address
  const cronosChainId = "0x19"; // Cronos mainnet chain ID
  const cronosRpcUrl = "https://evm.cronos.org/";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();

        // console.log(window.ethereum);
        try {
          if (network.chainId !== parseInt(cronosChainId, 16) && window.ethereum.isMetaMask) {
            try {
              await provider.send("wallet_switchEthereumChain", [{ chainId: cronosChainId }]);
            } catch (error) {
              if (error.code === 4902) {
                await provider.send("wallet_addEthereumChain", [
                  {
                    chainId: cronosChainId,
                    rpcUrls: [cronosRpcUrl],
                    chainName: "Cronos Mainnet",
                    nativeCurrency: { name: "Cronos", symbol: "CRO", decimals: 18 },
                    blockExplorerUrls: ["https://cronoscan.com/"],
                  },
                ]);
                setisWalletConnected(true);
              } else {
                throw error;
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
        setisWalletConnected(true);

        const signer = await provider.getSigner();
        console.log(signer);
        const account = await signer.address;
        setProvider(provider);
        setSigner(signer);
        setAccount(account);
        // const contract = new ethers.Contract(swapContractAddress, swapABI, signer);
        // setSwapContract(contract);

        // const coinTokenAddress = coinContractAddress;
        // const coinTokenContract = new ethers.Contract(
        //   coinTokenAddress,
        //   [
        //     "function approve(address spender, uint256 amount) external returns (bool)",
        //     "function allowance(address owner, address spender) external view returns (uint256)",
        //   ],
        //   signer
        // );
        // setCoinTokenContract(coinTokenContract);
      } catch (error) {
        handleErrors(error);
        console.error("Failed to connect wallet:", error);
        setisWalletConnected(false);
      }
    } else {
      console.error("Please install MetaMask!");
      setisWalletConnected(false);
    }
  };
  const approveCoinToken = async (spender, amount) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.address;

      const coinContract = new ethers.Contract(
        coinContractAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)",
        ],
        signer
      );
      const allowance = await coinContract.allowance(account, spender);
      if (parseInt(allowance) < parseInt(amount)) {
        const tx = await coinContract.approve(spender, amount);
        await tx.wait();
      }
      return true;
    } catch (error) {
      handleErrors(error);
      return false;
    }
  };
  const approveNftToken = async (tokenId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.address;

      const coinContract = new ethers.Contract(
        payOption.value, //Nft contract address,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function getApproved(uint256 tokenId) external view returns (address)",
        ],
        signer
      );
      const allowance = await coinContract.getApproved(tokenId);
      if (allowance.toLowerCase() != swapContractAddress.toLowerCase()) {
        const tx = await coinContract.approve(swapContractAddress, tokenId);
        await tx.wait();
      }
      return true;
    } catch (error) {
      handleErrors(error);
      return false;
    }
  };

  const swapNFTForCoins = async () => {
    if (isSwapTokenForNft) return;
    await connectWallet();
    if (true) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.address;

        const swapContract = new ethers.Contract(swapContractAddress, swapABI, signer);

        console.log("swapNFTForCoins: " + payOption.value);
        let res = await approveNftToken(swapNftId);
        if (!res) return;
        const tx = await swapContract.swapNFTForCoins(payOption.value, swapNftId);
        await tx.wait();
        console.log("NFT swapped for coins successfully!");
        alert("NFT swapped for coins successfully!");
      } catch (error) {
        handleErrors(error);
        console.error("Failed to swap NFT for coins:", error);
      }
    } else {
      alert("Connect Wallet First.");
    }
  };

  const swapCoinsForNFT = async () => {
    if (!isSwapTokenForNft) return;
    await connectWallet();

    if (true) {
      try {
        console.log("swapCoinsForNFT");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.address;

        const swapContract = new ethers.Contract(swapContractAddress, swapABI, signer);

        const swapRatioInWei = await swapContract.swapRatioInWei();
        console.log(swapRatioInWei);
        let res = await approveCoinToken(swapContractAddress, swapRatioInWei);
        if (!res) return;

        const tx = await swapContract.swapCoinsForNFT();
        await tx.wait();
        console.log("Coins swapped for NFT successfully!");
        alert("Coins swapped for NFT successfully!");
      } catch (error) {
        console.error("Failed to swap coins for NFT:", error);
        handleErrors(error);
      }
    }
  };

  return (
    <>
      <Navbar connectWallet={connectWallet} isWalletConnected={isWalletConnected} />
      <section id="hero" className="d-none d-md-block">
        <div className="hero"></div>
      </section>
      <section id="swap">
        <div className="swap">
          <div className="container">
            {!isSwapTokenForNft && (
              <>
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-5 col-md-7 position-relative">
                    <div className="form-control-wrapper d-flex flex-row">
                      <div className="input-wrapper">
                        <label htmlFor="pay">NFT ID</label>
                        <input
                          type="number"
                          name="pay"
                          id="pay"
                          placeholder="0"
                          inputmode="numeric"
                          className="form-control"
                          value={swapNftId}
                          onChange={(e) => {
                            setSwapNftId(e.target.value);
                            if (e.target.value == "") {
                              setReceiveAmount("0");
                            } else {
                              setReceiveAmount("150");
                            }
                          }}
                        />
                        {/* <div className="rate">$1.15</div> */}
                      </div>
                      <div className="selector-wrapper">
                        <CustomSelect options={options} onSelect={handleSelectPay} defaultOption={payOption} />
                      </div>
                    </div>
                    <button className="btn btn-arrow" onClick={handleSwapChange}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <div className="form-control-wrapper d-flex flex-row">
                      <div className="input-wrapper">
                        <label htmlFor="receive">Receive</label>
                        <input
                          type="text"
                          name="receive"
                          id="receive"
                          placeholder="0"
                          className="form-control"
                          value={receiveAmount}
                          disabled={true}
                          onChange={(e) => setReceiveAmount(e.target.value)}
                        />
                        {/* <div className="rate">$1.15</div> */}
                      </div>
                      <div className="selector-wrapper">
                        <CustomSelect options={rewardTokenOptions} onSelect={handleSelectReceive} defaultOption={receiveOption} />
                      </div>
                    </div>
                    <button
                      onClick={swapNFTForCoins}
                      style={{ color: "white", fontWeight: "bold", width: "100%" }}
                      className="btn-wapper d-flex flex-row"
                    >
                      Swap Nft For Token
                    </button>
                  </div>
                </div>
              </>
            )}

            {isSwapTokenForNft && (
              <>
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-5 col-md-7 position-relative">
                    <div className="form-control-wrapper d-flex flex-row">
                      <div className="input-wrapper">
                        <label htmlFor="pay">Token Amount</label>
                        <input
                          type="number"
                          name="pay"
                          id="pay"
                          placeholder="0"
                          inputmode="numeric"
                          className="form-control"
                          value={150}
                          // onChange={(e) => {
                          //   setswapTokenForNft_Amount(e.target.value);
                          // }}
                        />
                        {/* <div className="rate">$1.15</div> */}
                      </div>
                      <div className="selector-wrapper">
                        <CustomSelect options={rewardTokenOptions} defaultOption={rewardTokenOptions[0]} />
                      </div>
                    </div>
                    <button className="btn btn-arrow" onClick={handleSwapChange}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <div className="form-control-wrapper d-flex flex-row">
                      <div className="input-wrapper">
                        <label htmlFor="receive">Receive Nft Amount</label>
                        <input type="text" name="receive" id="receive" placeholder="0" className="form-control" value={1} disabled={true} />
                        {/* <div className="rate">$1.15</div> */}
                      </div>
                      <div className="selector-wrapper">
                        <CustomSelect
                          options={[{ value: "", label: "Random", icon: "/images/coins/cronos-cro-logo.png" }]}
                          defaultOption={{ value: "", label: "Random", icon: "/images/coins/cronos-cro-logo.png" }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={swapCoinsForNFT}
                      style={{ color: "white", fontWeight: "bold", width: "100%" }}
                      className="btn-wapper d-flex flex-row"
                    >
                      Swap Tokens For Nft
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="row justify-content-center pt-5 partner-images">
              <div className="col-12 col-lg-5 col-md-7">
                <div className="row">
                  <div className="col-3">
                    <a href="https://discord.gg/pvFc6M5kxS" rel="noreferrer" target="_blank">
                      <img src="/images/discord.png" alt="Swap Banner" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col-3">
                    <a href="https://wolfswap.app/" rel="noreferrer" target="_blank">
                      <img src="/images/swap-banner-2.png" alt="Swap Banner" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col-3">
                    <a href="https://corgistudio.io/" rel="noreferrer" target="_blank">
                      <img src="/images/swap-banner.png" alt="Swap Banner" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col-3">
                    <a href="https://x.com/titansofcronos?s=21&t=9dUuqrJ66-3DkVq3XW4HeA" rel="noreferrer" target="_blank">
                      <img src="/images/x.png" alt="Swap Banner" className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Swap;
