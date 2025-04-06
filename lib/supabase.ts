import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get authenticated client on the server side
export const getServerSupabase = (accessToken: string) => {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );
};

// Database types
export type UserRole = 'super_admin' | 'org_admin' | 'staff' | 'pet_owner' | 'user';
export type SubscriptionTier = 'free' | 'gold' | 'breeder_club';
export type OrgType = 'vet' | 'breeder' | 'individual';
export type PetSpecies = 'dog' | 'cat';
export type ActivityLevel = 'low' | 'medium' | 'high';
export type Friendliness = 'shy' | 'selective' | 'friendly';
export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'completed';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
export type TransactionType = 'subscription' | 'platform_fee' | 'one_time' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'stripe' | 'paypal';
export type ReferralStatus = 'pending' | 'completed' | 'expired';
export type ProductType = 'physical' | 'digital' | 'service';

// Database interfaces
export interface User {
  id: string;
  email: string;
  full_name?: string;
  org_id?: string;
  role: UserRole;
  subscription: SubscriptionTier;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Organization {
  id: string;
  name: string;
  type: OrgType;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationUser {
  id: string;
  user_id: string;
  org_id: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface Pet {
  id: string;
  org_id?: string;
  user_id?: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  birth_date?: Date;
  age_years?: number;
  weight_kg?: number;
  temperament?: string;
  activity_level?: ActivityLevel;
  friendliness?: Friendliness;
  vaccination_url?: string;
  genetic_data_url?: string;
  health_data?: any;
  photos?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Match {
  id: string;
  pet_id_1: string;
  pet_id_2: string;
  match_score: number;
  status: MatchStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Appointment {
  id: string;
  match_id?: string;
  pet_id_1: string;
  pet_id_2?: string;
  org_id?: string;
  title: string;
  description?: string;
  scheduled_time: Date;
  duration_minutes: number;
  location?: string;
  status: AppointmentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  match_id?: string;
  sender_id: string;
  receiver_id?: string;
  content: string;
  attachments?: any;
  read_at?: Date;
  created_at: Date;
}

export interface Transaction {
  id: string;
  user_id?: string;
  org_id?: string;
  type: TransactionType;
  amount: number;
  currency: string;
  service?: string;
  status: TransactionStatus;
  payment_method?: PaymentMethod;
  payment_id?: string;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referee_id?: string;
  referral_code?: string;
  status: ReferralStatus;
  reward_amount?: number;
  reward_claimed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  type: ProductType;
  category?: string;
  image_url?: string;
  affiliate_link?: string;
  commission_percentage?: number;
  created_at: Date;
  updated_at: Date;
} 