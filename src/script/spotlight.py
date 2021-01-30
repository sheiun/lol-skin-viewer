import urllib.parse

import requests


def get_video_id(query: str):
    encoded_search = urllib.parse.quote(query)
    BASE_URL = "https://www.youtube.com/c/SkinSpotlights"
    url = f"{BASE_URL}/search?query={encoded_search}"
    response = requests.get(url).text
    with open("d.html", "w") as f:
        f.write(response)
    term = '"videoId":"'
    start = response.find(term)
    vLen = response[start + len(term) :].find('"')
    return response[start + len(term) : start + len(term) + vLen]
