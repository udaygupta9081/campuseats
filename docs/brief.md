# CampusEats — System Brief

## 1. What

CampusEats is a campus food ordering and management system. It connects students, faculty, and staff with food vendors available on campus. Users can discover vendors, view menus, select food items, place orders, make payments, and track their orders.

Food vendors can manage their menus, receive customer orders, and update order statuses. Campus administrators can manage users, vendors, and other system information.

The main purpose of CampusEats is to provide a single platform for managing the complete campus food-ordering process.

---

## 2. Who

CampusEats is used by the following groups:

### Students

Students can register, browse food vendors, view menus, add food to their cart, place orders, make payments, track orders, and submit reviews.

### Faculty and Staff

Faculty and staff can browse available food vendors, view menus, place orders, make payments, track orders, and provide reviews.

### Food Vendors

Food vendors can manage their profiles and menus, add or remove menu items, receive orders, accept or reject orders, and update order statuses.

### Campus Administrators

Administrators can manage users and vendors, monitor orders, and maintain the overall CampusEats system.

---

## 3. Nouns — Things and Services

The nouns represent the important things, entities, and services that exist in the CampusEats system.

### Domain Nouns

* **User** — A person using the CampusEats platform.
* **Student** — A campus user who can order food.
* **Faculty/Staff** — Campus members who can use the ordering system.
* **Vendor** — A food provider operating on campus.
* **Restaurant/Food Outlet** — A location where food is prepared and sold.
* **Menu** — A collection of food items offered by a vendor.
* **Menu Item** — An individual food or beverage available for purchase.
* **Cart** — A temporary collection of items selected by a user.
* **Order** — A submitted request for one or more menu items.
* **Payment** — The transaction associated with an order.
* **Delivery/Pickup** — The method used to receive an order.
* **Review** — Feedback submitted by a user.
* **Order Status** — The current state of an order.

### Service Nouns

The main services/capabilities of CampusEats are:

* **User/Authentication Service** — Handles registration, login, and user information.
* **Vendor Service** — Manages food vendors and their information.
* **Menu/Catalog Service** — Manages vendors, menus, and menu items.
* **Cart Service** — Manages the items a user has selected before ordering.
* **Order Service** — Creates and manages food orders and their statuses.
* **Payment Service** — Handles payment processing and payment status.
* **Delivery/Order Tracking Service** — Handles delivery or pickup information and order tracking.
* **Review Service** — Handles customer reviews and feedback.
* **Notification Service** — Sends users updates about orders and other relevant events.
* **Administration Service** — Provides administrative management of users, vendors, and system information.

---

## 4. Verbs — Actions, Tasks, and Contracts

The verbs represent the actions that users, vendors, and services perform in CampusEats.

### User and Authentication Actions

* **Register** — Create a new user account.
* **Login** — Authenticate an existing user.
* **Update Profile** — Modify user information.

### Food Discovery Actions

* **Search** — Find vendors or menu items.
* **Browse** — Explore available food vendors.
* **View Menu** — Retrieve a vendor's menu.
* **View Item** — Retrieve information about a particular menu item.

### Cart Actions

* **Add Item** — Add a menu item to the cart.
* **Remove Item** — Remove an item from the cart.
* **Update Cart** — Change the quantity or contents of the cart.
* **View Cart** — Retrieve the current cart contents.

### Order Actions

* **Create Order** — Create a new order from the user's cart.
* **Place Order** — Submit an order for processing.
* **Accept Order** — Allow a vendor to begin processing an order.
* **Reject Order** — Reject an order when it cannot be fulfilled.
* **Cancel Order** — Cancel an eligible order.
* **Update Order Status** — Change an order's current state.
* **Track Order** — Retrieve the current status of an order.

### Payment Actions

* **Make Payment** — Submit payment for an order.
* **Process Payment** — Process a payment transaction.
* **Verify Payment** — Confirm the payment result.
* **Refund Payment** — Return payment for an eligible cancelled order.

### Vendor and Menu Actions

* **Create Vendor** — Add a food vendor to the system.
* **Manage Vendor** — Update vendor information.
* **Create Menu** — Create a vendor's menu.
* **Add Menu Item** — Add food to a menu.
* **Update Menu Item** — Change item information or availability.
* **Remove Menu Item** — Remove an item from a menu.

### Review Actions

* **Submit Review** — Submit feedback about a vendor or food item.
* **View Reviews** — Retrieve reviews and ratings.

### Notification Actions

* **Send Notification** — Notify a user about an order or other event.
* **Receive Notification** — Allow a user to receive system updates.

---

## 5. Summary

CampusEats provides a complete campus food-ordering platform connecting users with food vendors. Users can discover food, manage their carts, place and pay for orders, track orders, and submit reviews. Vendors can manage menus and process orders, while administrators manage the overall platform.

The **domain nouns** represent the main things and data in the system, such as users, vendors, menus, orders, and payments. The **service nouns** represent the major capabilities of the system, such as Authentication, Menu, Cart, Order, Payment, Notification, and Review services.

The **verbs** represent the actions, tasks, and operations performed by users and services, such as registering, searching, adding items, creating orders, processing payments, tracking orders, and managing menus.
