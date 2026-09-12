"use client";
import React, { useState } from "react";
import PremiumPullSwitch from "./premium-pull-switch";

export default function ProjectTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? "" : "light-scope"}>
      {children}
      <PremiumPullSwitch isOn={isDark} onToggle={(v) => setIsDark(v)} />
    </div>
  );
}