# 📦 SmartStock – Inventory Management System

## 🚀 Project Overview

**SmartStock** is a modular Inventory Management System designed to digitize and simplify stock-related operations within a business.

It replaces manual registers, Excel sheets, and scattered inventory tracking with a centralized and easy-to-use web application.

The system helps inventory managers and warehouse staff manage products, stock receipts, deliveries, transfers, adjustments, and stock history from a single dashboard.

---

## 🎯 Project Objective

The main objective of SmartStock is to provide:

* Centralized inventory management
* Easy product and stock management
* Real-time stock updates
* Low-stock alerts
* Warehouse and location tracking
* Complete stock movement history
* Simple and user-friendly interface

---

## 👥 Target Users

### Inventory Managers

* Manage products
* Monitor stock levels
* Track receipts and deliveries
* Perform stock adjustments
* Monitor inventory activities

### Warehouse Staff

* Receive stock
* Deliver stock
* Transfer stock between locations
* Update physical stock
* Check product availability

---

## ✨ Key Features

### 🔐 Authentication

* Login system
* New user registration
* Password reset interface
* Demo OTP verification
* Role-based user information

### 📊 Dashboard

The dashboard provides an overview of:

* Total products
* Low-stock products
* Out-of-stock products
* Pending receipts
* Pending deliveries
* Recent inventory operations
* Quick action buttons

### 📦 Product Management

Users can:

* Add new products
* Update product information
* Delete products
* Assign SKU/code
* Select categories
* Define units of measurement
* Set reorder levels
* Track current stock
* Assign warehouse locations

### 📥 Stock Receipts

The receipt module allows users to:

* Select products
* Enter supplier details
* Enter received quantities
* Validate receipts
* Automatically increase stock
* Record the transaction in the stock ledger

### 📤 Delivery Orders

The delivery module supports:

* Product selection
* Quantity entry
* Stock availability checking
* Stock deduction
* Delivery validation
* Automatic ledger updates

### 🔄 Internal Stock Transfers

Users can transfer products between:

* Main Warehouse
* Production Rack
* Finished Goods
* Other inventory locations

The transfer is recorded in the stock movement history.

### 🛠️ Inventory Adjustments

The adjustment module allows users to compare:

**Recorded Stock vs Physical Stock**

The system automatically calculates the difference and updates the inventory.

### 📒 Stock Ledger

The stock ledger maintains a history of inventory activities, including:

* Initial stock
* Receipts
* Deliveries
* Transfers
* Adjustments

Users can also search and filter ledger records and export the ledger as CSV.

### ⚠️ Low Stock Alerts

Products are automatically identified when their stock reaches or falls below the defined reorder level.

### 🔎 Search and Filters

Users can search and filter products based on:

* Product name
* SKU
* Category
* Stock status

### 🏭 Warehouse Management

The system provides an overview of stock available at different locations.

---

## 🛠️ Technologies Used

| Technology   | Purpose                                  |
| ------------ | ---------------------------------------- |
| HTML5        | Web page structure                       |
| CSS3         | Styling and responsive design            |
| JavaScript   | Application logic and dynamic operations |
| LocalStorage | Browser-based data storage               |

---

## 📁 Project Structure

```text
SmartStock/
│
├── index.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

---

## 💻 How to Run the Project

### Step 1: Download or Clone the Repository

Download the project files from GitHub.

### Step 2: Open the Project

Open the project folder in **VS Code** or another code editor.

### Step 3: Run the Application

Open:

```text
index.html
```

in a web browser.

You can also use the **Live Server** extension in VS Code.

---

## 🔑 Demo Login

Use the following account to test the application:

```text
Email: admin@smartstock.com
Password: admin123
```

---

## 🧪 Example Inventory Operation

For example, consider a product:

```text
Product: Steel Rods
SKU: STL001
Category: Construction
Unit: Kg
Initial Stock: 100
```

### Receive Stock

```text
Initial Stock = 100 Kg
Received = 50 Kg
New Stock = 150 Kg
```

### Transfer Stock

```text
Main Warehouse → Production Rack
```

The product location is updated.

### Delivery

```text
Available Stock = 150 Kg
Delivered = 20 Kg
Remaining Stock = 130 Kg
```

### Adjustment

If the physical stock is found to be:

```text
Recorded Stock = 130 Kg
Physical Stock = 127 Kg
Adjustment = -3 Kg
```

The final stock becomes:

```text
127 Kg
```

All these operations are recorded in the stock ledger.

---

## 🏆 Hackathon Value

SmartStock demonstrates how a business can move from manual inventory tracking to a centralized digital system.

### Key benefits

* Reduces manual data entry
* Reduces inventory tracking errors
* Provides quick stock visibility
* Improves warehouse operations
* Makes stock movement traceable
* Provides low-stock notifications
* Simplifies inventory management
* Provides a responsive and user-friendly interface

---

## 📱 Responsive Design

The application is designed to work on:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

## 🔮 Future Scope

The current project is a frontend prototype. It can be extended with:

* MySQL database
* Backend API
* Real user authentication
* Real OTP through email/SMS
* Multi-user access
* Role-based permissions
* Real-time database synchronization
* Barcode/QR code scanning
* Supplier management
* Purchase orders
* Sales orders
* Advanced analytics
* Inventory reports
* Cloud deployment
* Multiple warehouse stock quantities

---

## ⚠️ Current Prototype Limitations

This hackathon version uses **browser LocalStorage** for demonstration purposes.

Therefore:

* Data is stored only in the current browser.
* It is not shared between different devices.
* Authentication is frontend-based.
* OTP verification is simulated.
* There is no centralized backend database.

For a production system, a backend and database should be added.

---

## 📸 Screenshots

Add your project screenshots here after uploading them to GitHub.

Example:

```markdown
## Screenshots

![Dashboard](screenshots/dashboard.png)

![Products](screenshots/products.png)

![Stock Ledger](screenshots/ledger.png)
```

---

## 👨‍💻 Project Information

**Project Name:** SmartStock – Inventory Management System

**Project Type:** Hackathon Project

**Category:** Web Application / Inventory Management

**Frontend:** HTML, CSS, JavaScript

**Storage:** LocalStorage
