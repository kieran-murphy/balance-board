import { useState, useEffect } from "react";
// import { Asset } from "../types/Asset";
import { saveEncrypted, loadEncrypted } from "../utils/encryptedStorage";

const STORAGE_KEY = "netWorthAssets";

export function useAssets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const stored = loadEncrypted(STORAGE_KEY);
    if (stored) setAssets(stored);
  }, []);

  useEffect(() => {
    saveEncrypted(STORAGE_KEY, assets);
  }, [assets]);

  const addAsset = (asset: Asset) => setAssets(prev => [...prev, asset]);
  const removeAsset = (name: string) => setAssets(prev => prev.filter(a => a.name !== name));

  return { assets, addAsset, removeAsset };
}