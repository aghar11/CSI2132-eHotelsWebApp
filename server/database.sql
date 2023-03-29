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
	phoneNumber VarChar(20),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters(CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (phoneNumber, CompanyName)
);

CREATE TABLE IF NOT EXISTS HeadquartersEmail(
	CompanyName Varchar(225),
	email VarChar(40),
	FOREIGN KEY (CompanyName) REFERENCES Headquarters(CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (email, CompanyName)
);

CREATE TABLE IF NOT EXISTS Hotel (
	HotelID Integer UNIQUE,
	CompanyName Varchar(225) NOT NULL,
	Category Varchar(225) NOT NULL,
	NumberOfRooms Integer NOT NULL,
	StreetNumber Integer NOT NULL,
	StreetName Varchar(225) NOT NULL,
	AptNumber Varchar(25),
	City Varchar(225) NOT NULL,
	State Varchar(225) NOT NULL,
	PostalCode Varchar(25) NOT NULL,
	FOREIGN KEY (CompanyName) REFERENCES Headquarters(CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS HotelPhone(
	HotelID Integer,
	CompanyName Varchar(225),
	phoneNumber VarChar(20),
	FOREIGN KEY (HotelID, CompanyName) REFERENCES Hotel(HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (phoneNumber, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS HotelEmail(
	HotelID Integer,
	CompanyName Varchar(225),
	email VarChar(40),
	FOREIGN KEY (HotelID, CompanyName) REFERENCES Hotel(HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (email, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS Room (
	RoomNumber Integer,
	CompanyName Varchar(225),
	HotelID Integer,
	ViewType Varchar(225) NOT NULL,
	Price Integer NOT NULL,
	Capacity Integer NOT NULL,
	Expandable Varchar(225) NOT NULL,
	FOREIGN KEY (HotelID, CompanyName) REFERENCES Hotel(HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (RoomNumber, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS RoomIssue(
	Issue Varchar(20),
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (RoomNumber, HotelID, CompanyName) REFERENCES Room(RoomNumber, HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (Issue, RoomNumber, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS RoomAmenity(
	Amenity Varchar(20),
	RoomNumber Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (RoomNumber, HotelID, CompanyName) REFERENCES Room(RoomNumber, HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (Amenity, RoomNumber, HotelID, CompanyName)
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
	Status Varchar(20),
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
	FOREIGN KEY (RoomNumber, HotelID, CompanyName) REFERENCES Room(RoomNumber, HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (CheckInDate, CheckOutDate, RoomNumber, HotelID, CompanyName, CustomerID)
);

CREATE TABLE IF NOT EXISTS Employee (
	EmployeeID Integer,
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
	FOREIGN KEY (HotelID, CompanyName) REFERENCES Hotel(HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (EmployeeID, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS Manages (
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (EmployeeID, HotelID, CompanyName) REFERENCES Employee(EmployeeID, HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (EmployeeID, HotelID, CompanyName)
);

CREATE TABLE IF NOT EXISTS EmployeeRole (
	Role Varchar(225),
	EmployeeID Integer,
	HotelID Integer,
	CompanyName Varchar(225),
	FOREIGN KEY (EmployeeID, HotelID, CompanyName) REFERENCES Employee(EmployeeID, HotelID, CompanyName) ON DELETE CASCADE,
	PRIMARY KEY (Role, EmployeeID, HotelID, CompanyName)
);