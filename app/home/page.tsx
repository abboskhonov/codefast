"use client";

import React from "react";
import Navbar from "@/components/navbar";
import TypingBox from "@/components/TypingBox";
import TypingSettings from "@/components/TypingSettings";
import Results from "@/components/Results";
import { useTypingResult } from "@/lib/useTypingResult";

const Page = () => {
  const { result } = useTypingResult();

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <Navbar />
      {!result ? (
        <>
          <TypingSettings />
          <TypingBox />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Results {...result} />
        </div>
      )}
    </div>
  );
};

export default Page;
