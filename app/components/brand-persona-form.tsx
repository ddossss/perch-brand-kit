// app/components/brand-persona-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandPersonaForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(2, name, value); // 두 번째 인자는 현재 단계 번호인 '2'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 2: Define Your Persona</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Give your brand a personality and a unique voice to communicate with your audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="person-demographics" className="text-base font-medium">
                If your brand were a person, what would be their demographics?
              </Label>
              <Textarea
                id="person-demographics"
                name="personDemographics"
                placeholder="e.g., Age range, gender, occupation, etc."
                className="min-h-[120px] resize-none"
                required
                value={brandData.personDemographics}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="tone-of-voice" className="text-base font-medium">
                What is your brand's tone of voice?
              </Label>
              <Textarea
                id="tone-of-voice"
                name="toneOfVoice"
                placeholder="e.g., Friendly, professional, humorous, inspiring."
                className="min-h-[120px] resize-none"
                required
                value={brandData.toneOfVoice}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="favorite-styles" className="text-base font-medium">
                What are your brand's favorite styles?
              </Label>
              <Textarea
                id="favorite-styles"
                name="favoriteStyles"
                placeholder="e.g., Minimalist, bold, vintage, futuristic."
                className="min-h-[120px] resize-none"
                required
                value={brandData.favoriteStyles}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="catchphrases" className="text-base font-medium">
                What are some memorable catchphrases or slogans?
              </Label>
              <Textarea
                id="catchphrases"
                name="catchphrases"
                placeholder="e.g., Just Do It, Think Different."
                className="min-h-[120px] resize-none"
                required
                value={brandData.catchphrases}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 5 */}
            <div className="space-y-3">
              <Label htmlFor="customer-attitude" className="text-base font-medium">
                What is your brand's attitude towards its customers?
              </Label>
              <Textarea
                id="customer-attitude"
                name="customerAttitude"
                placeholder="e.g., A helpful guide, a trusted partner, a fun friend."
                className="min-h-[120px] resize-none"
                required
                value={brandData.customerAttitude}
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