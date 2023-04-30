<div align="center">

![Banner](/frontend/src/assets/images/logos/ayur_logo_big.png)


[![GitHub forks](https://img.shields.io/github/forks/cosmicoppai/HackNuthon?color=lightgrey)](https://github.com/Cosmicoppai/HackNuthon/network)
[![GitHub stars](https://img.shields.io/github/stars/cosmicoppai/HackNuthon?color=lightgrey)](https://github.com/Cosmicoppai/HackNuthon/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Cosmicoppai/HackNuthon?color=lightgrey)](https://github.com/Cosmicoppai/HackNuthon/issues)
[![MIT License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![image](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
</div>

# AYUR

> In life threatening situations, it is important to receive critical information about the patient. To avail the patient’s past medical history, we need a comprehensive system to store and access this data efficaciously. 


<br>

## 🐑 Cloning the Repository [HackNuthon]
```cli
git clone https://github.com/Cosmicoppai/HackNuthon.git
```

## 🎨 Setting up FrontEnd

1) Install node modules

```cli
npm install
```

2) Run Frontend

```cli
npm start
```

<br>

## 💾 Databases

1) MongoDB for Microservices
2) PostgreSQL for User Authentication

## 📚 Caching

* Redis

## 🛣️ Routing

* NginX

## 🚢 Containerization

* Docker

## 🐜 Running the microservices

```cli
./start.sh
```

## 🕵️‍♂️ Creating Hospital Admin
```cli
docker exec -it auth python . --create-admin
```

## 🖼️ Interface

1) User
2) Hospital Admin

## 📝 API Docs

```cli
user_routes /docs
auth_routes /auth/docs
hospital_routes /hospital/docs
checkup_routes /checkups/docs
```

`Add suffix to respective apis according to service`

Example

    ```
    hospital_service : /hospital
    auth_service : /auth
    checkups_service : /checkups
    user_service : /
    ```

## 🎥 Demo

![search](/frontend/src/assets/images/login.jpg)
![search](/frontend/src/assets/images/dashboard.jpg)
![search](/frontend/src/assets/images/reports.jpg)
![search](/frontend/src/assets/images/user_account.jpg)

<video src='https://user-images.githubusercontent.com/66635990/235341310-1ae6de76-dc21-44c3-86b9-111bbc6dc757.mp4' width=180></video>
