create table Users (
	id INT PRIMARY KEY,
	name VARCHAR(225),
	email VARCHAR(225),
	phone VARCHAR(20),
	address VARCHAR(255),
    password VARCHAR(255),
    avatar VARCHAR(255),
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE Cars (
    id INT PRIMARY KEY,
    user_id INT,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Orders (
    id INT PRIMARY KEY,
    customer_id INT,
    product_id INT, -- Reference to the Products table
    quantity INT,
    price DECIMAL(10, 2),
    total DECIMAL(10, 2),
    date DATE,
    status VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Appointments (
    id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    car VARCHAR(255),
    service VARCHAR(255),
    date DATE,
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Staff (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(50),
    email VARCHAR(255),
    avatar VARCHAR(255)
);

CREATE TABLE Services (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2)
);

CREATE TABLE AppointmentServices (
    appointment_id INT,
    service_id INT,
	mechanic_id INT,
    PRIMARY KEY (appointment_id, service_id, mechanic_id),
    FOREIGN KEY (appointment_id) REFERENCES Appointments(id),
    FOREIGN KEY (service_id) REFERENCES Services(id),
	FOREIGN KEY (mechanic_id) REFERENCES Staff(id)
);

CREATE TABLE Cart (
    id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
	
);

-- Create Payments Table
CREATE TABLE Payments (
    paymentID INT PRIMARY KEY,
    orderID INT,
    amount DECIMAL(10, 2),
    paymentDate DATE,
    paymentStatus VARCHAR(50),
    FOREIGN KEY (orderID) REFERENCES Orders(id)
);

-- Create Products Table
CREATE TABLE Products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    reorder INT,
    price DECIMAL(10, 2),
    serviceId INT,
    image VARCHAR(255),
    description TEXT
);

CREATE TABLE Blogs (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    tags VARCHAR(255),
    category VARCHAR(255),
    image VARCHAR(255),
    content TEXT,
    createdAt DATE
);

ALTER TABLE orders
ADD CONSTRAINT product_id_fkey
FOREIGN KEY (product_id) REFERENCES Products(id);

