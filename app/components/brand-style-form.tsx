// app/components/brand-style-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandStyleForm({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInputChange(3, name, value); // 두 번째 인자는 현재 단계 번호인 '3'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 3: Organize Brand Expression Style</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Define your brand's visual and textual style for a consistent brand image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1: Colors */}
            <div className="space-y-3">
              <Label htmlFor="main-color" className="text-base font-medium">
                What are your main brand colors?
              </Label>
              <input
                type="text"
                id="main-color"
                name="mainColor"
                placeholder="e.g., #FFFFFF, #000000"
                className="w-full p-2 border rounded-md"
                required
                value={brandData.mainColor}
                onChange={handleInputChange}
              />
              {/* Other color inputs can be added similarly */}
            </div>
            
            {/* Question 2: Fonts */}
            <div className="space-y-3">
              <Label htmlFor="title-font" className="text-base font-medium">
                What fonts represent your brand?
              </Label>
              <input
                type="text"
                id="title-font"
                name="titleFont"
                placeholder="e.g., Poppins, Roboto"
                className="w-full p-2 border rounded-md"
                required
                value={brandData.titleFont}
                onChange={handleInputChange}
              />
              {/* Other font inputs can be added similarly */}
            </div>

            {/* Question 3: Image Style */}
            <div className="space-y-3">
              <Label htmlFor="image-style" className="text-base font-medium">
                What is your brand's image style?
              </Label>
              <Textarea
                id="image-style"
                name="imageStyle"
                placeholder="e.g., Illustrations, minimalist photos, abstract art."
                className="min-h-[120px] resize-none"
                required
                value={brandData.imageStyle}
                onChange={handleInputChange}
              />
            </div>

            {/* Question 4: Brand Keywords */}
            <div className="space-y-3">
              <Label htmlFor="brand-keywords" className="text-base font-medium">
                What keywords describe your brand's style?
              </Label>
              <Textarea
                id="brand-keywords"
                name="brandKeywords"
                placeholder="e.g., Simple, elegant, modern, playful."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandKeywords}
                onChange={handleInputChange}
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