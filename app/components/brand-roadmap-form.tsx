// app/components/brand-roadmap-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandRoadmapForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(7, name, value); // 두 번째 인자는 현재 단계 번호인 '7'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 7: Develop Your Brand Roadmap</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Plan for the future by setting goals, milestones, and a clear growth strategy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="brand-goals" className="text-base font-medium">
                What are your brand's short-term and long-term goals?
              </Label>
              <Textarea
                id="brand-goals"
                name="brandGoals"
                placeholder="e.g., Increase brand awareness by 20% in the first year."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandGoals}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="launch-plan" className="text-base font-medium">
                What is your brand launch plan?
              </Label>
              <Textarea
                id="launch-plan"
                name="launchPlan"
                placeholder="Describe your plan to introduce your brand to the market."
                className="min-h-[120px] resize-none"
                required
                value={brandData.launchPlan}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="growth-plan" className="text-base font-medium">
                What is your strategy for long-term growth?
              </Label>
              <Textarea
                id="growth-plan"
                name="growthPlan"
                placeholder="e.g., Content marketing, partnerships, social media campaigns."
                className="min-h-[120px] resize-none"
                required
                value={brandData.growthPlan}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="milestones-kpis" className="text-base font-medium">
                What are your key milestones and KPIs (Key Performance Indicators)?
              </Label>
              <Textarea
                id="milestones-kpis"
                name="milestonesKpis"
                placeholder="e.g., 1000 social media followers, $10,000 in revenue, etc."
                className="min-h-[120px] resize-none"
                required
                value={brandData.milestonesKpis}
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