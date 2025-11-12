import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { XCircle, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  label: string;
  value?: string; // Current image URL from form/DB
  onChange: (file: File | null, displayUrl: string | null) => void; // Callback for file and its display URL
  disabled?: boolean;
  className?: string;
  error?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value, // This is the URL from the form's image_src field
  onChange,
  disabled,
  className,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // If the external value changes (e.g., form reset, initial load), update local preview
    // Only update if no local file is selected, to avoid overwriting user's selection
    if (!localFile) {
      setLocalPreviewUrl(value || null);
    }
  }, [value, localFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreviewUrl(reader.result as string);
        setLocalFile(file);
        onChange(file, reader.result as string); // Pass the file and its data URL
      };
      reader.readAsDataURL(file);
    } else {
      // If user opens file dialog but selects nothing, revert to previous state
      setLocalPreviewUrl(value || null); // Revert to original URL
      setLocalFile(null);
      onChange(null, value || null); // Pass null file, original URL
    }
  };

  const handleClear = () => {
    setLocalPreviewUrl(null);
    setLocalFile(null);
    onChange(null, null); // Clear both file and URL
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  // Determine which URL to display: local preview takes precedence over external value
  const displayUrl = localPreviewUrl || value;

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
        {displayUrl ? (
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
            <img src={displayUrl} alt="Image Preview" className="w-full h-full object-cover" />
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
          onChange={handleFileSelect}
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
          {displayUrl ? "Change Image" : "Select Image"}
        </Button>
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default ImageUploadField;