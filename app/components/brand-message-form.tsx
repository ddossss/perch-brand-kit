// app/components/brand-message-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandMessageForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(4, name, value); // 두 번째 인자는 현재 단계 번호인 '4'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 4: Refine Brand Message</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Craft a clear and consistent message that resonates with your audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="brand-slogan" className="text-base font-medium">
                What is your brand slogan?
              </Label>
              <Textarea
                id="brand-slogan"
                name="brandSlogan"
                placeholder="e.g., Just Do It."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandSlogan}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="sns-bio" className="text-base font-medium">
                Write a short SNS bio.
              </Label>
              <Textarea
                id="sns-bio"
                name="snsBio"
                placeholder="e.g., We make delicious coffee for your daily grind."
                className="min-h-[120px] resize-none"
                required
                value={brandData.snsBio}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="brand-introduction" className="text-base font-medium">
                Write a concise brand introduction.
              </Label>
              <Textarea
                id="brand-introduction"
                name="brandIntroduction"
                placeholder="Describe your brand in one or two sentences."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandIntroduction}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="brand-philosophy" className="text-base font-medium">
                What is your brand's core philosophy?
              </Label>
              <Textarea
                id="brand-philosophy"
                name="brandPhilosophy"
                placeholder="Describe your brand's underlying principles."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandPhilosophy}
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