import { Bird } from "./birds";

type Stats = Record<string, DailyStat>;

interface DailyStat {
  total: number;
  correct: number;
  birds: Partial<Record<Bird, Stat>>;
}

interface Stat {
  correct: number;
  incorrectlyNotPicked: Partial<Record<Bird, number>>;
}

function getStats(): Stats {
  const stats = localStorage.getItem("stats");
  return stats ? JSON.parse(stats) : {};
}

function saveStats(stats: Stats) {
  localStorage.setItem("stats", JSON.stringify(stats));
}

export function resetStats() {
  localStorage.removeItem("stats");
}

function init<KeyT extends string, ValT>(
  obj: Partial<Record<KeyT, ValT>>,
  key: KeyT,
  setter: (curr: ValT | undefined) => ValT
) {
  obj[key] = setter(obj[key]);
}

export function logStat({ actual, picked }: { actual: Bird; picked: Bird }) {
  const stats = getStats();

  const today = new Date().toLocaleDateString();

  init(stats, today, (curr) => ({
    birds: {},
    ...curr,
    total: (curr?.total || 0) + 1,
    correct: (curr?.correct || 0) + actual === picked ? 1 : 0,
  }));

  const todayBirds = stats[today].birds;

  if (picked === actual) {
    init(todayBirds, picked, (curr) => ({
      incorrectlyNotPicked: {},
      incorrectlyPicked: {},
      ...curr,
      correct: (curr?.correct || 0) + 1,
    }));
  } else {
    init(todayBirds, picked, (curr) => ({
      correct: 0,
      ...curr,
      incorrectlyNotPicked: {
        ...curr?.incorrectlyNotPicked,
        [actual]: (curr?.incorrectlyNotPicked?.[actual] || 0) + 1,
      },
    }));
  }

  saveStats(stats);
}

export function getDaysWithStats() {
  return Object.keys(getStats()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
}

export function getDailyStatSummary(date = new Date().toLocaleDateString()) {
  const stats = getStats()[date];

  if (!stats) {
    return {
      date,
      correct: 0,
      incorrect: 0,
      birdStats: [],
    };
  }

  const birdStats = Object.entries(stats.birds).map(([bird, stat]) => {
    let incorrect = 0;
    const mistakenFor: Partial<Record<Bird, number>> = {};

    Object.entries(stat.incorrectlyNotPicked).forEach(([bird, count]) => {
      incorrect += count;
      init(mistakenFor, bird as Bird, (curr) => (curr || 0) + count);
    });

    return {
      bird: bird as Bird,
      correct: stat.correct,
      incorrect,
      mistakenFor: Object.entries(mistakenFor)
        .map(([bird, count]) => ({ bird, count }))
        .sort((a, b) => b.count - a.count),
    };
  });

  return {
    date,
    correct: stats.correct,
    total: stats.total,
    birdStats: birdStats.sort((a, b) => a.incorrect - b.incorrect),
  };
}
