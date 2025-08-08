// app/components/brand-validation-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandValidationForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(6, name, value); // 두 번째 인자는 현재 단계 번호인 '6'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 6: Validate Your Brand Concept</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Test your brand concept against the market and competitors to find your unique position.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="competitor-list" className="text-base font-medium">
                Who are your main competitors?
              </Label>
              <Textarea
                id="competitor-list"
                name="competitorList"
                placeholder="e.g., List your competitors and their strengths/weaknesses."
                className="min-h-[120px] resize-none"
                required
                value={brandData.competitorList}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="brand-differentiator" className="text-base font-medium">
                How is your brand different or better than the competition?
              </Label>
              <Textarea
                id="brand-differentiator"
                name="brandDifferentiator"
                placeholder="Describe your unique selling proposition."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandDifferentiator}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="brand-niche-position" className="text-base font-medium">
                What is your brand's unique niche or positioning in the market?
              </Label>
              <Textarea
                id="brand-niche-position"
                name="brandNichePosition"
                placeholder="e.g., The most affordable, the most luxurious, the most sustainable."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandNichePosition}
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