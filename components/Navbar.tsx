"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";


const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
    useEffect(() => {
      const checkConnection = async () => {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum);
          try {
            const signer = await provider.getSigner(); // Get the signer
            const address = await signer.getAddress(); // Get the wallet address
            setWalletAddress(address); // Set the wallet address (not the signer)
          } catch (error) {
            console.error('Error getting address:', error);
          }
        }
        }
      checkConnection();
    }, []);
  
const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed!');
        return;
    }
    
    try {
        const provider = new ethers.BrowserProvider (window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWalletAddress(accounts[0]);
    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
    };
    
const disconnectWallet = () => {
    setWalletAddress(null);
    };


    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={144} height={30} />
            </Link>
    
            <div className="flex items-center gap-5 text-black">
              {walletAddress ? (
                <>
                  <Link href="/startup/create">
                    <span className="max-sm:hidden">Create</span>
                  </Link>
    
                  <form
                    action={async () => {
                    //   "use server";
                      disconnectWallet();
                    }}
                  >
                    <button type="submit">
                      <span className="max-sm:hidden">Logout</span>
                    </button>
                  </form>
    
                  <Link href={`/user/${walletAddress}`}>
                    <span>Account: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                  </Link>
                </>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    connectWallet();
                  }}
                >
                  <button type="submit">Login with MetaMask</button>
                </form>
              )}
            </div>
          </nav>
        </header>
      );
    };

    export default Navbar;