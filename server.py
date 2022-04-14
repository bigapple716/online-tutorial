import json
from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)


# ROUTES

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/learn')
def learn():
    return render_template('learn.html')


if __name__ == '__main__':
    app.run(debug=True)
