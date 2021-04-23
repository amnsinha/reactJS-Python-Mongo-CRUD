from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import yaml

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/universities-dev")
# db = client.lin_flask
db = client['universities-dev']
CORS(app)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/university', methods=['POST', 'GET'])
def data():
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        name = body['name']
        alpha_two_code = body['alpha_two_code']
        country = body['country']
        web_page = body['web_page']
        domain = body['domain']

        db['university'].insert_one({
            "name": name,
            "alpha_two_code": alpha_two_code,
            "country": country,
            "web_page": web_page,
            "domain": domain
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'name': name
        })

    # GET all data from database
    if request.method == 'GET':
        allData = db['university'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            name = data['name']
            web_page = data['web_page']
            dataDict = {
                'id': str(id),
                'name': name,
                'web_page': web_page,

            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


@app.route('/university/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):
    # GET a specific data by id
    if request.method == 'GET':
        data = db['university'].find_one({'_id': ObjectId(id)})
        id = data['_id']
        name = data['name']
        web_page = data['web_page']
        dataDict = {
            'id': str(id),
            'name': name,
            'web_page': web_page
        }
        print(dataDict)
        return jsonify(dataDict)

    # DELETE a data
    if request.method == 'DELETE':
        db['university'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        name = body['name']
        web_page = body['web_page']
        country = body['country']
        alpha_two_code = body['alpha_two_code']
        domain = body['domain']

        db['university'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "name": name,
                    "web_page": web_page,
                    "alpha_two_code": alpha_two_code,
                    "domain": domain,
                    "country": country,
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})


@app.route('/university/search/<keyword>', methods=['GET', 'DELETE', 'PUT'])
def fetchdata(keyword):
    # GET a specific data by id
    if request.method == 'GET':
        regex_query = {"name": {"$regex": keyword}}
        allData = db['university'].find(regex_query)
        dataJson = []
        for data in allData:
            id = data['_id']
            name = data['name']
            web_page = data['web_page']
            dataDict = {
                'id': str(id),
                'name': name,
                'web_page': web_page,

            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


if __name__ == '__main__':
    app.debug = True
    app.run()
