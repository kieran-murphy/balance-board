import { useState } from "react";
import { useNetWorth } from "../context/NetWorthContext";
import AssetListItem from "./AssetListItem";

const NetWorthTracker = () => {
  const { assets, addAsset, totalWealth } = useNetWorth();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState(0);

  const handleAdd = () => {
    if (!name || value <= 0) return;
    addAsset({ name, value, type });
    setName("");
    setType("");
    setValue(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <div className="p-4">
      <h1>💰 Net Worth Tracker</h1>
      <h2>Total: ${totalWealth.toLocaleString()}</h2>

      <label htmlFor="type">Choose a type: </label>
      <select id="type" value={type} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="cash">Cash</option>
        <option value="crypto">Crypto</option>
        <option value="stocks">Stocks</option>
      </select>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset name" />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        placeholder="Value"
      />
      <button onClick={handleAdd}>Add Asset</button>

      <ul>
        {assets.map((a) => (
          <AssetListItem key={a.name} asset={a} />
        ))}
      </ul>
    </div>
  );
};

export default NetWorthTracker;
