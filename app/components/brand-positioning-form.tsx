// app/components/brand-positioning-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandPositioningForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(5, name, value); // 두 번째 인자는 현재 단계 번호인 '5'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 5: Create Your Positioning Statement</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Define your unique position in the market by understanding your audience and competitors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="customer-demographics" className="text-base font-medium">
                Who are your target customers?
              </Label>
              <Textarea
                id="customer-demographics"
                name="customerDemographics"
                placeholder="e.g., Demographics, psychographics, etc."
                className="min-h-[120px] resize-none"
                required
                value={brandData.customerDemographics}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="customer-interests" className="text-base font-medium">
                What are their main interests and passions?
              </Label>
              <Textarea
                id="customer-interests"
                name="customerInterests"
                placeholder="Describe what your customers care about."
                className="min-h-[120px] resize-none"
                required
                value={brandData.customerInterests}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="customer-pains" className="text-base font-medium">
                What problems or pain points do they face that your brand can solve?
              </Label>
              <Textarea
                id="customer-pains"
                name="customerPains"
                placeholder="Describe the challenges your customers face."
                className="min-h-[120px] resize-none"
                required
                value={brandData.customerPains}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="expected-solutions" className="text-base font-medium">
                What solutions do they expect from a brand like yours?
              </Label>
              <Textarea
                id="expected-solutions"
                name="expectedSolutions"
                placeholder="Describe the features or benefits they seek."
                className="min-h-[120px] resize-none"
                required
                value={brandData.expectedSolutions}
                onChange={handleTextAreaChange}
              />
            </div>
            
            {/* 네비게이션 버튼들 */}
            <div className="flex justify-between space-x-4">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit" onClick={onNext}>
                Next Step
              </Button>
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="ghost" onClick={onSaveAndExit}>
                Save & Exit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}