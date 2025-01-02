"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client
        setIsClient(true);
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask is not installed!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setWalletAddress(accounts[0]);
        } catch (error: any) {
            if (error.code === "ACTION_REJECTED") {
                alert("Connection request was rejected. Please try again.");
            } else {
                console.error("Failed to connect wallet:", error);
                alert("An error occurred while connecting the wallet. Please try again.");
            }
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        alert("To disconnect from MetaMask, please manually disconnect through the MetaMask extension.");
    };

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {typeof window !== 'undefined' && walletAddress ? (
                        // Render wallet-specific elements
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                            </Link>

                            <button
                                type="button"
                                onClick={disconnectWallet}
                                className="max-sm:hidden"
                            >
                                Logout
                            </button>

                            <Link href={`/user/${walletAddress}`}>
                                <span>
                                    Account: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                </span>
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
