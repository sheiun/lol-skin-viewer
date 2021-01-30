from json import dump, load

import requests

polls = load(open("./src/data/polls.json"))
bests = load(open("./src/data/bests.json"))

for year, _polls in polls.items():
    if year not in bests:
        bests[year] = {}
    else:
        print(year, "skipped...")
        continue

    for poll in _polls:
        res = requests.get(f"https://www.strawpoll.me/api/v2/polls/{poll}")
        data = res.json()
        bests[year][data["title"]] = dict(zip(data["options"], data["votes"]))

dump(bests, open("./src/data/bests.json", "w"))

