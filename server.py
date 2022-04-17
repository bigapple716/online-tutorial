import datetime
import json

from flask import Flask, render_template

app = Flask(__name__)


# ROUTES

@app.route('/')
def index():
    return render_template('index.html')


# Learning routes
@app.route('/learn')
def learn():
    with open('data/data.json', 'r') as f_data:
        data = json.load(f_data)
    return render_template('learn.html', data=data)


@app.route('/learn/technique1/level')
def technique1_level():
    return render_template('technique1-level.html')


@app.route('/learn/technique1/<level>/<paragraph_idx>')
def technique1(level, paragraph_idx):
    # log activity
    print('learning level ' + level + ' paragraph ' + paragraph_idx + ' accessed at ' + str(datetime.datetime.now()))

    paragraph_idx = int(paragraph_idx)

    with open('data/data.json', 'r') as f_data:
        data = json.load(f_data)

    paragraph = data["paragraphs"][level][paragraph_idx]

    return render_template('technique1.html', data=data, paragraph=paragraph, paragraph_idx=paragraph_idx, level=level)

@app.route('/learn/technique2/level')
def technique2_level():
    return render_template('technique2-level.html')

@app.route('/learn/technique2/<level>')
def technique2(level):
    return render_template('technique2.html')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="51000")
