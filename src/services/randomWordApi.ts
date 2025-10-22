export async function fetchRandomWord(length: number): Promise<string> {
  const res = await fetch(
    `https://random-word-api.vercel.app/api?words=1&length=${length}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch word: ${res.status}`);
  }
  const data = await res.json();

  if (!Array.isArray(data) || !data[0]) {
    throw new Error("Invalid response format");
  }
  return data[0];
}
