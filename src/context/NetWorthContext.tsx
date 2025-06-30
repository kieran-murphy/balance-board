import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

type Asset = { name: string; value: number; type: string };

type NetWorthContextType = {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  removeAsset: (name: string) => void;
  updateValue: (name: string, value: number | null) => void;
  calculatedValues: Record<string, number>;
  totalWealth: number;
};

const NetWorthContext = createContext<NetWorthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "net-worth-assets";

export const NetWorthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [calculatedValues, setCalculatedValues] = useState<Record<string, number>>({});

  // Load assets from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setAssets(JSON.parse(stored));
      } catch {
        console.error("Failed to parse stored assets");
      }
    }
  }, []);

  // Save assets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(assets));
  }, [assets]);

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  const removeAsset = (name: string) => {
    setAssets((prev) => prev.filter((a) => a.name !== name));
    setCalculatedValues((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const updateValue = (name: string, value: number | null) => {
    if (value == null) return;
    setCalculatedValues((prev) => ({ ...prev, [name]: value }));
  };

  const totalWealth = useMemo(
    () => Object.values(calculatedValues).reduce((sum, val) => sum + val, 0),
    [calculatedValues]
  );

  return (
    <NetWorthContext.Provider
      value={{ assets, addAsset, removeAsset, updateValue, calculatedValues, totalWealth }}
    >
      {children}
    </NetWorthContext.Provider>
  );
};

export const useNetWorth = () => {
  const context = useContext(NetWorthContext);
  if (!context) throw new Error("useNetWorth must be used inside a NetWorthProvider");
  return context;
};
