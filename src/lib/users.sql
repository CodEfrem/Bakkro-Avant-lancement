CREATE TYPE typeOtpENUM AS ENUM ('sms', 'whatsapp');
CREATE TYPE subscriptionTypeEnum AS ENUM ('free', 'preniumDay', 'preniumWeek', 'preniumMonth');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMPTZ,
    update_at TIMESTAMPTZ,
    firstName VARCHAR,
    lastName VARCHAR,
    phone VARCHAR,
    typeotp typeOtpENUM,
    password VARCHAR,
    subscription subscriptionTypeEnum,
    avatar_url TEXT,
    payment JSONB,
    favorites TEXT -- Vous devrez spécifier le type de données pour cette colonne selon vos besoins
);