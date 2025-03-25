import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Person } from '@/types';
import { formatLastSeen } from '@/helperFn';

interface RelationCardProps {
  person: Person;
}

export function RelationCard({ person }: RelationCardProps) {
  const getRelationshipBadgeColor = (relationship: string) => {
    switch (relationship) {
      case 'family':
        return 'bg-blue-100 text-blue-800';
      case 'friend':
        return 'bg-green-100 text-green-800';
      case 'caregiver':
        return 'bg-purple-100 text-purple-800';
      case 'medical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={person.imageUrl}
          alt={person.name}
          className="h-48 w-full object-cover"
        />
        <div
          className={`absolute bottom-2 right-2 rounded-full px-3 py-1 text-xs font-medium ${getRelationshipBadgeColor(
            person.relationship
          )}`}
        >
          {person.relationship.charAt(0).toUpperCase() + person.relationship.slice(1)}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 text-xl font-bold">{person.name}</h3>
        
        <div className="mb-3 space-y-2 text-sm text-muted-foreground">
          {person.lastSeen && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last seen: {formatLastSeen(person.lastSeen)}</span>
            </div>
          )}
          
          {person.contactInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{person.contactInfo.phone}</span>
            </div>
          )}
          
          {person.contactInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{person.contactInfo.email}</span>
            </div>
          )}
          
          {person.contactInfo?.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{person.contactInfo.address}</span>
            </div>
          )}
        </div>
        
        {person.notes && (
          <p className="line-clamp-2 text-sm">{person.notes}</p>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Link href={`/relations/${person.id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
