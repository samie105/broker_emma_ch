"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { useTheme } from "../../../contexts/themeContext";
import { currencies } from "./data/stocks";
import Image from "next/image";
import { useUserData } from "../../../contexts/userrContext";

export default function StockPage() {
  const { details, stockPrices } = useUserData();

  const { isDarkMode } = useTheme();
  return (
    <div className={`px-4 pb-2 ${isDarkMode ? "text-white" : ""}`}>
      <div className="rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow
              className={`border-none rounded-md ${
                isDarkMode
                  ? "bg-[#222] font-bold text-white hover:bg-white/5"
                  : ""
              }`}
            >
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                ID
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Asset
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Name
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Value
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Price
              </TableHead>
              {/* <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              ></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencies.map((crypto, index) => (
              <>
                <TableRow
                  key={crypto.id}
                  className={`border-none cursor-pointer ${
                    isDarkMode
                      ? "bg-[#111] font-bold text-white hover:bg-white/5"
                      : ""
                  }`}
                >
                  <TableCell className="font-bold">
                    {index + 1}
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-orange-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg> */}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div
                      className={`flex items-center gap-x-2 ${
                        isDarkMode ? "text-white/80" : "text-black/80"
                      }`}
                    >
                      <div className="crypto-image">
                        <Image
                          alt=""
                          src={crypto.image}
                          className="w-6 h-6"
                          width={1000}
                          height={1000}
                        />
                      </div>
                      <div className="crypto-name font-bold">
                        {crypto.symbol}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {crypto.name}
                  </TableCell>
                  <TableCell
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {details !== 0 &&
                      (
                        details.tradingBalance / stockPrices[crypto.symbol]
                      ).toFixed(2)}{" "}
                    {crypto.symbol}
                  </TableCell>
                  <TableCell
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {stockPrices[crypto.symbol]
                      ? stockPrices[crypto.symbol]
                      : "0.00"}
                  </TableCell>
                  {/* <TableCell>
                    <button className="px-3 py-2 bg-green-600/10 text-green-600 rounded-sm text-sm">
                      Trade
                    </button>
                  </TableCell> */}
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
