
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UploadFile {
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

interface Category {
  value: string;
  label: string;
  description: string;
  maxFiles?: number;
}

interface UploadFileCardProps {
  uploadFile: UploadFile;
  index: number;
  categories: Category[];
  subcategories: Record<string, string[]>;
  onUpdate: (index: number, field: keyof UploadFile, value: string) => void;
  onRemove: (index: number) => void;
}

export const UploadFileCard = ({ 
  uploadFile, 
  index, 
  categories, 
  subcategories, 
  onUpdate, 
  onRemove 
}: UploadFileCardProps) => {
  return (
    <Card key={index}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={uploadFile.preview}
              alt={uploadFile.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 p-0"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor={`title-${index}`}>Titre</Label>
              <Input
                id={`title-${index}`}
                value={uploadFile.title}
                onChange={(e) => onUpdate(index, 'title', e.target.value)}
                placeholder="Titre de la photo"
              />
            </div>
            <div>
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={uploadFile.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                placeholder="Description optionnelle"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`category-${index}`}>Section du site</Label>
                <Select
                  value={uploadFile.category}
                  onValueChange={(value) => {
                    onUpdate(index, 'category', value);
                    onUpdate(index, 'subcategory', ''); // Reset subcategory
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`subcategory-${index}`}>Sous-catégorie</Label>
                <Select
                  value={uploadFile.subcategory}
                  onValueChange={(value) => onUpdate(index, 'subcategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Optionnel" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories[uploadFile.category as keyof typeof subcategories]?.map(sub => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
