CREATE SCHEMA IF NOT EXISTS ayur_hospital;

SET SEARCH_PATH TO ayur_hospital;


CREATE TABLE IF NOT EXISTS address (
    id SERIAL primary key ,
    state varchar(50) NOT NULL ,
    district varchar(50) NOT NULL ,
    city varchar(50) NOT NULL ,
    landmark varchar(100) NOT NULL ,
    pin_code integer NOT NULL

    constraint valid_pin_code check ( pin_code between 100000 and 999999)
);


CREATE TABLE IF NOT EXISTS hospitals (
    id varchar(15) PRIMARY KEY ,
    name varchar(300) NOT NULL ,
    registration_number varchar(300) NOT NULL ,
    address INTEGER NOT NULL ,

    constraint address_fk FOREIGN KEY(address) REFERENCES address(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS doctors (
    hospital_id varchar(15) NOT NULL ,
    id varchar(15) PRIMARY KEY,
    registration_number varchar(30) NOT NULL ,
    name varchar(200) NOT NULL ,
    sex CHAR NOT NULL ,
    speciality varchar(100) ARRAY NOT NULL ,

    constraint hospital_id_fk FOREIGN KEY(hospital_id) REFERENCES hospital(id) ON DELETE CASCADE
);