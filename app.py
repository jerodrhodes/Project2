import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify, render_template

engine = create_engine("sqlite:///covid_db.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

covid_stats = Base.classes.covid_stats
crime_stats = Base.classes.crime_stats
pop_stats = Base.classes.pop_stats

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/data')
def covid():
    session = Session(engine)

    covid = session.query(covid_stats.Zipcode, covid_stats.COVID19_Cases).order_by(covid_stats.COVID19_Cases).all()
    crime= session.query(crime_stats.Zipcode, crime_stats.Report_No).order_by(crime_stats.Zipcode).all()
    pop= session.query(pop_stats.Zipcode, pop_stats.Population).order_by(pop_stats.Zipcode).all()

    data_list = []
    covid_list = []
    for Zipcode, COVID19_Cases in covid:
        covid_dict = {}
        covid_dict['zipcode'] = Zipcode
        covid_dict['covid_cases'] = COVID19_Cases
        covid_list.append(covid_dict)
    data_list.append(covid_list)
    
    crime_list = []
    for Zipcode, Report_No in crime:
        crime_dict = {}
        crime_dict['zipcode'] = Zipcode
        crime_dict['crime_cases'] = Report_No
        crime_list.append(crime_dict)
    data_list.append(crime_list)

    pop_list = []
    for Zipcode, Population in pop:
        pop_dict = {}
        pop_dict['zipcode'] = Zipcode
        pop_dict['population'] = Population
        pop_list.append(pop_dict)
    data_list.append(pop_list)

    return jsonify(data_list)


if __name__ == "__main__":
    app.run()

    
