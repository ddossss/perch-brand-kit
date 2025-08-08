// app/components/brand-journey-dashboard.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// 각 폼 컴포넌트들을 모두 import 합니다.
import BrandEssenceForm from './brand-essence-form';
import BrandPersonaForm from './brand-persona-form';
import BrandStyleForm from './brand-style-form';
import BrandMessageForm from './brand-message-form';
import BrandPositioningForm from './brand-positioning-form';
import BrandValidationForm from './brand-validation-form';
import BrandRoadmapForm from './brand-roadmap-form';
import BrandSummaryPage from './brand-summary-page';

// 여정 단계 정보와 컴포넌트 목록
const brandSteps = [
  { id: 0, title: "Define Your Essence", component: BrandEssenceForm },
  { id: 1, title: "Define Your Persona", component: BrandPersonaForm },
  { id: 2, title: "Organize Brand Expression Style", component: BrandStyleForm },
  { id: 3, title: "Refine Brand Message", component: BrandMessageForm },
  { id: 4, title: "Create Your Positioning Statement", component: BrandPositioningForm },
  { id: 5, title: "Validate Your Brand Concept", component: BrandValidationForm },
  { id: 6, title: "Develop Your Brand Roadmap", component: BrandRoadmapForm },
];

export default function BrandJourneyDashboard() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  // 모든 폼 데이터를 한 곳에서 관리하는 상태
  const [brandData, setBrandData] = useState({
    step1: { brandReason: "", problemSolving: "", coreValues: "", customerFeeling: "" },
    step2: { personDemographics: "", toneOfVoice: "", favoriteStyles: "", catchphrases: "", customerAttitude: "" },
    step3: { mainColor: "", subColor: "", accentColor: "", titleFont: "", bodyFont: "", emphasisFont: "", imageStyle: "", brandKeywords: "" },
    step4: { brandSlogan: "", snsBio: "", brandIntroduction: "", brandPhilosophy: "" },
    step5: { customerDemographics: "", customerInterests: "", customerPains: "", expectedSolutions: "" },
    step6: { competitorList: "", brandDifferentiator: "", brandNichePosition: "" },
    step7: { axisX: "", axisY: "", brandPosition: "" },
    step8: { validationMethods: "", successMetrics: "" },
    step9: { brandGoals: "", launchPlan: "", growthPlan: "", milestonesKpis: "" },
  });

  // 폼 입력값을 업데이트하는 범용 함수
  const handleInputChange = (step: number, field: string, value: string) => {
    const stepKey = `step${step}`;
    setBrandData(prevData => ({
      ...prevData,
      [stepKey]: {
        ...prevData[stepKey],
        [field]: value,
      },
    }));
  };

  const handleNextStep = () => {
    if (currentStep < brandSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = async () => {
    console.log("Saving data and exiting...");

    try {
      const response = await fetch('http://localhost:5000/api/save-brand-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
      });

      if (response.ok) {
        alert("데이터가 성공적으로 저장되었습니다.");
        router.push('/dashboard'); // 대시보드 페이지로 이동
      } else {
        alert("데이터 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("오류가 발생했습니다.");
    }
  };
  
  const isSummaryPage = currentStep >= brandSteps.length;

  const renderCurrentForm = () => {
    if (isSummaryPage) {
      return (
        <BrandSummaryPage 
          onPrevious={handlePrevStep}
          onNext={() => {}} // 요약 페이지에서 '다음' 버튼이 없으므로 빈 함수
          onSaveAndExit={handleSaveAndExit}
          brandData={brandData}
        />
      );
    }
    const CurrentForm = brandSteps[currentStep].component;
    const stepNumber = brandSteps[currentStep].id + 1;
    return (
      <CurrentForm
        onPrevious={handlePrevStep}
        onNext={handleNextStep}
        onSaveAndExit={handleSaveAndExit}
        brandData={brandData[`step${stepNumber}`]}
        onInputChange={handleInputChange}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center mb-8">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>
                {isSummaryPage ? "Your Brand Identity Is Complete!" : `Step ${currentStep + 1}: ${brandSteps[currentStep].title}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderCurrentForm()}
            </CardContent>
          </Card>
        </div>

        {/* 이전/다음 버튼 */}
        {!isSummaryPage && (
          <div className="flex justify-between max-w-2xl mx-auto mt-4">
            <Button onClick={handlePrevStep} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> 이전 단계
            </Button>
            <Button onClick={handleNextStep}>
              다음 단계 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}