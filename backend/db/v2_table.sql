-- Script de création des tables
-- Table des utilisateurs (Utilise '_user' pour éviter les conflits avec le mot-clé SQL 'user')
CREATE TABLE IF NOT EXISTS _user (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    profile_image_url VARCHAR(255),
    role VARCHAR(50) CHECK (role IN ('USER', 'ADMIN'))
);
-- Table des services
CREATE TABLE IF NOT EXISTS service (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description VARCHAR(2000),
    full_description TEXT,
    duration VARCHAR(255),
    price VARCHAR(255),
    popular BOOLEAN DEFAULT FALSE,
    image VARCHAR(1000),
    rating DOUBLE PRECISION,
    reviews INTEGER,
    location VARCHAR(255),
    provider_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE
);
-- Table pour la galerie
CREATE TABLE IF NOT EXISTS service_gallery (
    service_id BIGINT REFERENCES service(id) ON DELETE CASCADE,
    gallery VARCHAR(1000)
);
-- Table des réservations
CREATE TABLE IF NOT EXISTS reservation (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES _user(id),
    service_id BIGINT REFERENCES service(id),
    provider_name VARCHAR(255),
    date_time TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (
        status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_user_email ON _user(email);
CREATE INDEX IF NOT EXISTS idx_reservation_user ON reservation(user_id);
CREATE INDEX IF NOT EXISTS idx_reservation_date ON reservation(date_time);