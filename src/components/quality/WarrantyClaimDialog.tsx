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
import { Camera, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import type { WarrantyClaim } from '@/types/quality';

type WarrantyClaimDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim?: WarrantyClaim;
};

export default function WarrantyClaimDialog({
  open,
  onOpenChange,
  claim,
}: WarrantyClaimDialogProps) {
  const [formData, setFormData] = useState({
    customerName: claim?.customerName || '',
    vehicleInfo: claim?.vehicleInfo || '',
    issue: claim?.issue || '',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {claim ? 'Edit Warranty Claim' : 'File Warranty Claim'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleInfo">Vehicle Information</Label>
            <Input
              id="vehicleInfo"
              value={formData.vehicleInfo}
              onChange={(e) =>
                setFormData({ ...formData, vehicleInfo: e.target.value })
              }
              placeholder="Year Make Model"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">Issue Description</Label>
            <Textarea
              id="issue"
              value={formData.issue}
              onChange={(e) =>
                setFormData({ ...formData, issue: e.target.value })
              }
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Documentation</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Simulate camera capture
                  setFormData({
                    ...formData,
                    images: [...formData.images, `photo-${Date.now()}.jpg`],
                  });
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Simulate file upload
                  setFormData({
                    ...formData,
                    images: [...formData.images, `upload-${Date.now()}.jpg`],
                  });
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((image) => (
                  <Badge key={image} variant="secondary">
                    {image}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">
              {claim ? 'Update Claim' : 'Submit Claim'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}