// app/components/brand-summary-page.tsx

"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function BrandSummaryPage({ onPrevious, onSaveAndExit, brandData }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Brand Identity Is Complete!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Review your brand's identity and download your complete brand kit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step 1 Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Step 1: Define Your Essence</h3>
            <div className="space-y-2">
              <p className="font-medium">Why are you starting this brand?</p>
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
                {brandData.step1.brandReason}
              </div>
            </div>
            {/* ... 나머지 step1 요약 내용도 추가 */}
          </div>
          
          {/* Step 2 Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Step 2: Define Your Persona</h3>
            <div className="space-y-2">
              <p className="font-medium">If your brand were a person, what would be their demographics?</p>
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
                {brandData.step2.personDemographics}
              </div>
            </div>
            {/* ... 나머지 step2 요약 내용도 추가 */}
          </div>
          
          {/* ... 모든 단계의 요약 내용을 여기에 추가 */}

          <div className="flex justify-between space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button type="button" onClick={onSaveAndExit}>
              Save & Exit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}