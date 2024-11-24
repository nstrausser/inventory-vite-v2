import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { InstallationStandard } from '@/types/quality';

type StandardsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  standard?: InstallationStandard;
};

export default function StandardsDialog({
  open,
  onOpenChange,
  standard,
}: StandardsDialogProps) {
  const [categories, setCategories] = useState(
    standard?.categories || [
      {
        name: '',
        requirements: [{ id: '1', description: '', criticalityLevel: 'medium' }],
      },
    ]
  );

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: '',
        requirements: [{ id: '1', description: '', criticalityLevel: 'medium' }],
      },
    ]);
  };

  const addRequirement = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].requirements.push({
      id: Math.random().toString(),
      description: '',
      criticalityLevel: 'medium',
    });
    setCategories(newCategories);
  };

  const removeRequirement = (categoryIndex: number, requirementIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].requirements.splice(requirementIndex, 1);
    setCategories(newCategories);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {standard ? 'Edit Standard' : 'Create New Standard'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Standard Name</Label>
              <Input
                id="name"
                placeholder="e.g., PPF Installation Standard"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" placeholder="e.g., 2.1" required />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Categories & Requirements</Label>
              <Button type="button" variant="outline" onClick={addCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>

            <div className="space-y-6">
              {categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="p-4 rounded-lg border space-y-4"
                >
                  <Input
                    placeholder="Category Name"
                    value={category.name}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      newCategories[categoryIndex].name = e.target.value;
                      setCategories(newCategories);
                    }}
                  />

                  <div className="space-y-2">
                    {category.requirements.map((req, reqIndex) => (
                      <div key={req.id} className="flex items-center space-x-2">
                        <Input
                          className="flex-1"
                          placeholder="Requirement description"
                          value={req.description}
                          onChange={(e) => {
                            const newCategories = [...categories];
                            newCategories[categoryIndex].requirements[
                              reqIndex
                            ].description = e.target.value;
                            setCategories(newCategories);
                          }}
                        />
                        <Select
                          value={req.criticalityLevel}
                          onValueChange={(value: any) => {
                            const newCategories = [...categories];
                            newCategories[categoryIndex].requirements[
                              reqIndex
                            ].criticalityLevel = value;
                            setCategories(newCategories);
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeRequirement(categoryIndex, reqIndex)
                          }
                          disabled={category.requirements.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addRequirement(categoryIndex)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Requirement
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {standard ? 'Update Standard' : 'Create Standard'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}