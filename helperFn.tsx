import { Clock, User, BellRing, Calendar, Plus, ArrowRight, Brain } from 'lucide-react';

export function getReminderIcon(type: string) {
    switch (type.toLowerCase()) { // Case insensitive matching
        case 'medication':
            return  <Clock className="h-4 w-4 text-white" />;  // Clock for medication reminders
        case 'appointment':
            return <Calendar className="h-4 w-4 text-white" />;  // Calendar for appointments
        case 'meal':
            return <User className="h-4 w-4 text-white" />;  // User for meal reminders
        default:
            return <BellRing className="h-4 w-4 text-white" />;  // Default BellRing icon
    }
}

export function getPriorityColor(priority: string) {
    const lowerPriority = priority.toLowerCase(); // Ensure case-insensitive comparison
    switch (lowerPriority) {
        case 'high':
        case 'urgent':
            return 'bg-red-500';  // Red for high/urgent priority
        case 'medium':
            return 'bg-yellow-500';  // Yellow for medium priority
        case 'low':
            return 'bg-green-500';  // Green for low priority
        default:
            return 'bg-blue-500';  // Blue as a fallback priority color
    }
}

export function formatLastSeen(dateString?: string) {
    if (!dateString) return 'Unknown';  // Handle missing date

    const lastSeen = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastSeen.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));  // Calculate day difference

    if (diffDays === 0) {
        return 'Today';  // Return "Today" if last seen is today
    } else if (diffDays === 1) {
        return 'Yesterday';  // Return "Yesterday" if last seen was 1 day ago
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;  // Show number of days ago if it's within the past week
    } else {
        return lastSeen.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });  // Format date for older values
    }
}
