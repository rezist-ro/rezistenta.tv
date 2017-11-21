# coding=utf-8
import facebook
import re
import os
import sys
import urllib
import yaml


# requires a token from https://developers.facebook.com/tools/explorer to work
FB = facebook.GraphAPI(
    access_token=os.environ["FACEBOOK_KEY"],
    version=2.10
)


episodes = yaml.load(open("episodes.yaml").read())
for index, episode in enumerate(episodes):
    number = len(episodes) - index
    path = "assets/thumbs/%d.jpeg" % number
    if os.path.isfile(path):
        continue

    if "yt" in episode:
        url = "https://img.youtube.com/vi/%s/hqdefault.jpg" % episode["yt"]
    else:
        vid = re.sub("[^\d]|600000", "", episode["fb"])
        response = FB.get_object(vid, fields="thumbnails")
        for thumb in response["thumbnails"]["data"]:
            if thumb["is_preferred"]:
                url = thumb["uri"]
                break
        else:
            print("Failed to obtain preferred thumbnail for %s" % vid)
            continue
    urllib.urlretrieve(url, path)
