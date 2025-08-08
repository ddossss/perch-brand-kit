"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Circle,
  Play,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Download,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  MessageCircle,
  Flag,
  Target,
  Users,
  Search,
  Palette,
  Megaphone,
  BarChart,
  Clipboard,
  Info,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Simplified shadcn/ui components
const Button = ({ children, onClick, variant = "default", size = "default", className = "", type = "button", ...props }) => {
  // Use hex colors to avoid issues with libraries that don't support modern color formats
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#2563eb] text-white shadow hover:bg-[#1d4ed8]",
    outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    destructive: "bg-[#ef4444] text-white shadow-sm hover:bg-[#dc2626]",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// -- New Dashboard Component --
const Dashboard = ({ projects, onStartNew, onContinue, onDelete }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">대시보드</h2>
      <p className="text-gray-500">이전에 저장한 브랜드 프로젝트 목록입니다. 원하는 프로젝트를 선택하여 이어서 작업하거나, 새로운 프로젝트를 시작할 수 있습니다.</p>
      
      <Button onClick={onStartNew} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" /> 새 브랜드 시작하기
      </Button>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 p-8 border rounded-lg bg-gray-50">
          <p>아직 저장된 브랜드 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <div key={project.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-gray-900">{project.brandData?.step0?.name || `브랜드 프로젝트 #${index + 1}`}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">상태:</span> {project.status}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">마지막 저장:</span> {project.lastSaved}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Button onClick={() => onContinue(project.id)} variant="outline">
                  <Edit className="h-4 w-4 mr-2" /> 이어서 작업하기
                </Button>
                <Button onClick={() => onDelete(project.id)} variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// -- Confirmation Modal Component --
const ConfirmationModal = ({ message, onConfirm, onCancel, confirmText = "Save" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
      <p className="text-lg font-semibold">{message}</p>
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel} variant="outline">
          취소
        </Button>
        <Button onClick={onConfirm} variant="default">
          {confirmText}
        </Button>
      </div>
    </div>
  </div>
);

// --- All form components now update the parent's state directly ---
const BrandInfoForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  const isFormValid = brandData?.name && brandData?.email;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">브랜드 구축 시작하기</h2>
      <p className="text-gray-500">시작하기 전에 간단한 정보를 알려주세요.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="user-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">이름</label>
          <input
            id="user-name"
            className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
            value={brandData?.name || ''}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="홍길동"
          />
        </div>
        <div>
          <label htmlFor="user-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">이메일</label>
          <input
            id="user-email"
            type="email"
            className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
            value={brandData?.email || ''}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="example@email.com"
          />
        </div>
        {!isFormValid && <p className="text-sm text-red-500">이름과 이메일은 필수 입력 항목입니다.</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={onSaveAndExit} variant="outline">
          <Download className="h-4 w-4 mr-2" /> 저장 후 종료
        </Button>
        <Button onClick={onNext} disabled={!isFormValid}>
          다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};


const BrandGoalForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">1. 브랜드 목표 정의</h2>
      <p className="text-gray-500">브랜드가 이루고자 하는 목표와 주요 타겟 고객을 정의합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="brand-goal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">브랜드 목표</label>
          <textarea
            id="brand-goal"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.goal || ''}
            onChange={(e) => onInputChange('goal', e.target.value)}
            placeholder="예: 우리 브랜드는 친환경 소재를 사용하여 지속 가능한 라이프스타일을 추구하는 사람들에게 프리미엄 의류를 제공합니다."
          />
        </div>
        <div>
          <label htmlFor="target-audience" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">타겟 고객</label>
          <textarea
            id="target-audience"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.targetAudience || ''}
            onChange={(e) => onInputChange('targetAudience', e.target.value)}
            placeholder="예: 20대 후반에서 30대 중반의 환경에 관심이 많고, 자신의 가치관을 소비로 표현하는 도시 거주자"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandValueForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">2. 핵심 가치 및 비전</h2>
      <p className="text-gray-500">브랜드의 존재 이유와 궁극적인 목표를 정의합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="brand-vision" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">비전</label>
          <textarea
            id="brand-vision"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.vision || ''}
            onChange={(e) => onInputChange('vision', e.target.value)}
            placeholder="예: 모든 사람이 지속 가능한 삶을 쉽게 실천할 수 있도록 돕는 것"
          />
        </div>
        <div>
          <label htmlFor="brand-mission" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">미션</label>
          <textarea
            id="brand-mission"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.mission || ''}
            onChange={(e) => onInputChange('mission', e.target.value)}
            placeholder="예: 친환경 소재의 고품질 의류를 합리적인 가격으로 제공하여 지속 가능한 소비를 선도한다."
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandStyleForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">3. 브랜드 스타일 및 톤앤매너</h2>
      <p className="text-gray-500">브랜드의 목소리와 시각적 요소를 정의합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="brand-tone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">브랜드 톤앤매너</label>
          <textarea
            id="brand-tone"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.tone || ''}
            onChange={(e) => onInputChange('tone', e.target.value)}
            placeholder="예: 친근하고 따뜻하며, 신뢰를 주는 전문가적인 목소리"
          />
        </div>
        <div>
          <label htmlFor="brand-visuals" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">시각적 요소</label>
          <textarea
            id="brand-visuals"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.visuals || ''}
            onChange={(e) => onInputChange('visuals', e.target.value)}
            placeholder="예: 흙, 나무, 풀잎과 같은 자연에서 영감을 받은 색상 팔레트, 미니멀하고 깨끗한 디자인"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandMessageForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">4. 핵심 메시지 및 슬로건</h2>
      <p className="text-gray-500">고객에게 전달할 핵심 메시지와 기억하기 쉬운 슬로건을 만듭니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="brand-message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">핵심 메시지</label>
          <textarea
            id="brand-message"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.coreMessage || ''}
            onChange={(e) => onInputChange('coreMessage', e.target.value)}
            placeholder="예: 지속 가능한 아름다움, 당신의 삶을 더 가치 있게"
          />
        </div>
        <div>
          <label htmlFor="brand-slogan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">슬로건</label>
          <input
            id="brand-slogan"
            className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
            value={brandData?.slogan || ''}
            onChange={(e) => onInputChange('slogan', e.target.value)}
            placeholder="예: 지구를 위한 옷, 당신을 위한 스타일"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandPositioningForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">5. 브랜드 포지셔닝</h2>
      <p className="text-gray-500">경쟁사를 분석하고 차별화 요소를 명확히 합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="competitors" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">경쟁사</label>
          <textarea
            id="competitors"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.competitors || ''}
            onChange={(e) => onInputChange('competitors', e.target.value)}
            placeholder="예: 경쟁사 A (고급 친환경), 경쟁사 B (패스트패션 기반)"
          />
        </div>
        <div>
          <label htmlFor="differentiation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">차별화 요소</label>
          <textarea
            id="differentiation"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.differentiation || ''}
            onChange={(e) => onInputChange('differentiation', e.target.value)}
            placeholder="예: 합리적인 가격과 고품질의 지속 가능한 소재 사용"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandValidationForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">6. 브랜드 검증 및 피드백</h2>
      <p className="text-gray-500">브랜드 아이디어를 검증하고 피드백을 수집하는 방법을 계획합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="feedback-plan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">피드백 계획</label>
          <textarea
            id="feedback-plan"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.feedback || ''}
            onChange={(e) => onInputChange('feedback', e.target.value)}
            placeholder="예: 소셜 미디어 설문조사, 타겟 고객 인터뷰"
          />
        </div>
        <div>
          <label htmlFor="validation-metrics" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">검증 지표</label>
          <textarea
            id="validation-metrics"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.validation || ''}
            onChange={(e) => onInputChange('validation', e.target.value)}
            placeholder="예: 긍정적 피드백 비율, 첫 구매 전환율"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            다음 단계로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};


const BrandRoadmapForm = ({ onNext, onPrevious, onSaveAndExit, brandData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">7. 브랜드 로드맵</h2>
      <p className="text-gray-500">브랜드 런칭 및 성장을 위한 장기적인 계획을 수립합니다.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="brand-roadmap" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">로드맵 계획</label>
          <textarea
            id="brand-roadmap"
            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            value={brandData?.roadmap || ''}
            onChange={(e) => onInputChange('roadmap', e.target.value)}
            placeholder="예: 1단계: 제품 프로토타입 개발 (1-3개월), 2단계: 크라우드펀딩 런칭 (3-6개월), 3단계: 정식 온라인 스토어 오픈 (6개월 이후)"
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={onSaveAndExit} variant="outline">
            <Download className="h-4 w-4 mr-2" /> 저장 후 종료
          </Button>
          <Button onClick={onNext}>
            요약 페이지로 <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const BrandSummaryPage = ({ onPrevious, onSaveAndExit, brandData, onSendEmail }) => {
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  const sections = [
    { title: "브랜드 목표", data: brandData.step1, icon: <Target className="h-4 w-4" />, keys: ["goal", "targetAudience"] },
    { title: "핵심 가치 및 비전", data: brandData.step2, icon: <Flag className="h-4 w-4" />, keys: ["vision", "mission"] },
    { title: "브랜드 스타일", data: brandData.step3, icon: <Palette className="h-4 w-4" />, keys: ["tone", "visuals"] },
    { title: "핵심 메시지", data: brandData.step4, icon: <Megaphone className="h-4 w-4" />, keys: ["coreMessage", "slogan"] },
    { title: "브랜드 포지셔닝", data: brandData.step5, icon: <Search className="h-4 w-4" />, keys: ["competitors", "differentiation"] },
    { title: "브랜드 검증", data: brandData.step6, icon: <Clipboard className="h-4 w-4" />, keys: ["feedback", "validation"] },
    { title: "브랜드 로드맵", data: brandData.step7, icon: <BarChart className="h-4 w-4" />, keys: ["roadmap"] },
  ];

  const getLabel = (key) => {
    switch (key) {
      case "goal": return "브랜드 목표";
      case "targetAudience": return "타겟 고객";
      case "vision": return "비전";
      case "mission": return "미션";
      case "tone": return "브랜드 톤앤매너";
      case "visuals": return "시각적 요소";
      case "coreMessage": return "핵심 메시지";
      case "slogan": return "슬로건";
      case "competitors": return "경쟁사";
      case "differentiation": return "차별화 요소";
      case "feedback": return "피드백 계획";
      case "validation": return "검증 지표";
      case "roadmap": return "로드맵 계획";
      default: return key;
    }
  };

  const getDisplayValue = (key, data) => {
    return data?.[key] ? data[key] : "내용이 없습니다.";
  };
  
  const handleDownloadPdf = async () => {
    setError(null);
    if (typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
      setTimeout(handleDownloadPdf, 500);
      return;
    }
    
    const summaryElement = document.getElementById('brand-summary-content-wrapper');
    if (!summaryElement) {
        setError('요약 페이지 내용을 찾을 수 없습니다.');
        return;
    }
    
    setIsPdfGenerating(true);
    
    try {
      // Create a new element with clean inline styles for PDF generation
      const clonedElement = summaryElement.cloneNode(true);
      clonedElement.id = 'pdf-clone-element';
      
      // Apply inline styles to override all Tailwind classes
      const applyInlineStyles = (element) => {
        // Base styles
        element.style.cssText = '';
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.lineHeight = '1.5';
        element.style.margin = '0';
        element.style.padding = '8px';
        element.style.backgroundColor = '#ffffff';
        element.style.color = '#000000';
        element.style.border = 'none';
        element.style.borderRadius = '0';
        element.style.boxShadow = 'none';
        
        // Handle different element types
        if (element.classList.contains('space-y-6')) {
          element.style.display = 'block';
          Array.from(element.children).forEach((child, index) => {
            if (index > 0) child.style.marginTop = '24px';
          });
        }
        
        if (element.classList.contains('space-y-4')) {
          element.style.display = 'block';
          Array.from(element.children).forEach((child, index) => {
            if (index > 0) child.style.marginTop = '16px';
          });
        }
        
        if (element.classList.contains('space-y-2')) {
          element.style.display = 'block';
          Array.from(element.children).forEach((child, index) => {
            if (index > 0) child.style.marginTop = '8px';
          });
        }
        
        if (element.classList.contains('grid')) {
          element.style.display = 'grid';
          element.style.gridTemplateColumns = 'repeat(2, 1fr)';
          element.style.gap = '16px';
        }
        
        if (element.tagName === 'H3') {
          element.style.fontSize = '20px';
          element.style.fontWeight = 'bold';
          element.style.marginBottom = '12px';
          element.style.color = '#111827';
        }
        
        if (element.tagName === 'H4') {
          element.style.fontSize = '14px';
          element.style.fontWeight = '600';
          element.style.marginBottom = '8px';
          element.style.color = '#374151';
        }
        
        if (element.tagName === 'P') {
          element.style.fontSize = '16px';
          element.style.color = '#111827';
          element.style.whiteSpace = 'pre-wrap';
        }
        
        if (element.classList.contains('border')) {
          element.style.border = '1px solid #e5e7eb';
        }
        
        if (element.classList.contains('rounded-lg')) {
          element.style.borderRadius = '8px';
        }
        
        if (element.classList.contains('bg-white')) {
          element.style.backgroundColor = '#ffffff';
        }
        
        if (element.classList.contains('p-4')) {
          element.style.padding = '16px';
        }
        
        // Icons - hide them for PDF
        if (element.tagName === 'svg' || element.classList.contains('h-4') || element.classList.contains('h-5')) {
          element.style.display = 'none';
        }
        
        // Process all children recursively
        Array.from(element.children).forEach(child => {
          applyInlineStyles(child);
        });
      };
      
      applyInlineStyles(clonedElement);
      
      // Temporarily add the cloned element to the DOM
      document.body.appendChild(clonedElement);
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '0';
      clonedElement.style.width = '800px';
      clonedElement.style.backgroundColor = '#ffffff';

      const canvas = await window.html2canvas(clonedElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 800,
        height: clonedElement.scrollHeight,
        useCORS: true,
        allowTaint: true
      });
      
      // Remove the cloned element
      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdf.internal.pageSize.getHeight();
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save('브랜드_구축_요약.pdf');
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      setError(`PDF 생성 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-[#2563eb]" /> 브랜드 구축 요약
      </h2>
      <p className="text-gray-500">지금까지 입력한 정보를 한눈에 확인하고 PDF로 다운로드하거나 이메일로 전송할 수 있습니다.</p>
      
      {isPdfGenerating && (
          <div className="text-center text-[#2563eb] p-4 bg-[#f0f9ff] rounded-md flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" /> PDF를 생성 중입니다. 잠시만 기다려주세요...
          </div>
      )}
      
      {error && (
        <div className="text-center text-red-600 p-4 bg-red-50 border border-red-200 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {/* PDF 변환 시 오류를 방지하기 위해, 컨테이너에 배경색을 강제로 지정합니다. */}
      {/* 이 Wrapper를 `html2canvas`의 대상(target)으로 지정합니다. */}
      <div id="brand-summary-content-wrapper" className="bg-white p-2 rounded-lg">
        <div id="brand-summary-content" className="space-y-6 p-4 border rounded-lg bg-[#f9fafb]">
          <div className="space-y-6 p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-500" /> 개인정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">이름</h4>
                <p className="text-gray-900">{brandData?.step0?.name || "내용이 없습니다."}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">이메일</h4>
                <p className="text-gray-900">{brandData?.step0?.email || "내용이 없습니다."}</p>
              </div>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-6 p-4 border rounded-lg bg-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {section.icon} {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.keys.map(key => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">{getLabel(key)}</h4>
                    <p className="text-gray-900 whitespace-pre-wrap">{getDisplayValue(key, section.data)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-8">
        <Button onClick={onPrevious} variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="h-4 w-4 mr-2" /> 이전
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={handleDownloadPdf} variant="outline" disabled={isPdfGenerating}>
            <Download className="h-4 w-4 mr-2" /> PDF로 저장
          </Button>
          <Button onClick={onSendEmail} variant="default" disabled={isPdfGenerating}>
            <MessageCircle className="h-4 w-4 mr-2" /> 이메일로 보내기
          </Button>
        </div>
      </div>
    </div>
  );
};


// Generate email content from brand data
const generateEmailContent = (brandData) => {
  if (!brandData) return '<p>브랜드 데이터가 없습니다.</p>';

  const sections = [
    { title: "개인정보", data: brandData.step0, keys: ["name", "email"] },
    { title: "브랜드 목표", data: brandData.step1, keys: ["goal", "targetAudience"] },
    { title: "핵심 가치 및 비전", data: brandData.step2, keys: ["vision", "mission"] },
    { title: "브랜드 스타일", data: brandData.step3, keys: ["tone", "visuals"] },
    { title: "핵심 메시지", data: brandData.step4, keys: ["coreMessage", "slogan"] },
    { title: "브랜드 포지셔닝", data: brandData.step5, keys: ["competitors", "differentiation"] },
    { title: "브랜드 검증", data: brandData.step6, keys: ["feedback", "validation"] },
    { title: "브랜드 로드맵", data: brandData.step7, keys: ["roadmap"] },
  ];

  const getLabel = (key) => {
    const labels = {
      "name": "이름",
      "email": "이메일",
      "goal": "브랜드 목표",
      "targetAudience": "타겟 고객",
      "vision": "비전",
      "mission": "미션",
      "tone": "브랜드 톤앤매너",
      "visuals": "시각적 요소",
      "coreMessage": "핵심 메시지",
      "slogan": "슬로건",
      "competitors": "경쟁사",
      "differentiation": "차별화 요소",
      "feedback": "피드백 계획",
      "validation": "검증 지표",
      "roadmap": "로드맵 계획"
    };
    return labels[key] || key;
  };

  const getDisplayValue = (key, data) => {
    return data?.[key] ? data[key].replace(/\n/g, '<br>') : "내용이 없습니다.";
  };

  let emailHTML = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
          .section { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
          .section-title { color: #2563eb; font-size: 18px; font-weight: bold; margin-bottom: 15px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
          .field-content { color: #111827; white-space: pre-wrap; }
          .footer { text-align: center; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 브랜드 빌더 - 브랜드 구축 요약</h1>
          <p>축하합니다! 브랜드 구축 과정을 완료하셨습니다.</p>
        </div>
  `;

  sections.forEach(section => {
    if (section.data && Object.keys(section.data).length > 0) {
      emailHTML += `
        <div class="section">
          <h2 class="section-title">${section.title}</h2>
      `;
      
      section.keys.forEach(key => {
        const value = getDisplayValue(key, section.data);
        if (value !== "내용이 없습니다.") {
          emailHTML += `
            <div class="field">
              <div class="field-label">${getLabel(key)}</div>
              <div class="field-content">${value}</div>
            </div>
          `;
        }
      });
      
      emailHTML += `</div>`;
    }
  });

  emailHTML += `
        <div class="footer">
          <p>브랜드 빌더를 이용해 주셔서 감사합니다!</p>
          <p>더 많은 기능과 도움이 필요하시면 언제든 문의해 주세요.</p>
        </div>
      </body>
    </html>
  `;

  return emailHTML;
};


const brandSteps = [
  { id: 'step-0', title: '시작하기', icon: <Play /> },
  { id: 'step-1', title: '목표 정의', icon: <Target /> },
  { id: 'step-2', title: '핵심 가치', icon: <Flag /> },
  { id: 'step-3', title: '스타일', icon: <Palette /> },
  { id: 'step-4', title: '핵심 메시지', icon: <Megaphone /> },
  { id: 'step-5', title: '포지셔닝', icon: <Search /> },
  { id: 'step-6', title: '검증', icon: <Users /> },
  { id: 'step-7', title: '로드맵', icon: <BarChart /> },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  // Load PDF libraries
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadScripts = () => {
        const scriptIds = ['jspdf', 'html2canvas'];
        scriptIds.forEach(id => {
          if (!document.getElementById(id)) {
            const script = document.createElement('script');
            script.id = id;
            if (id === 'jspdf') {
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            } else if (id === 'html2canvas') {
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            }
            document.body.appendChild(script);
          }
        });
      };
      loadScripts();
    }
  }, []);

  // Handler to manage overall state from the parent component
  const handleInputChange = (stepId, key, value) => {
    if (!currentProject) return;
    setCurrentProject(prevProject => ({
      ...prevProject,
      brandData: {
        ...prevProject.brandData,
        [stepId]: {
          ...prevProject.brandData[stepId],
          [key]: value,
        },
      },
    }));
  };

  // Move to the next step
  const handleNext = () => {
    if (!currentProject) return;
    const nextStepIndex = currentProject.stepIndex + 1;
    setCurrentProject(prevProject => ({ ...prevProject, stepIndex: nextStepIndex }));

    if (nextStepIndex < brandSteps.length) {
      const nextStepId = brandSteps[nextStepIndex].id;
      setCurrentPage(nextStepId);
    } else {
      setCurrentPage('summary');
    }
  };

  // Move to the previous step
  const handlePrevious = () => {
    if (!currentProject) return;
    const prevStepIndex = currentProject.stepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentProject(prevProject => ({ ...prevProject, stepIndex: prevStepIndex }));
      const prevStepId = brandSteps[prevStepIndex].id;
      setCurrentPage(prevStepId);
    } else {
      handleSaveAndExit();
    }
  };

  // Save project and return to dashboard
  const handleSaveAndExit = () => {
    if (!currentProject) return;
    
    const updatedProject = {
      ...currentProject,
      lastSaved: new Date().toLocaleString(),
      status: isAllStepsComplete(currentProject.brandData) ? "Completed" : `In Progress (Step ${currentProject.stepIndex + 1})`,
    };

    if (currentProject.id) {
      setProjects(prevProjects => prevProjects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      ));
    } else {
      updatedProject.id = Date.now().toString();
      updatedProject.name = updatedProject.brandData?.step0?.name || `Brand Project #${projects.length + 1}`;
      setProjects(prevProjects => [...prevProjects, updatedProject]);
    }
    
    setCurrentProject(null);
    setCurrentPage('dashboard');
  };
  
  // Check if all required steps (1-7) are complete
  const isAllStepsComplete = (brandData) => {
    if (!brandData) return false;
    for (let i = 1; i <= 7; i++) {
      const stepId = `step-${i}`;
      if (!brandData[stepId] || Object.values(brandData[stepId]).some(value => !value)) {
        return false;
      }
    }
    return true;
  };
  
  // Start a new project
  const handleStartNew = () => {
    const newProject = {
      id: null,
      brandData: {},
      stepIndex: 0,
      status: "Not Started",
      lastSaved: "No saved data",
    };
    setCurrentProject(newProject);
    setCurrentPage('step-0');
  };

  // Continue an existing project
  const handleContinueProject = (projectId) => {
    const projectToLoad = projects.find(p => p.id === projectId);
    if (projectToLoad) {
      setCurrentProject(projectToLoad);
      const targetPage = brandSteps[projectToLoad.stepIndex].id;
      setCurrentPage(targetPage);
    }
  };

  // Delete a project
  const handleDeleteProject = (projectId) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };
  
  const handleSummaryPagePrevious = () => {
    const lastStepIndex = brandSteps.length - 1;
    setCurrentProject(prevProject => ({ ...prevProject, stepIndex: lastStepIndex }));
    setCurrentPage(brandSteps[lastStepIndex].id);
  };
  
  const handleSummaryPageSaveAndExit = () => {
    if (!currentProject) return;
    
    const finalProject = {
      ...currentProject,
      lastSaved: new Date().toLocaleString(),
      status: "Completed",
    };
    if (currentProject.id) {
      setProjects(prevProjects => prevProjects.map(p => 
        p.id === finalProject.id ? finalProject : p
      ));
    } else {
      finalProject.id = Date.now().toString();
      finalProject.name = finalProject.brandData?.step0?.name || `Brand Project #${projects.length + 1}`;
      setProjects(prevProjects => [...prevProjects, finalProject]);
    }
    
    setCurrentProject(null);
    setCurrentPage('dashboard');
  };

  const handleSendEmailConfirmation = () => {
    setShowEmailModal(true);
  };

  const handleConfirmEmail = async () => {
    const userEmail = currentProject?.brandData?.step0?.email;
    if (!userEmail) {
      alert('이메일 주소가 없습니다.');
      setShowEmailModal(false);
      return;
    }
    
    const emailContent = generateEmailContent(currentProject?.brandData);
    
    try {
      // Replace with your actual Railway backend domain
      const response = await fetch('https://perch-brand-production.up.railway.app/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: currentProject.brandData?.step0?.email,
          subject: '[브랜드 빌더] 브랜드 구축 요약본',
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        alert('이메일이 성공적으로 전송되었습니다.');
      } else {
        alert(`이메일 전송 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('API 호출 중 오류가 발생했습니다.');
    } finally {
      setShowEmailModal(false);
    }
  };

  const handleCancelEmail = () => {
    setShowEmailModal(false);
  };
  
  const renderStep = () => {
    if (currentPage === 'dashboard') {
      return <Dashboard projects={projects} onStartNew={handleStartNew} onContinue={handleContinueProject} onDelete={handleDeleteProject} />;
    }

    if (!currentProject) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-600">작업 중인 프로젝트가 없습니다. 대시보드로 돌아가세요.</p>
          <Button onClick={() => setCurrentPage('dashboard')} className="mt-4">대시보드로 이동</Button>
        </div>
      );
    }
    
    const stepId = brandSteps[currentProject.stepIndex]?.id;
    const currentStepData = currentProject.brandData[stepId] || {};

    const stepProps = {
      onNext: handleNext,
      onPrevious: handlePrevious,
      onSaveAndExit: handleSaveAndExit,
      brandData: currentStepData,
      onInputChange: (key, value) => handleInputChange(stepId, key, value),
    };

    switch (currentPage) {
      case 'step-0':
        return <BrandInfoForm {...stepProps} onInputChange={(key, value) => handleInputChange('step0', key, value)} brandData={currentProject.brandData.step0} />;
      case 'step-1':
        return <BrandGoalForm {...stepProps} onInputChange={(key, value) => handleInputChange('step1', key, value)} brandData={currentProject.brandData.step1} />;
      case 'step-2':
        return <BrandValueForm {...stepProps} onInputChange={(key, value) => handleInputChange('step2', key, value)} brandData={currentProject.brandData.step2} />;
      case 'step-3':
        return <BrandStyleForm {...stepProps} onInputChange={(key, value) => handleInputChange('step3', key, value)} brandData={currentProject.brandData.step3} />;
      case 'step-4':
        return <BrandMessageForm {...stepProps} onInputChange={(key, value) => handleInputChange('step4', key, value)} brandData={currentProject.brandData.step4} />;
      case 'step-5':
        return <BrandPositioningForm {...stepProps} onInputChange={(key, value) => handleInputChange('step5', key, value)} brandData={currentProject.brandData.step5} />;
      case 'step-6':
        return <BrandValidationForm {...stepProps} onInputChange={(key, value) => handleInputChange('step6', key, value)} brandData={currentProject.brandData.step6} />;
      case 'step-7':
        return <BrandRoadmapForm {...stepProps} onInputChange={(key, value) => handleInputChange('step7', key, value)} brandData={currentProject.brandData.step7} />;
      case 'summary':
        return <BrandSummaryPage onPrevious={handleSummaryPagePrevious} onSaveAndExit={handleSummaryPageSaveAndExit} brandData={currentProject.brandData} onSendEmail={handleSendEmailConfirmation} />;
      default:
        return <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  const currentStepTitle = currentProject ? brandSteps[currentProject.stepIndex]?.title : '';

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">브랜드 빌더</h1>
        <p className="text-center text-gray-500 mb-8">당신의 비즈니스를 위한 완벽한 브랜드를 단계별로 구축해 보세요.</p>
        
        {/* Navigation Bar */}
        {currentPage !== 'dashboard' && (
          <>
            <div className="flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-8 overflow-x-auto whitespace-nowrap">
              {brandSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-colors duration-200 ${
                      index <= currentProject?.stepIndex ? 'text-[#2563eb]' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                        currentProject?.stepIndex > index ? 'bg-[#2563eb] text-white' : 'bg-gray-200'
                      }`}
                    >
                      {currentProject?.stepIndex > index ? <CheckCircle className="h-5 w-5" /> : step.icon}
                    </div>
                    <span className="text-sm font-medium mt-1">{step.title}</span>
                  </div>
                  {index < brandSteps.length - 1 && (
                    <div className={`h-0.5 w-8 mx-2 ${index < currentProject?.stepIndex ? 'bg-[#2563eb]' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
              <div
                className={`flex flex-col items-center transition-colors duration-200 ${
                  isAllStepsComplete(currentProject?.brandData) ? 'text-[#2563eb] cursor-pointer' : 'text-gray-400'
                }`}
                onClick={() => isAllStepsComplete(currentProject?.brandData) && setCurrentPage('summary')}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentPage === 'summary' ? 'bg-[#2563eb] text-white' : 'bg-gray-200'
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium mt-1">요약</span>
              </div>
            </div>
          </>
        )}

        {/* Content Rendering Area */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          {renderStep()}
        </div>
      </div>
      
      {showEmailModal && (
        <ConfirmationModal
          message={`${currentProject?.brandData?.step0?.email}로 요약 내용을 전송하시겠습니까?`}
          onConfirm={handleConfirmEmail}
          onCancel={handleCancelEmail}
          confirmText="전송"
        />
      )}
    </div>
  );
}