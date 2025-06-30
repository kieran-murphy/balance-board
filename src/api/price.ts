export const fetchCryptoPrice = async (id: string): Promise<number> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=aud`);
  const data = await res.json();
  return data[id].aud;
};