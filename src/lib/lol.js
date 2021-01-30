export const getAvatar = (name, version) => {
  return `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name}.png`;
};

/**
 *
 * @param {String} name Dentoes ${id}_${num}, Ex. `Ahri_0`
 * @param {String} type `splash` or `loading`
 */
export const getImage = (name, type = "splash") => {
  return `http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/${name}.jpg`;
};

/**
 *
 * @param {String} name Skin name Ex. `Justicar Aatrox`
 */
export const youtube = (name) => {
  return (
    "https://www.youtube.com/results?search_query=" +
    name.replaceAll(" ", "+") +
    "+Skin+Spotlight"
  );
};
