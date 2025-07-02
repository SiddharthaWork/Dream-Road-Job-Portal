
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface JobPreviewCardProps {
  hasDeadline: boolean;
  deadline?: Date;
}

const JobPreviewCard = ({ hasDeadline, deadline }: JobPreviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>How your job posting will appear</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium">Job Title</h4>
            <p className="text-gray-600">Will appear as the main heading</p>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium">Location & Type</h4>
            <p className="text-gray-600">Shown prominently to candidates</p>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium">Salary Range</h4>
            <p className="text-gray-600">Helps attract qualified candidates</p>
          </div>
          {hasDeadline && deadline && (
            <div className="border rounded-lg p-4 bg-yellow-50">
              <h4 className="font-medium">Application Deadline</h4>
              <p className="text-gray-600">{format(deadline, "PPP")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreviewCard;
