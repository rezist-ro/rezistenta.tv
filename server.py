# coding=utf-8
import dateutil.parser
import flask
import json
import os
import time
import urllib
import yaml


EPISODES = yaml.load(open("episodes.yaml").read())


app = flask.Flask(__name__,
                  static_path="/assets",
                  static_folder="assets")

app.jinja_env.filters["strftime"] = \
    lambda str, fmt: dateutil.parser.parse(str).strftime(fmt)
app.jinja_env.filters["quote_plus"] = lambda u: urllib.quote_plus(u)


ASSETS = os.path.join(app.root_path, "assets")
@app.route("/favicon.ico")
def favicon():
    return flask.send_from_directory(
        ASSETS,
        "favicon.ico",
        mimetype="image/icon")


@app.route("/")
def home():
    return flask.render_template("pages/home.html",
        playlist=os.environ["PLAYLIST"],
        episodes=EPISODES,
        autoplay=not app.debug)


@app.route("/episod/<int:number>")
def episode(number):
    if number < 1:
        return "not found"
    elif number > len(EPISODES):
        return "coming soon"
    else:
        episode = EPISODES[len(EPISODES) - number]
        template = "pages/episode/%s.html" % (
            "youtube" if "yt" in episode else "facebook"
        )
        return flask.render_template(template,
                                     number=number,
                                     episode=episode,
                                     episodes=EPISODES)
