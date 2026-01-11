-- Table Payment
CREATE TABLE IF NOT EXISTS payment (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'MGA',
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(255) UNIQUE,
    provider_reference VARCHAR(500),
    metadata TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES _user(id) ON DELETE CASCADE,
    CONSTRAINT fk_payment_service FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE
);
-- Index pour améliorer les performances
CREATE INDEX idx_payment_user_id ON payment(user_id);
CREATE INDEX idx_payment_service_id ON payment(service_id);
CREATE INDEX idx_payment_status ON payment(status);
CREATE INDEX idx_payment_transaction_id ON payment(transaction_id);
CREATE INDEX idx_payment_created_at ON payment(created_at);