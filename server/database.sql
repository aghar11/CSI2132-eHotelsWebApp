CREATE DATABASE postgres;




CREATE TABLE IF NOT EXISTS Headquarters(
	CompanyName Varchar(225) PRIMARY KEY,
	NumberOfHotels Integer NOT NULL,
	StreetNumber Integer NOT NULL,
	StreetName Varchar(225) NOT NULL,
	AptNumber Varchar(25),
	City Varchar(225) NOT NULL,
	State Varchar(225) NOT NULL,
	PostalCode Varchar(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS HeadquartersPhone(
	CompanyName Varchar(225),
	phoneNumber VarChar(20) PRIMARY KEY,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters
);

CREATE TABLE IF NOT EXISTS HeadquartersEmail(
	CompanyName Varchar(225),
	email VarChar(40) PRIMARY KEY,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters
);

CREATE TABLE IF NOT EXISTS Hotel (
	HotelID Integer PRIMARY KEY,
	CompanyName Varchar(225) NOT NULL,
	Category Varchar(225) NOT NULL,
	NumberOfRooms Integer NOT NULL,
	StreetNumber Integer NOT NULL,
	StreetName Varchar(225) NOT NULL,
	AptNumber Varchar(25),
	City Varchar(225) NOT NULL,
	State Varchar(225) NOT NULL,
	PostalCode Varchar(25) NOT NULL,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters
);

CREATE TABLE IF NOT EXISTS HotelPhone(
	HotelID Integer,
	phoneNumber VarChar(20) PRIMARY KEY,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS HotelEmail(
	HotelID Integer,
	email VarChar(40) PRIMARY KEY,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS Room (
	RoomNumber Integer PRIMARY KEY,
	CompanyName Varchar(225),
	HotelID Integer,
	ViewType Varchar(225) NOT NULL,
	Price Integer NOT NULL,
	Capacity Integer NOT NULL,
	Expandable Varchar(225) NOT NULL,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS RoomIssue(
	Issue Varchar(20) PRIMARY KEY,
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (RoomNumber) REFERENCES Room
);

CREATE TABLE IF NOT EXISTS RoomAmenity(
	Amenity Varchar(20) PRIMARY KEY,
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (RoomNumber) REFERENCES Room
);

CREATE TABLE IF NOT EXISTS Customer (
	CustomerID Integer PRIMARY KEY,
	SIN Varchar(20) NOT NULL,
	RegistrationDate Date NOT NULL,
	FirstName Varchar(20) NOT NULL,
	LastName Varchar(20) NOT NULL,
	StreetNumber Integer NOT NULL,
	StreetName Varchar(225) NOT NULL,
	AptNumber Varchar(25),
	City Varchar(225) NOT NULL,
	State Varchar(225) NOT NULL,
	PostalCode Varchar(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS Booking (
	CheckInDate Date,
	CheckOutDate Date,
	HotelID Integer,
	RoomNumber Integer,
	CustomerID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (CustomerID) REFERENCES Customer,
	FOREIGN KEY (RoomNumber) REFERENCES Room,
	PRIMARY KEY (CheckInDate, CheckOutDate)
);

CREATE TABLE IF NOT EXISTS Employee (
	EmployeeID Integer PRIMARY KEY,
	SIN Varchar(20) NOT NULL,
	HotelID Integer,
	CompanyName Varchar(225),
	FirstName Varchar(20) NOT NULL,
	MiddleName Varchar(20),
	LastName Varchar(20) NOT NULL,
	StreetNumber Integer NOT NULL,
	StreetName Varchar(225) NOT NULL,
	AptNumber Varchar(25),
	City Varchar(225) NOT NULL,
	State Varchar(225) NOT NULL,
	PostalCode Varchar(25) NOT NULL,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);


CREATE TABLE IF NOT EXISTS Manages (
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	PRIMARY KEY (EmployeeID, HotelID, CompanyName),
	FOREIGN KEY (EmployeeID) REFERENCES Employee,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS EmployeeRole (
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	Role Varchar(20) PRIMARY KEY,
	FOREIGN KEY (EmployeeID) REFERENCES Employee,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);