from json import dump, load

import requests

from spotlight import get_video_id

version = load(open("src/data/versions.json"))[0]

champions = (
    requests.get(
        f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json"
    )
    .json()["data"]
    .keys()
)

results = {}

for champ in champions:
    skins = [
        skin["name"]
        for skin in requests.get(
            f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion/{champ}.json"
        ).json()["data"][champ]["skins"]
    ]
    data = {}
    for skin in skins:
        if skin == "default":
            v_id = get_video_id("Classic " + champ)
        else:
            v_id = get_video_id(skin)
        data[skin] = v_id
    results[champ] = data

# {champion: {skin: v_id}}
dump(results, open("src/data/videos.json", "w"))
