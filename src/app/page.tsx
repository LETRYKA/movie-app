'use client';

import Hero from "@/components/Hero";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    console.log('%c Stop', 'font-size: 48px; font-family: "Work Sans", sans-serif; color: red; font-weight: bold;');
    console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or "hack" someones account, it is a scam and will give them access to your account.', 'font-size: 18px; font-family: "Work Sans", sans-serif; color: white; font-weight: medium;');
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
}
