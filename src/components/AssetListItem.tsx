import { useState, useEffect } from 'react';
import { fetchCryptoPrice } from "../api/price";
import { useNetWorth } from "../context/NetWorthContext";

type Props = {
  asset: { name: string; value: number; type: string };
};

const AssetListItem = ({ asset }: Props ) => {
  const { removeAsset, updateValue } = useNetWorth();
  const [fetchedPrice, setFetchedPrice] = useState<number | null>(null);

  
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await fetchCryptoPrice(asset.name);
        setFetchedPrice(price * asset.value);
        updateValue(asset.name, price * asset.value);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    if (asset.type === "crypto") {
    fetchPrice();
    }
    if (asset.type === "cash") {
      updateValue(asset.name, asset.value);
    }
 }, [asset.name, asset.value]);

  return (
    <li key={asset.name}>
      {asset.type} - {asset.value} {asset.name}: ${fetchedPrice}
      <button onClick={() => removeAsset(asset.name)}>❌</button>
    </li>
  );
}

export default AssetListItem;