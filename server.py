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
    pass


@app.route('/learn/technique1')
def technique1():
    pass


if __name__ == '__main__':
    app.run(debug=True)
