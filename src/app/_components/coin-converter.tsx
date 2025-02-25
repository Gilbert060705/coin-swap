"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

type Coin = {
  currency: string;
  price: number;
  image: string;
};

interface CurrencyConverterProps {
  coins: Coin[];
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ coins }) => {
  const [amount, setAmount] = useState<string>(""); // Allow empty input
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("ETH");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState<boolean>(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState<boolean>(false);
  
  const fromButtonRef = useRef<HTMLButtonElement | null>(null);
  const toButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fromDropdownPosition, setFromDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [toDropdownPosition, setToDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const fromCurrencyData = coins.find((c) => c.currency === fromCurrency);
  const toCurrencyData = coins.find((c) => c.currency === toCurrency);

  const calculateConversion = () => {
    if (!fromCurrencyData || !toCurrencyData || amount === "") return 0;
    const rate = fromCurrencyData.price / toCurrencyData.price;
    return parseFloat(amount) * rate;
  };

  useEffect(() => {
    setConvertedAmount(calculateConversion());
  }, []);

  useEffect(() => {
    if (isFromDropdownOpen && fromButtonRef.current) {
      const rect = fromButtonRef.current.getBoundingClientRect();
      setFromDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    if (isToDropdownOpen && toButtonRef.current) {
      const rect = toButtonRef.current.getBoundingClientRect();
      setToDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
  }, [isFromDropdownOpen, isToDropdownOpen]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-lg relative overflow-visible">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* From currency section */}
          <div>
            <label className="block text-black font-medium mb-2">Amount</label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                placeholder="Enter amount"
              />

              <div className="absolute inset-y-0 right-0 flex items-center">
                <div className="relative">
                  <button
                    ref={fromButtonRef}
                    onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 border-l border-gray-300 h-full rounded-r-xl bg-white"
                  >
                    {fromCurrencyData && (
                      <>
                        <div className="w-6 h-6 relative">
                          <Image src={fromCurrencyData.image} alt={fromCurrencyData.currency} width={24} height={24} />
                        </div>
                        <span className="font-medium text-black">{fromCurrencyData.currency}</span>
                        <ChevronDown size={16} className="text-black" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Converted currency section */}
          <div>
            <label className="block text-black font-medium mb-2">Converted to</label>
            <div className="relative">
              <input
                type="text"
                value={convertedAmount.toFixed(6)}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none text-black cursor-pointer"
                onClick={() => setIsToDropdownOpen(true)}
              />

              <div className="absolute inset-y-0 right-0 flex items-center">
                <div className="relative">
                  <button
                    ref={toButtonRef}
                    onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 border-l border-gray-300 h-full rounded-r-xl bg-white"
                  >
                    {toCurrencyData && (
                      <>
                        <div className="w-6 h-6 relative">
                          <Image src={toCurrencyData.image} alt={toCurrencyData.currency} width={24} height={24} />
                        </div>
                        <span className="font-medium text-black">{toCurrencyData.currency}</span>
                        <ChevronDown size={16} className="text-black" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Portals */}
        {isFromDropdownOpen &&
          createPortal(
            <div
              className="absolute w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
              style={{ position: "absolute", top: fromDropdownPosition.top, left: fromDropdownPosition.left }}
            >
              {coins.map((coin) => (
                <button key={coin.currency} className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                  onClick={() => { setFromCurrency(coin.currency); setIsFromDropdownOpen(false); }}>
                  <Image src={coin.image} alt={coin.currency} width={24} height={24} />
                  <p className="font-medium text-black ml-3">{coin.currency}</p>
                </button>
              ))}
            </div>,
            document.body
          )}

        {isToDropdownOpen &&
          createPortal(
            <div
              className="absolute w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
              style={{ position: "absolute", top: toDropdownPosition.top, left: toDropdownPosition.left }}
            >
              {coins.map((coin) => (
                <button key={coin.currency} className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                  onClick={() => { setToCurrency(coin.currency); setIsToDropdownOpen(false); }}>
                  <Image src={coin.image} alt={coin.currency} width={24} height={24} />
                  <p className="font-medium text-black ml-3">{coin.currency}</p>
                </button>
              ))}
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
