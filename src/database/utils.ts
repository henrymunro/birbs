export function shuffle<I>(array: I[]): I[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function getRandomElement<I>(arr: I[]): I {
  return arr[(Math.random() * arr.length) | 0];
}

export function getRandomElements<I>(arr: I[], count: number): I[] {
  let result: I[] = [];

  for (let i = 0; i < count; i++) {
    const rest = arr.filter((e) => !result.includes(e));
    if (rest.length === 0) {
      return result;
    }
    result.push(getRandomElement(rest));
  }
  return result;
}
