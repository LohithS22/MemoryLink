// lib/data.ts

import { Person, Reminder, Alert, User } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Robert Johnson',
  imageUrl: '/images/user-profile.jpg',
  emergencyContacts: ['person-1', 'person-3'],
  preferences: {
    notificationVolume: 'medium',
    colorTheme: 'light',
    fontSize: 'medium',
    enableVoiceCommands: true,
  },
};

export const mockPersons: Person[] = [
  {
    id: 'person-1',
    name: 'Sarah Johnson',
    relationship: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=800&auto=format&fit=crop&q=60',
    notes: 'Daughter, visits every Sunday',
    lastSeen: '2025-03-08T14:30:00',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'sarah.johnson@example.com',
      address: '123 Maple Street, Springfield',
    },
    frequencyOfContact: 'weekly',
  },
  {
    id: 'person-2',
    name: 'Michael Wilson',
    relationship: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&auto=format&fit=crop&q=60',
    notes: 'Son-in-law, married to Sarah',
    lastSeen: '2025-03-08T14:30:00',
    contactInfo: {
      phone: '(555) 987-6543',
      email: 'michael.wilson@example.com',
    },
    frequencyOfContact: 'weekly',
  },
  {
    id: 'person-3',
    name: 'Dr. Emily Chen',
    relationship: 'medical',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60',
    notes: 'Primary care physician',
    contactInfo: {
      phone: '(555) 456-7890',
      email: 'dr.chen@medclinic.com',
      address: '456 Healthcare Ave, Springfield Medical Center',
    },
    frequencyOfContact: 'monthly',
  },
  {
    id: 'person-4',
    name: 'Thomas Brown',
    relationship: 'friend',
    imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&auto=format&fit=crop&q=60',
    notes: 'Neighbor, chess partner',
    lastSeen: '2025-03-05T10:00:00',
    contactInfo: {
      phone: '(555) 234-5678',
    },
    frequencyOfContact: 'weekly',
  },
  {
    id: 'person-5',
    name: 'Lisa Martinez',
    relationship: 'caregiver',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
    notes: 'Home care assistant, visits Monday, Wednesday, Friday',
    lastSeen: '2025-03-08T11:00:00',
    contactInfo: {
      phone: '(555) 876-5432',
      email: 'lisa.m@careservices.com',
    },
    frequencyOfContact: 'daily',
  }
];

export const mockReminders: Reminder[] = [
  {
    id: 'reminder-1',
    title: 'Take blood pressure medication',
    description: 'Take one pill with water',
    type: 'medication',
    dateTime: '2025-03-10T08:00:00',
    repeatPattern: 'daily',
    priority: 'high',
    status: 'pending',
    notifications: [
      { timing: 0, method: 'app' },
      { timing: 5, method: 'app' }
    ],
  },
  {
    id: 'reminder-2',
    title: 'Doctor appointment',
    description: 'Regular checkup with Dr. Chen',
    type: 'appointment',
    dateTime: '2025-03-15T14:30:00',
    repeatPattern: 'none',
    priority: 'high',
    status: 'pending',
    relatedPersons: ['person-3'],
    notifications: [
      { timing: 60, method: 'app' },
      { timing: 120, method: 'sms' }
    ],
  },
  {
    id: 'reminder-3',
    title: 'Lunch',
    description: 'Remember to eat a balanced meal',
    type: 'meal',
    dateTime: '2025-03-10T12:00:00',
    repeatPattern: 'daily',
    priority: 'medium',
    status: 'pending',
    notifications: [
      { timing: 0, method: 'app' }
    ],
  },
  {
    id: 'reminder-4',
    title: 'Call Sarah',
    description: 'Weekly check-in with daughter',
    type: 'social',
    dateTime: '2025-03-10T17:00:00',
    repeatPattern: 'weekly',
    priority: 'medium',
    status: 'pending',
    relatedPersons: ['person-1'],
    notifications: [
      { timing: 15, method: 'app' }
    ],
  },
  {
    id: 'reminder-5',
    title: 'Chess with Thomas',
    description: 'Scheduled chess game with neighbor',
    type: 'activity',
    dateTime: '2025-03-12T14:00:00',
    repeatPattern: 'weekly',
    priority: 'low',
    status: 'pending',
    relatedPersons: ['person-4'],
    notifications: [
      { timing: 30, method: 'app' }
    ],
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'location',
    title: 'Boundary alert',
    description: 'Notify if patient leaves defined safe area',
    active: true,
    severity: 'critical',
    recipients: ['person-1', 'person-5'],
    actionRequired: true,
  },
  {
    id: 'alert-2',
    type: 'medication',
    title: 'Medication missed',
    description: 'Alert if medication is not taken within 30 minutes of scheduled time',
    active: true,
    severity: 'warning',
    recipients: ['person-5'],
    actionRequired: true,
  },
  {
    id: 'alert-3',
    type: 'time',
    title: 'Night wandering',
    description: 'Alert if activity detected during nighttime hours',
    active: true,
    severity: 'warning',
    timeRestrictions: {
      startTime: '22:00',
      endTime: '06:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    recipients: ['person-1', 'person-5'],
    actionRequired: false,
  },
  {
    id: 'alert-4',
    type: 'emergency',
    title: 'Emergency button',
    description: 'Send immediate alert when emergency button is pressed',
    active: true,
    severity: 'critical',
    recipients: ['person-1', 'person-3', 'person-5'],
    actionRequired: true,
  }
];