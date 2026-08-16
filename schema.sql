-- CampusEats Database Schema
-- Each service owns its own tables.
-- Cross-service IDs are logical references and are NOT foreign keys.

-- =========================================================
-- 1. ACCOUNTS SERVICE
-- Owns: users, addresses, login
-- =========================================================

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE addresses (
    address_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_addresses_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE login (
    login_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    last_login TIMESTAMP NULL,
    status VARCHAR(20) NOT NULL,

    CONSTRAINT fk_login_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- =========================================================
-- 2. CATALOGUE SERVICE
-- Owns: restaurants, menus, prices
-- =========================================================

CREATE TABLE restaurants (
    restaurant_id BIGINT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE menus (
    menu_id BIGINT PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    availability BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_menus_restaurant
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE prices (
    price_id BIGINT PRIMARY KEY,
    menu_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_prices_menu
        FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);


-- =========================================================
-- 3. ORDERS SERVICE
-- Owns: carts, cart_items, orders, order_items, order_status
-- =========================================================

CREATE TABLE carts (
    cart_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL
    -- user_id is a logical reference to Accounts Service
);

CREATE TABLE cart_items (
    cart_item_id BIGINT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    menu_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id) REFERENCES carts(cart_id)
    -- menu_id is a logical reference to Catalogue Service
);

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL
    -- user_id and address_id are logical references to Accounts Service
);

CREATE TABLE order_items (
    order_item_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_id BIGINT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
    -- menu_id is a logical reference to Catalogue Service
);

CREATE TABLE order_status (
    status_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    changed_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_order_status_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
);


-- =========================================================
-- 4. PAYMENTS SERVICE
-- Owns: transactions, refunds
-- =========================================================

CREATE TABLE transactions (
    transaction_id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL
    -- order_id is a logical reference to Orders Service
);

CREATE TABLE refunds (
    refund_id BIGINT PRIMARY KEY,
    transaction_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    reason VARCHAR(255) NULL,
    status VARCHAR(30) NOT NULL,

    CONSTRAINT fk_refunds_transaction
        FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
);


-- =========================================================
-- 5. DELIVERY SERVICE
-- Owns: riders, assignments
-- =========================================================

CREATE TABLE riders (
    rider_id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    vehicle_type VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL
);

CREATE TABLE assignments (
    assignment_id BIGINT PRIMARY KEY,
    rider_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    assigned_at TIMESTAMP NOT NULL,
    delivered_at TIMESTAMP NULL,

    CONSTRAINT fk_assignments_rider
        FOREIGN KEY (rider_id) REFERENCES riders(rider_id)
    -- order_id is a logical reference to Orders Service
);


-- =========================================================
-- 6. NOTIFICATIONS SERVICE
-- Owns: message_log
-- =========================================================

CREATE TABLE message_log (
    message_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_id BIGINT NULL,
    channel VARCHAR(20) NOT NULL,
    message_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    sent_at TIMESTAMP NULL
    -- user_id is a logical reference to Accounts Service
    -- order_id is a logical reference to Orders Service
);
