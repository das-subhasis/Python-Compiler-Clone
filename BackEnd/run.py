import os
from src import create_app
import dotenv
dotenv.load_dotenv()

if __name__ == "__main__":
    # load the flask app
    app = create_app()
    # exexute the server
    app.run(debug=True, port=os.environ.get('PORT'))
