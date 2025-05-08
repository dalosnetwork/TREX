

export const aggregate = async (token1Address, token1Amount, token2Address) => {
  const url = "https://trexapi.dalosnetwork.com/aggregate";

  const payload = {
    token1Address,
    token1Amount,
    token2Address,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
    }

    const data = await response.json();
    console.log("Sonuç:", data);
  } catch (error) {
    console.error("Hata:", error);
  }
};
