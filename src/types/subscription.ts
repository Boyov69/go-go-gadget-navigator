
/**
 * Subscription Type Definitions
 */

import { WalletCurrency } from './wallet';

export enum SubscriptionTier {
  BASIC = 'basic',
  PREMIUM = 'premium',
  UNLIMITED = 'unlimited',
  CORPORATE = 'corporate'
}

export enum SubscriptionFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  EXPIRED = 'expired',
  TRIAL = 'trial'
}

export enum SubscriptionBenefit {
  UNLIMITED_RIDES = 'unlimited_rides',
  FREE_CANCELLATION = 'free_cancellation',
  PRIORITY_SUPPORT = 'priority_support',
  DISCOUNTED_RATES = 'discounted_rates',
  PREMIUM_VEHICLES = 'premium_vehicles',
  REWARDS = 'rewards',
  FAMILY_SHARING = 'family_sharing',
  BUSINESS_REPORTING = 'business_reporting',
  CARBON_OFFSET = 'carbon_offset'
}

export type MobilityCredits = {
  amount: number;
  currency: WalletCurrency;
  expiresAt?: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  frequency: SubscriptionFrequency;
  price: number;
  currency: WalletCurrency;
  benefits: SubscriptionBenefit[];
  mobilityCredits?: MobilityCredits;
  description: string;
  citySpecific?: string; // City name if this is a city-specific plan
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  startedAt: Date;
  canceledAt?: Date;
  trialEnd?: Date;
  mobilityCreditsRemaining?: MobilityCredits;
  autoRenew: boolean;
}

export interface SubscriptionServiceInterface {
  // Get all available subscription plans
  getAvailablePlans(): Promise<SubscriptionPlan[]>;
  
  // Get plans specific to a city
  getCitySpecificPlans(cityName: string): Promise<SubscriptionPlan[]>;
  
  // Get a user's current subscription
  getUserSubscription(userId: string): Promise<UserSubscription | null>;
  
  // Subscribe a user to a plan
  subscribeToPlan(userId: string, planId: string, paymentMethod: string): Promise<UserSubscription>;
  
  // Cancel a subscription
  cancelSubscription(subscriptionId: string, immediate: boolean): Promise<{ success: boolean }>;
  
  // Change subscription plan
  changePlan(subscriptionId: string, newPlanId: string): Promise<UserSubscription>;
  
  // Check if a user has a specific benefit
  userHasBenefit(userId: string, benefit: SubscriptionBenefit): Promise<boolean>;
  
  // Add mobility credits to a subscription
  addMobilityCredits(subscriptionId: string, credits: number): Promise<MobilityCredits>;
  
  // Use mobility credits
  useMobilityCredits(subscriptionId: string, amount: number): Promise<{ 
    success: boolean;
    remaining: number;
  }>;
  
  // Get subscription invoice history
  getInvoiceHistory(subscriptionId: string): Promise<{
    id: string;
    amount: number;
    currency: WalletCurrency;
    status: 'paid' | 'pending' | 'failed';
    date: Date;
    pdfUrl?: string;
  }[]>;
}
