"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export default function TargetAudienceForm({ onNext, onPrevious, onSaveAndExit }) {
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 폼 제출 로직 (나중에 데이터 저장)
  console.log("Form submitted");
  if (onNext) {
    onNext();
  }
};

  const handlePrevious = () => {
    // Handle navigation to previous step
    console.log("Navigate to previous step")
  }

  const handleSaveExit = () => {
    // Handle save and exit functionality
    console.log("Save and exit")
  }

  return (
  <div className="max-w-4xl mx-auto p-6">
    <Card>
      {/* ... 기존 내용 ... */}
      <CardContent>
        {/* <form> 태그에 onSubmit={handleSubmit}을 추가합니다. */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ... 기존 질문 입력 필드 ... */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 sm:ml-auto">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onPrevious}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onSaveAndExit}
              className="w-full sm:w-auto"
            >
              Save & Exit
            </Button>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);
}
