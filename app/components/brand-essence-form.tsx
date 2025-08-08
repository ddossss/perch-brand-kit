// app/components/brand-essence-form.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function BrandEssenceForm({ onNext, onSaveAndExit, brandData, onInputChange }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // 부모 컴포넌트의 상태를 업데이트하는 함수를 호출
    // 첫 번째 인자(1)는 현재 단계 번호
    onInputChange(1, name, value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 1: Define Your Essence</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Clearly define why your brand exists and what value you want to deliver to the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="brand-reason" className="text-base font-medium">
                Why are you starting this brand?
              </Label>
              <Textarea
                id="brand-reason"
                name="brandReason"
                placeholder="Enter your reasons here."
                className="min-h-[120px] resize-none"
                required
                value={brandData.brandReason} // 상태에서 값을 가져와 표시
                onChange={handleTextAreaChange} // 변경될 때마다 부모 상태 업데이트
              />
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="problem-solving" className="text-base font-medium">
                What problem do you want to solve for your customers?
              </Label>
              <Textarea
                id="problem-solving"
                name="problemSolving"
                placeholder="Describe the problem you aim to solve."
                className="min-h-[120px] resize-none"
                required
                value={brandData.problemSolving}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="core-values" className="text-base font-medium">
                What are your core values?
              </Label>
              <Textarea
                id="core-values"
                name="coreValues"
                placeholder="List your brand's core values."
                className="min-h-[120px] resize-none"
                required
                value={brandData.coreValues}
                onChange={handleTextAreaChange}
              />
            </div>
            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="customer-feeling" className="text-base font-medium">
                How do you want your customers to feel after using your brand?
              </Label>
              <Textarea
                id="customer-feeling"
                name="customerFeeling"
                placeholder="Describe the feeling you want to evoke."
                className="min-h-[120px] resize-none"
                required
                value={brandData.customerFeeling}
                onChange={handleTextAreaChange}
              />
            </div>
            
            {/* 네비게이션 버튼들 */}
            <div className="flex justify-end space-x-4">
              <Button type="submit" onClick={onSaveAndExit}>
                Save & Exit
              </Button>
              <Button type="submit" onClick={onNext}>
                Next Step
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}