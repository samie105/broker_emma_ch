import Script from "next/script";
import Home from "../components/main/Home";
import SmartSupp from "../components/Smartsupp";
export default function HomePage() {
  return (
    <>
      <SmartSupp />
      <Home />
    </>
  );
}
