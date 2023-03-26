-- SQL Script to create tables in the database according to Deliverable 1 schema
CREATE TABLE IF NOT EXISTS Headquarters(
	CompanyName Varchar(20) PRIMARY KEY,
	NumberOfHotels Integer,
	Address Varchar(20)
);

CREATE TABLE IF NOT EXISTS HeadquartersPhone(
	CompanyName Varchar(20),
	phoneNumber VarChar(20) PRIMARY KEY,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters
);

CREATE TABLE IF NOT EXISTS HeadquartersEmail(
	CompanyName Varchar(20),
	email VarChar(40) PRIMARY KEY,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters
);

CREATE TABLE IF NOT EXISTS Hotel (
	HotelID Integer PRIMARY KEY,
	CompanyName Varchar(20),
	Address Varchar(20),
	Category Varchar(20),
	NumberOfRooms Integer,
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
	CompanyName Varchar(20),
	HotelID Integer,
	ViewType Varchar(20),
	Price Integer,
	Capacity Integer,
	Expandable Varchar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS RoomIssue(
	Issue Varchar(20) PRIMARY KEY,
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (RoomNumber) REFERENCES Room
);

CREATE TABLE IF NOT EXISTS RoomAmenity(
	Amenity Varchar(20) PRIMARY KEY,
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (RoomNumber) REFERENCES Room
);

CREATE TABLE IF NOT EXISTS Customer (
	CustomerID Integer PRIMARY KEY,
	SIN Varchar(20),
	RegistrationDate Date,
	FirstName Varchar(20),
	LastName Varchar(20),
	Address Varchar(20)
);

CREATE TABLE IF NOT EXISTS Booking (
	CheckInDate Date PRIMARY KEY,
	CheckOutDate Date,
	HotelID Integer,
	RoomNumber Integer,
	CustomerID Integer,
	CompanyName Varchar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel,
	FOREIGN KEY (CustomerID) REFERENCES Customer,
	FOREIGN KEY (RoomNumber) REFERENCES Room
);

CREATE TABLE IF NOT EXISTS Employee (
	EmployeeID Integer PRIMARY KEY,
	SIN Varchar(20),
	HotelID Integer,
	CompanyName Varchar(20),
	FirstName Varchar(20),
	LastName Varchar(20),
	Address Varchar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);


CREATE TABLE IF NOT EXISTS Manages (
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(20),
	PRIMARY KEY (EmployeeID, HotelID, CompanyName),
	FOREIGN KEY (EmployeeID) REFERENCES Employee,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);

CREATE TABLE IF NOT EXISTS EmployeeRole (
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(20),
	Role Varchar(20) PRIMARY KEY,
	FOREIGN KEY (EmployeeID) REFERENCES Employee,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters,
	FOREIGN KEY (HotelID) REFERENCES Hotel
);