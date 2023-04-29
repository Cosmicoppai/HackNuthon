
git clone https://github.com/Ayur-service/engine.git

./start.sh

Check API docs:

user_routes /docs
auth_routes /auth/docs
hospital_routes /hospital/docs
checkup_routes /checkups/docs

Create Hospital admin:
docker exec -it auth python . --create-admin


!Alert

add suffix to respective apis according to service

Example:
    hospital_service :- /hospital
    auth_service:- /auth
    checkups_service:- /checkups
    user_service:- / (no_prefix)
