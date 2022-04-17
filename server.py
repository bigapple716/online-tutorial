import json
from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)


# ROUTES

@app.route('/')
def index():
    return render_template('index.html')


# Learning routes
@app.route('/learn')
def learn():
    return render_template('learn.html')


@app.route('/learn/technique1/level')
def technique1_level():
    return render_template('technique1-level.html')


@app.route('/learn/technique1/<level>')
def technique1(level):
    return render_template('technique1.html')

@app.route('/learn/technique2/level')
def technique2_level():
    return render_template('technique2-level.html')

@app.route('/learn/technique2/<level>')
def technique2(level):
    return render_template('technique2.html')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="51000")
