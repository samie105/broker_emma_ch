"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

export default function SmartSupp() {
  useEffect(() => {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "a68f40338b309c0ac813d720b19b334a18ba95a4";
    window.smartsupp =
      window.smartsupp ||
      function () {
        (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
      };
    window.smartsupp._ = window.smartsupp._ || [];

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
