export type Relationship = 'family' | 'friend' | 'caregiver' | 'medical' | 'other';

export interface Person {
  id: string;
  name: string;
  relationship: Relationship;
  imageUrl: string;
  notes: string;
  lastSeen?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  frequencyOfContact?: 'daily' | 'weekly' | 'monthly' | 'rarely';
}

export type ReminderPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ReminderStatus = 'pending' | 'completed' | 'missed';
export type ReminderType = 'medication' | 'appointment' | 'meal' | 'activity' | 'social' | 'other';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  type: ReminderType;
  dateTime: string;
  repeatPattern?: 'daily' | 'weekly' | 'monthly' | 'custom' | 'none';
  repeatCustom?: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  relatedPersons?: string[]; // IDs of related persons
  completed?: boolean;
  notifications: {
    timing: number; // minutes before
    method: 'app' | 'sms' | 'call' | 'email';
  }[];
}

export type AlertType = 'location' | 'time' | 'activity' | 'medication' | 'emergency';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  active: boolean;
  severity: 'info' | 'warning' | 'critical';
  timeRestrictions?: {
    startTime?: string;
    endTime?: string;
    days?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  };
  recipients: string[]; // IDs of persons to notify
  actionRequired?: boolean;
}

export interface User {
  id: string;
  name: string;
  imageUrl?: string;
  emergencyContacts: string[]; // IDs of emergency contacts
  preferences: {
    notificationVolume: 'silent' | 'low' | 'medium' | 'high';
    colorTheme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    enableVoiceCommands: boolean;
  };
}