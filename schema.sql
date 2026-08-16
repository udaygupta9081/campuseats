CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP
);

CREATE TABLE addresses (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    label VARCHAR(50),
    address_line VARCHAR(255),
    city VARCHAR(100),
    pincode VARCHAR(10),
    is_default BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE login (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    last_login_at TIMESTAMP,
    failed_attempts INT,
    account_locked BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE restaurants (
    id BIGINT PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    address VARCHAR(255),
    phone VARCHAR(20),
    is_open BOOLEAN,
    created_at TIMESTAMP
);

CREATE TABLE menus (
    id BIGINT PRIMARY KEY,
    restaurant_id BIGINT,
    name VARCHAR(150),
    description TEXT,
    is_available BOOLEAN,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE prices (
    id BIGINT PRIMARY KEY,
    menu_id BIGINT,
    price DECIMAL(10,2),
    effective_from TIMESTAMP,
    effective_to TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE carts (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    status VARCHAR(30),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY,
    cart_id BIGINT,
    menu_id BIGINT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    restaurant_id BIGINT,
    total_amount DECIMAL(10,2),
    status VARCHAR(30),
    delivery_address VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE transactions (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    user_id BIGINT,
    amount DECIMAL(10,2),
    payment_method VARCHAR(30),
    status VARCHAR(30),
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP
);

CREATE TABLE refunds (
    id BIGINT PRIMARY KEY,
    transaction_id BIGINT,
    amount DECIMAL(10,2),
    reason VARCHAR(255),
    status VARCHAR(30),
    created_at TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

CREATE TABLE riders (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    vehicle_type VARCHAR(50),
    status VARCHAR(30),
    created_at TIMESTAMP
);

CREATE TABLE assignments (
    id BIGINT PRIMARY KEY,
    order_id BIGINT,
    rider_id BIGINT,
    status VARCHAR(30),
    assigned_at TIMESTAMP,
    delivered_at TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(id)
);

CREATE TABLE message_log (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    type VARCHAR(30),
    channel VARCHAR(30),
    message TEXT,
    status VARCHAR(30),
    sent_at TIMESTAMP
);
