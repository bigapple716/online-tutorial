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
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    return render_template('learn.html', data=data)


@app.route('/learn/technique1/level')
def technique1_level():
    return render_template('technique1-level.html')


@app.route('/learn/technique1/<level>/<paragraph_idx>')
def technique1(level, paragraph_idx):
    # log activity
    print('learning level ' + level + ' paragraph ' + paragraph_idx + ' accessed at ' + str(datetime.datetime.now()))

    if level == 'beginner':
        next_level = 'intermediate'
    elif level == 'intermediate':
        next_level = 'advanced'
    else:
        next_level = ''

    paragraph_idx = int(paragraph_idx)

    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)

    paragraph = data["paragraphs"][level][paragraph_idx]

    return render_template('technique1.html', data=data, paragraph=paragraph, paragraph_idx=paragraph_idx, level=level,
                           next_level=next_level)


@app.route('/learn/technique2/<level>')
def technique2(level):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)

    temp = data["reading"]
    temp = temp.split()
    reading = {"reading": temp}
    
    return render_template('technique2.html', data=data, reading=reading, level=level)


@app.route('/learn/technique3/<level>')
def technique3(level):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)

    reading = data["reading"]

    return render_template('technique3.html', data=data, reading=reading, level=level)

# Quiz routes 

@app.route('/quiz')
def quiz():
    return render_template('quiz/quiz.html')

# Technique1
@app.route('/quiz/technique1/intro')
def quiz1_technique1_intro():
    return render_template('quiz/quiz-technique1-intro.html')

@app.route('/quiz/technique1/<value>')
def quiz_technique1(value):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    question = data["quiz1_questions"][value]
    return render_template('quiz/quiz-technique1.html', data = question)

@app.route('/quiz/technique1_questions/<quiz_id>/<w_per_m>', methods =['GET', 'POST'])
def technique1_questions(quiz_id,w_per_m):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    quiz = data["quiz1_questions"][quiz_id]   
    a_file = open('static/data/data.json', 'r')
    json_object = json.load(a_file)
    a_file.close()
    reading_level = ""
    wordpermin = int(w_per_m)
    if( wordpermin >= 100 and wordpermin < 200 ): 
        reading_level = "Insufficient"
    elif ( wordpermin >= 200 and wordpermin < 300 ): 
        reading_level = "Average reader"
    elif ( wordpermin >= 300 and wordpermin < 400 ): 
        reading_level = "Good reader"
    elif ( wordpermin >= 700 ): 
        reading_level = "Excellent, accomplished reader"
    else :
        reading_level = "Insufficient - very slow"
    json_object["user"] = { "wpm":w_per_m  , "reading_level": reading_level }
    a_file = open('static/data/data.json', "w")
    json.dump(json_object, a_file, indent=4)
    a_file. close()

    return render_template('quiz/technique1-questions.html', quiz = quiz )   


@app.route('/quiz/technique1_feedback/<value>')
def technique1_feedback(value):
    grade = value[0]
    next = value[1]
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    wpm = data["user"]["wpm"]
    reading_level = data["user"]["reading_level"]
    return render_template('quiz/technique1-feedback.html', grade = grade, next = next, current_speed = wpm, reading_level = reading_level)   

# Technique2
@app.route('/quiz/technique2/intro')
def quiz1_technique2_intro():
    return render_template('quiz/quiz-technique2-intro.html')

@app.route('/quiz/technique2/<quiz_id>')
def quiz_technique2(quiz_id):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    question = data["quiz2_questions"][quiz_id]
    return render_template('quiz/quiz-technique2.html', data = question) 

@app.route('/quiz_questions/<value>', methods =['GET', 'POST'])
def quiz_questions(value):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    question = data["quiz2_questions"][value]
    return render_template('quiz/technique2-questions.html', data = question)   

@app.route('/quiz/feedback/<value>')
def quiz_feedback(value):
    grade = value[0]
    next_id = str(value[1])
    if(next_id != "e" ):
        indx = str(int(next_id)-1)
    else:
        indx ="3"
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)
    question = data["quiz2_questions"][indx]
    return render_template('quiz/technique2-feedback.html', grade = grade, next_quiz_id = next_id, fade_time = question["speed"] )   

 # Quiz Ajax 
   

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="50000")
