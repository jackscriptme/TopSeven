import { useState, useEffect, useCallback } from 'react';
import web3 from 'web3';
import { ethers } from 'ethers';

import environments from '../utils/environments';
import Token from '../abis/TopSevenPlayer.json';

const tokenContractAddress = '0x45438E2F20EAcf63F00A3207e026222F70674C22';

const { NETWORK_ID: networkId } = environments;

const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const getEthereum = useCallback(() => {
    const { ethereum } = window;

    if (!ethereum) {
      window.open('https://metamask.io/download/');
    }

    return ethereum;
  }, []);

  const connectMetamaskWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    setIsAuthenticating(true);

    try {
      if (ethereum.networkVersion !== networkId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(networkId) }],
        });
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts.length) throw new Error('No authorized account found');
      setAccount(accounts[0].toLowerCase());
    } catch (err) {
      console.error(err);
      if (err.message.includes('rejected')) return;

      // show error
    }

    setIsAuthenticating(false);
  }, [getEthereum]);

  const checkNetwork = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    if (ethereum.networkVersion !== networkId) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(networkId) }],
      });
    }
  }, []);

  const mintNFT = async () => {
    try {
      const ethereum = getEthereum();
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(
          tokenContractAddress,
          Token.abi,
          signer
        );

        // const test = await tokenContract.balanceOf(account);
        // console.log({ test: test.toString() });

        const txn = await tokenContract.safeMint(account, 1000, {
          value: ethers.utils.parseEther('1'),
        });

        await txn.wait();
        console.log(txn.hash);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const init = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      setIsInitialized(true);
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    try {
      const address = await signer.getAddress();
      if (address) {
        await checkNetwork();
        setAccount(address.toLowerCase());
      }
    } catch (err) {
      console.error(err);
    }

    setIsInitialized(true);

    ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0] ? accounts[0].toLowerCase() : null);
    });

    ethereum.on('chainChanged', (networkId) => {
      console.log({ networkId });
    });
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
  }, []);

  useEffect(() => {
    init();
  }, []);

  return {
    isInitialized,
    isAuthenticating,
    account,
    connectMetamaskWallet,
    logout,
    mintNFT,
  };
};

export default useAccount;
