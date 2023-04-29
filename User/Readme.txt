pip install -r ./requirements.txt

_______________________________________________________

To Test:

docker-compose up -d checkup_db

uvicorn main:app --port 8002   # app will start on port 8000


visit localhost:8002/docs  for api doc