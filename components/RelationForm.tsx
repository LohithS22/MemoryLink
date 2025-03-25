
// components/relations/relation-form.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PersonImageUpload } from './RelationPersonImage';
import { Person, Relationship } from '@/types';

interface RelationFormProps {
  initialData?: Partial<Person>;
  onSubmit: (data: Partial<Person>) => void;
  onCancel: () => void;
}

export function RelationForm({ initialData, onSubmit, onCancel }: RelationFormProps) {
  const [formData, setFormData] = React.useState<Partial<Person>>(
    initialData || {
      name: '',
      relationship: 'family' as Relationship,
      imageUrl: '',
      notes: '',
      contactInfo: {
        phone: '',
        email: '',
        address: '',
      },
      frequencyOfContact: 'weekly',
    }
  );

  const [previewUrl, setPreviewUrl] = React.useState<string>(initialData?.imageUrl || '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    // In a real app, you would upload this to a server and get back a URL
    // For now, we'll create a local object URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setFormData((prev) => ({
      ...prev,
      imageUrl: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Relation' : 'Add New Relation'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <PersonImageUpload
              previewUrl={previewUrl}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
            />

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="relationship" className="text-sm font-medium">
                  Relationship
                </label>
                <Select
                  value={formData.relationship}
                  onValueChange={(value : any) => handleSelectChange(value, 'relationship')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="caregiver">Caregiver</SelectItem>
                    <SelectItem value="medical">Medical Professional</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="frequencyOfContact" className="text-sm font-medium">
                  Frequency of Contact
                </label>
                <Select
                  value={formData.frequencyOfContact}
                  onValueChange={(value) => handleSelectChange(value, 'frequencyOfContact')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contactInfo.phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="contactInfo.phone"
                name="contactInfo.phone"
                value={formData.contactInfo?.phone || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contactInfo.email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="contactInfo.email"
                name="contactInfo.email"
                type="email"
                value={formData.contactInfo?.email || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contactInfo.address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="contactInfo.address"
                name="contactInfo.address"
                value={formData.contactInfo?.address || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Add any notes or details about this person"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/50 p-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Relation' : 'Add Relation'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}