import datetime
import json

from flask import Flask, render_template

app = Flask(__name__)

quiz1_questions = {
    "1":{
        'quiz_id':"1",
        'paragraph':" And yet it is one of the simplest ideas that anyone ever had. Here I want to persuade you how evolution explains the beginning of life on earth. Darwin uncovered the theory of evolution and the method of natural selection. The idea of evolution is probably one of the most important ideas that anyone has ever had. Today, thanks to Darwin, we know why life is the way it is. We can predict how life will be in the future. We can even postulate about the life on other planets. How amazing is that!",
        'question':"What is the topic of the paragraph?",
        'answers':['It tells us about the origin of life','The idea of climate change ','We can predict future','People ideas about evolution'],
        'next_quiz':"2"
    },
    "2":{
        'quiz_id':"2",
        'paragraph':"Opera refers to a dramatic art form, originating in Europe, in which the emotional content is conveyed to the audience as much through music, both vocal and instrumental, as it is through the lyrics. By contrast, in musical theater an actor's dramatic performance is primary, and the music plays a lesser role. The drama in opera is presented using the primary elements of theater such as scenery, costumes, and acting. However, the words of the opera, or libretto, are sung rather than spoken. The singers are accompanied by a musical ensemble ranging from a small instrumental ensemble to a full symphonic orchestra.",
        'question':" It is pointed out in the reading that opera ..",
        'answers': ['is a drama sung with the accompaniment of an orchestra','has developed under the influence of musical theater','is often performed in Europe',' is the most complex of all the performing arts'],
        'next_quiz':"3"
    },
    "3":{
        'quiz_id':"3",
        'paragraph':"Erosion of America's farmland by wind and water has been a problem since settlers first put the prairies and grasslands under the plow in the nineteenth century. By the 1930s, more than 282 million acres of farmland were damaged by erosion. After 40 years of conservation efforts, soil erosion has accelerated due to new demands placed on the land by heavy crop production. In the years ahead, soil erosion and the pollution problems it causes are likely to replace petroleum scarcity as the nation's most critical natural resource problem.",
        'question':"As we understand from the reading, today, soil erosion in America ..",
        'answers':['is worse than it was in the nineteenth century','happens so slowly that it is hardly noticed','causes humans to place new demands on the land',' is worse in areas which have a lot of petroleum production'],
        'next_quiz':"4"
    },
    "4":{
        'quiz_id':"4",
        'paragraph':"Dolphins are regarded as the friendliest creatures in the sea and stories of them helping drowning sailors have been common since Roman times. The more we learn about dolphins, the more we realize that their society is more complex than people previously imagined. They look after other dolphins when they are ill, care for pregnant mothers and protect the weakest in the community, as we do. Some scientists have suggested that dolphins have a language but it is much more probable that they communicate with each other without needing words. Could any of these mammals be more intelligent than man? Certainly the most common argument in favor of man's superiority over them that we can kill them more easily than they can kill us is the least satisfactory. On the contrary, the more we discover about these remarkable creatures, the less we appear superior when we destroy them.",
        'question':"It is clear from the passage that dolphins...",
        'answers':["have a reputation for being friendly to humans","are proven to be less intelligent than once thought","don't want to be with us as much as we want to be with them","are the most powerful creatures that live in the oceans"],
        'next_quiz':"end"
    }
}

## the answer is the first one in the answers array 
quiz2_questions = {
    "1":{
        'quiz_id':"1",
        'question':['1','2','3','The','secretary',"complained","after",'the','bread'],
        'answers': ['The secretary complained after the bread','A secretary complained after the breadi','A secretary complained after the effect','The secretary complained beyond the bread'],
        'next_quiz':'2'
    },
    "2":{
        'quiz_id':"2",
        'question':['1','2','3','The','bed','sniffed','like','a','jail'],
        'answers': ['The bed sniffed like a jail','The bed sniffed like a thrill','The bed sniffed against a thrill','A bed sniffed against a thrill'],
        'next_quiz':'3'
    },
    "3":{
        'quiz_id':"3",
        'question':['1','2','3','The','flag',"will","watch",'aside','from','the','dinosaur'],
        'answers': ['The flag will watch aside from the dinosaur','The flag will watch aside from a dinosaur','The flag will watch after the dinosaur','The flag will watch after the watch'],
        'next_quiz':'4'
    },
    "4":{
        'quiz_id':"4",
        'question':['1','2','3','A','leather','started','underneath','the','plant'],
        'answers': ['A leather started underneath the plant','A leather twisted underneath the plant','A leather started underneath the lunchroom','A leather twisted including the plant'],
        'next_quiz':'end'
    },
}

wpm = 0

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


@app.route('/learn/technique2/level')
def technique2_level():
    return render_template('technique2-level.html')


@app.route('/learn/technique2/<level>')
def technique2(level):
    with open('static/data/data.json', 'r') as f_data:
        data = json.load(f_data)

    reading = data["reading"]

    return render_template('technique2.html', data=data, reading=reading, level=level)

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
    question = quiz1_questions[value]
    return render_template('quiz/quiz-technique1.html', data = question)

@app.route('/quiz/technique1_questions/<value>', methods =['GET', 'POST'])
def technique1_questions(value):
    global wpm
    quiz = quiz1_questions[value[0]]
    wpm = value[2]
    return render_template('quiz/technique1-questions.html', quiz = quiz, current_speed = wpm )   


@app.route('/quiz/technique1_feedback/<value>')
def technique1_feedback(value):
    grade = value[0]
    next = value[1]
    wpm = value[2]
    return render_template('quiz/technique1-feedback.html', grade = grade, next = next, current_speed = wpm)   

# Technique2

@app.route('/quiz/technique2/intro')
def quiz1_technique2_intro():
    return render_template('quiz/quiz-technique2-intro.html')

@app.route('/quiz/technique2/<value>')
def quiz_technique2(value):
    question = quiz2_questions[value[0]]
    time = str(value[1])
    return render_template('quiz/quiz-technique2.html', data = [time,question]) 

@app.route('/quiz_questions/<value>', methods =['GET', 'POST'])
def quiz_questions(value):
    question = quiz2_questions[value]
    return render_template('quiz/technique2-questions.html', data = question)   

@app.route('/quiz/feedback/<value>')
def quiz_feedback(value):
    grade = value[0]
    next = value[1]
    return render_template('quiz/technique2-feedback.html', grade = grade, next =next)   

 # Quiz Ajax 
   

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="51000")
