CREATE TYPE OperationType AS ENUM ('achat', 'location');
CREATE TYPE PropertyName AS ENUM ('Appartement', 'Maison et Villa');
CREATE TYPE AdvertiserType AS ENUM ('Agence', 'Promotteur', 'Propriétaire');
CREATE TYPE Cities AS ENUM ('Abobo', 'Adjamé','Bingerville','Anyama','Attécoub', 'Koumassi'
'Treichville','Prt bouët','Cocody','Marcory','Songon','Yopougon','Plateau');

CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    IsExceptionProperty BOOLEAN,
    MainImage TEXT,
    Images TEXT[],
    Property_Name PropertyName,
    Operation_Type OperationType,
    City Cities,
    Neighborhood VARCHAR(255),
    Location_gps VARCHAR(255),
    Property_Description TEXT,
    Price DECIMAL(15, 2),
    Area DECIMAL(10, 2),
    Nb_rooms INTEGER,
    Nb_bedrooms INTEGER,
    Amenities JSONB,
    Video TEXT,
    Nb_views INTEGER,
    Advertiser AdvertiserType,
);