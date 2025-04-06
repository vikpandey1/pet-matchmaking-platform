-- Schema for PetTech SaaS Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations (Vet clinics, Breeders, Individual pet owners)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('vet', 'breeder', 'individual')),
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT,
    full_name TEXT,
    org_id UUID REFERENCES organizations(id),
    role TEXT DEFAULT 'user' CHECK (role IN ('super_admin', 'org_admin', 'staff', 'pet_owner', 'user')),
    subscription TEXT DEFAULT 'free' CHECK (subscription IN ('free', 'gold', 'breeder_club')),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_organization FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE SET NULL
);

-- Connect organization.created_by to users
ALTER TABLE organizations ADD CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Organization-User relationships (for staff and admins)
CREATE TABLE organization_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'org_admin', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, org_id)
);

-- Pets (Dogs and Cats)
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    species TEXT NOT NULL CHECK (species IN ('dog', 'cat')),
    breed TEXT,
    birth_date DATE,
    age_years NUMERIC,
    weight_kg NUMERIC,
    temperament TEXT,
    activity_level TEXT CHECK (activity_level IN ('low', 'medium', 'high')),
    friendliness TEXT CHECK (friendliness IN ('shy', 'selective', 'friendly')),
    vaccination_url TEXT,
    genetic_data_url TEXT,
    health_data JSONB,
    photos JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches between pets
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id_1 UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    pet_id_2 UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    match_score INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(pet_id_1, pet_id_2)
);

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
    pet_id_1 UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    pet_id_2 UUID REFERENCES pets(id) ON DELETE SET NULL,
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    location TEXT,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments JSONB,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('subscription', 'platform_fee', 'one_time', 'refund')),
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD',
    service TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal')),
    payment_id TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    referral_code TEXT UNIQUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
    reward_amount NUMERIC,
    reward_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products/Store
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD',
    type TEXT CHECK (type IN ('physical', 'digital', 'service')),
    category TEXT,
    image_url TEXT,
    affiliate_link TEXT,
    commission_percentage NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for users (authenticated users can only see their own data or data from their organization)
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id OR org_id IN (
        SELECT org_id FROM organization_users WHERE user_id = auth.uid()
    ));

-- Policy for organizations (members can see their own organization)
CREATE POLICY "Users can view their organization" ON organizations
    FOR SELECT USING (id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
        UNION
        SELECT org_id FROM organization_users WHERE user_id = auth.uid()
    ));

-- Policy for pets (owners and org members can view their pets)
CREATE POLICY "Users can view their pets" ON pets
    FOR SELECT USING (
        user_id = auth.uid() OR
        org_id IN (SELECT org_id FROM organization_users WHERE user_id = auth.uid())
    );

-- Matches policy
CREATE POLICY "Users can view their matches" ON matches
    FOR SELECT USING (
        pet_id_1 IN (SELECT id FROM pets WHERE user_id = auth.uid()) OR
        pet_id_2 IN (SELECT id FROM pets WHERE user_id = auth.uid()) OR
        pet_id_1 IN (SELECT id FROM pets WHERE org_id IN (SELECT org_id FROM organization_users WHERE user_id = auth.uid())) OR
        pet_id_2 IN (SELECT id FROM pets WHERE org_id IN (SELECT org_id FROM organization_users WHERE user_id = auth.uid()))
    );

-- Appointments policy
CREATE POLICY "Users can view their appointments" ON appointments
    FOR SELECT USING (
        pet_id_1 IN (SELECT id FROM pets WHERE user_id = auth.uid()) OR
        pet_id_2 IN (SELECT id FROM pets WHERE user_id = auth.uid()) OR
        org_id IN (SELECT org_id FROM organization_users WHERE user_id = auth.uid())
    );

-- Messages policy
CREATE POLICY "Users can view their messages" ON messages
    FOR SELECT USING (
        sender_id = auth.uid() OR
        receiver_id = auth.uid() OR
        match_id IN (
            SELECT id FROM matches WHERE 
            pet_id_1 IN (SELECT id FROM pets WHERE user_id = auth.uid()) OR
            pet_id_2 IN (SELECT id FROM pets WHERE user_id = auth.uid())
        )
    );

-- Create audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger functions for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, new_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_data, new_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql; 