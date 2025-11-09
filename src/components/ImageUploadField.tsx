import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { XCircle, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  label: string;
  value?: string; // Current image URL
  onChange: (file: File | null, url: string | null) => void; // Callback for file and URL
  onClear?: () => void; // Callback to clear the image
  disabled?: boolean;
  className?: string;
  error?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  onClear,
  disabled,
  className,
  error,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        onChange(file, null); // Pass the file, URL will be handled by parent on submit
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(value || null); // Revert to original if no file selected
      onChange(null, value || null); // Pass null file, keep existing URL
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
    onClear?.();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
        {previewUrl ? (
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
            <img src={previewUrl} alt="Image Preview" className="w-full h-full object-cover" />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={handleClear}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 mb-4">
            <UploadCloud className="h-12 w-12 mb-2" />
            <p>Drag 'n' drop an image here, or click to select</p>
          </div>
        )}
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden" // Hide the default file input
          ref={fileInputRef}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          {previewUrl ? "Change Image" : "Select Image"}
        </Button>
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default ImageUploadField;