
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PublishingOptionsCardProps {
  isLoading: boolean;
  hasDeadline: boolean;
}

const PublishingOptionsCard = ({ isLoading, hasDeadline }: PublishingOptionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish Job"}
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Save as Draft
          </Button>
        </div>
        <div className="text-xs text-gray-500">
          <p>• Job will be live immediately after publishing</p>
          <p>• You can edit or close the job anytime</p>
          <p>• Applicants will be notified of new postings</p>
          {hasDeadline && <p>• Applications will close on the deadline</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishingOptionsCard;
