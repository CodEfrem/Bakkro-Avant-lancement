CREATE TABLE user_favorites (
    user_id UUID REFERENCES users(id),
    property_id UUID REFERENCES properties(id),
    PRIMARY KEY (user_id, property_id)
);
