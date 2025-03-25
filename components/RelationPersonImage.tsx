import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';

interface PersonImageUploadProps {
  previewUrl?: string;
  onImageChange?: (file: File) => void;
  onRemoveImage?: () => void;
}

export function PersonImageUpload({
  previewUrl,
  onImageChange,
  onRemoveImage
}: PersonImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Photo</label>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-40 w-40 rounded-lg object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            onClick={onRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Card
          className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border-dashed"
          onClick={handleClick}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Camera className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-center text-sm text-muted-foreground">
              Click to upload a photo
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
