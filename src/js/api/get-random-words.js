export async function getWords(amount = 5) {
  const wordList = await fetch(
    `https://random-word-api.vercel.app/api?words=${amount}`,
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => console.error("Failed fetching random words"));

  const wordsAsString = wordList.reduce(
    (accumulator, word) => accumulator + " " + word,
    "",
  );

  return wordsAsString.trim();
}
