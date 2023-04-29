pip install -r ./requirements.txt

docker-compose up -d db

uvicorn main:app --port 9000   # app will start on port 9000


visit localhost:8000/docs  for api doc
