"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export default function CompetitorAnalysisForm({ onNext, onPrevious, onSaveAndExit }) {
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
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
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Step 6: Analyze Competitors</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Analyze competitors to find your brand's unique position in the market.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <Label htmlFor="competitor-list" className="text-base font-medium">
                List 3-5 competitor brands and a brief description of each.
              </Label>
              <Textarea
                id="competitor-list"
                name="competitorList"
                placeholder="List your main competitors with brief descriptions (e.g., Brand A - Premium skincare focused on organic ingredients, Brand B - Affordable beauty products for millennials)."
                className="min-h-[140px] resize-none"
                required
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <Label htmlFor="competitor-strengths-weaknesses" className="text-base font-medium">
                What are the competitors' strengths and weaknesses?
              </Label>
              <Textarea
                id="competitor-strengths-weaknesses"
                name="competitorStrengthsWeaknesses"
                placeholder="Analyze each competitor's strengths and weaknesses (e.g., strong brand recognition but high prices, great product quality but poor customer service)."
                className="min-h-[140px] resize-none"
                required
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-3">
              <Label htmlFor="competitor-uvp" className="text-base font-medium">
                What is the unique value proposition (UVP) of each competitor?
              </Label>
              <Textarea
                id="competitor-uvp"
                name="competitorUvp"
                placeholder="Identify what makes each competitor unique and appealing to their customers (e.g., fastest delivery, most sustainable materials, best customer support)."
                className="min-h-[140px] resize-none"
                required
              />
            </div>

            {/* Question 4 */}
            <div className="space-y-3">
              <Label htmlFor="brand-differentiator" className="text-base font-medium">
                What is the key differentiator of our brand compared to the competitors?
              </Label>
              <Textarea
                id="brand-differentiator"
                name="brandDifferentiator"
                placeholder="Describe what sets your brand apart from the competition (e.g., personalized service, innovative technology, unique design approach)."
                className="min-h-[140px] resize-none"
                required
              />
            </div>

            {/* Question 5 */}
            <div className="space-y-3">
              <Label htmlFor="brand-niche-position" className="text-base font-medium">
                What niche or position will our brand aim for to stand out?
              </Label>
              <Textarea
                id="brand-niche-position"
                name="brandNichePosition"
                placeholder="Define the specific market position or niche your brand will target (e.g., eco-conscious luxury, affordable premium, tech-savvy professionals)."
                className="min-h-[140px] resize-none"
                required
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 sm:ml-auto">
  <Button
    type="button"
    variant="outline"
    size="lg"
    onClick={onPrevious} // Previous 버튼에 onPrevious 연결
    className="w-full sm:w-auto"
  >
    Previous
  </Button>
  <Button
    type="button"
    variant="secondary"
    size="lg"
    onClick={onSaveAndExit} // Save & Exit 버튼 추가 및 연결
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
  )
}
