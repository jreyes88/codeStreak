-- CREATE DATABASE codeStreak;
USE codeStreak;
CREATE TABLE codeStreak_Times (
	startTime DATE, TIMESTAMP VARCHAR(30),
    endTimer DATE, TIMESTAMP VARCHAR(30),
    endDate DATE, DATE VARCHAR(30),
    diffTime INTEGER(10),
    workedTimes VARCHAR(100),
    workedDates VARCHAR(300)
);