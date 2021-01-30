import levenshtein from "js-levenshtein";

import bests from "@/data/bests";

export const getChampionName = (id) => {
  const key = Object.keys(bests).reverse()[0];
  if (id in bests[key]) return id;
  return Object.keys(bests[key]).sort(
    (a, b) => levenshtein(a, id) - levenshtein(b, id)
  )[0];
};

export const getSkinName = (champId, skinId) => {
  if (skinId === "default") return "Classic";
  const champName = getChampionName(champId);
  const skinName = Array.from(
    new Set(
      Object.values(bests)
        .map((data) => Object.keys(data[champName]))
        .flat()
    )
  ).sort((a, b) => levenshtein(a, skinId) - levenshtein(b, skinId))[0];
  return skinName;
};

/**
 *
 * @param {String} champId
 * @param {String} skinId
 * @returns {Object} { year: vote, year2: vote2, ...}
 */
export const getSkinPoll = (champId, skinId) => {
  const champName = getChampionName(champId);
  const skinName = getSkinName(champId, skinId);
  return Object.entries(bests).reduce((acc, [year, data]) => {
    if (data[champName][skinName] === undefined) return acc;
    return { ...acc, [year]: data[champName][skinName] };
  }, {});
};
