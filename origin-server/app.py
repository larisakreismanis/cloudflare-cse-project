from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def headers():
    return jsonify({k: v for k, v in request.headers.items()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
