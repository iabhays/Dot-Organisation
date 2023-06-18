import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.gif';
import './style/App.css';
import ParticlesBackground from './ParticlesBackground';

// Components
import Navigation from './Navbar';
import Home from './Home'
import Create from './Create'
import MyListedItem from './MyListedItem'
import MyPurchases from './MyPurchases'
import AboutUs from './AboutUs'
import Explore from './Explore';
import NFTDrag from './NFTDrag.tsx';
import Login from './Login'
import Register from './Register'
import Page404 from './Page_404'

import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { Spinner } from 'react-bootstrap';
 
function App() {

  useEffect(() => {
    document.title = "Dot.. Organization"
  }, [])

  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
      <ParticlesBackground/>
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              
              <Spinner animation="grow" style={{ display: 'flex', color: "white" }} />
              <p style={{color: "white"}} className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                // <Home marketplace={marketplace} nft={nft} />
                <Login />
              } />
              <Route path="/login" element={
                <Login />
              } />
              <Route path="/register" element={
                <Register />
              } />
              <Route path="/home" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItem marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/about-us" element={
                <AboutUs />
              } />
              <Route path="/explore" element={
                <Explore marketplace={marketplace} nft={nft} account={account}/>
              } />
              <Route path="/nftdrag" element={
                <NFTDrag marketplace={marketplace} nft={nft} account={account}/>
              } />
              <Route path="*" element={
                <Page404 />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
