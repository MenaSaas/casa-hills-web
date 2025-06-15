
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PhotoFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const categories = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'carousel', label: 'Carousel principal (Page d\'accueil)' },
  { value: 'school-levels', label: 'Cycles scolaires (Page d\'accueil)' },
  { value: 'news', label: 'Actualités et événements' },
  { value: 'philosophy', label: 'Philosophie - Activités pédagogiques' },
  { value: 'campus', label: 'Espaces du campus' },
  { value: 'facilities', label: 'Installations et équipements' }
];

export const PhotoFilters = ({ 
  searchTerm, 
  selectedCategory, 
  onSearchChange, 
  onCategoryChange 
}: PhotoFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, titre ou description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-80">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
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
      </div>
    </div>
  );
};
