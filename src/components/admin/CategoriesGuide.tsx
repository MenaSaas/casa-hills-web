
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  value: string;
  label: string;
  description: string;
  maxFiles?: number;
}

interface CategoriesGuideProps {
  categories: Category[];
}

export const CategoriesGuide = ({ categories }: CategoriesGuideProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Guide des catégories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.value} className="p-4 border rounded-lg">
              <h4 className="font-semibold text-casa-blue mb-2">{category.label}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
              {category.maxFiles && (
                <p className="text-xs text-casa-red mt-2">Max recommandé: {category.maxFiles} photos</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
