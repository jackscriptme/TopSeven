import './App.css';

import useAccount from './hooks/useAccount';

function App() {
  const { account, connectMetamaskWallet, mintNFT } = useAccount();
  return (
    <div className='App'>
      {account ? (
        <div>
          Account: {account}
          <button onClick={mintNFT}>Mint</button>
        </div>
      ) : (
        <button onClick={connectMetamaskWallet}>connect wallet</button>
      )}
    </div>
  );
}

export default App;
