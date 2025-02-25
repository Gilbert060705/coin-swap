"use client";
import React from "react";
import CurrencyConverter from "./_components/coin-converter";
import Navbar from "./_components/navbar";
import { CoinList } from "./_components/types";

export default function SwapForm() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-4 relative overflow-visible">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-300 uppercase mb-6">
          Currency Converter
        </h1>
        <CurrencyConverter
          coins={CoinList}
          defaultFromCurrency="USD"
          defaultToCurrency="ETH"
        />
      </div>
    </>
  );
}
