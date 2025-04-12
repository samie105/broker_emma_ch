"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}
//commit changes
export default function SmartSupp() {
  // useEffect(() => {
  //   window._smartsupp = window._smartsupp || {};
  //   window._smartsupp.key = "572cdc8ab159c994ef97c92c4dc85aa8867c5721";
  //   window.smartsupp =
  //     window.smartsupp ||
  //     function () {
  //       (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
  //     };
  //   window.smartsupp._ = window.smartsupp._ || [];

  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.async = true;
  //   script.src = "https://www.smartsuppchat.com/loader.js?";
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return null;
}
