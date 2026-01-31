"use client";

import { useState, useCallback, useEffect } from "react";
import SearchDialog from "./SearchDialog";

interface SearchProviderProps {
  children: React.ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 全局键盘快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K 或 Ctrl+K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {children}
      <SearchDialog isOpen={isOpen} onClose={closeSearch} />
    </>
  );
}
