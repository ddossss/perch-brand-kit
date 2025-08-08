"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Circle,
  Play,
  ArrowRight,
  ArrowLeft,
  Download,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Simplified shadcn/ui components
const Button = ({ children, onClick, variant = "default", size = "default", className = "", type = "button", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-600 text-white shadow hover:bg-blue-700",
    outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
  };
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  // Replace Tailwind classes with inline styles for PDF compatibility
  let inlineStyle = {};
  if (variants[variant].includes('bg-blue-600')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#2563eb', color: '#ffffff' };
  }
  if (variants[variant].includes('border-gray-200')) {
    inlineStyle = { ...inlineStyle, borderColor: '#e5e7eb', backgroundColor: '#ffffff', color: '#0a0a0a' };
  }
  if (variants[variant].includes('hover:bg-gray-100')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#ffffff', color: '#0a0a0a' };
  }
  
  return (
    <button
      type={type}
      className={combinedClassName}
      style={inlineStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", onClick }) => {
  return (
    <div onClick={onClick} className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow ${className}`} style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff', color: '#0a0a0a' }}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`font-semibold tracking-tight text-2xl ${className}`} style={{ color: '#111827' }}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`} style={{ color: '#6b7280' }}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} style={{ color: '#4b5563' }}>
      {children}
    </label>
  );
};

const Textarea = ({ value, onChange, placeholder, name, id, className = "", ...props }) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ minHeight: '80px', borderColor: '#e5e7eb', backgroundColor: '#ffffff', color: '#6b7280' }}
      {...props}
    />
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "border-transparent bg-gray-900 text-gray-50",
    secondary: "border-transparent bg-gray-100 text-gray-900",
    outline: "border-gray-200 text-gray-950",
    success: "border-transparent bg-green-500 text-white",
    progress: "border-transparent bg-blue-500 text-white",
  };
  
  let inlineStyle = {};
  if (variants[variant].includes('bg-gray-900')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#111827', color: '#f9fafb' };
  } else if (variants[variant].includes('bg-gray-100')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#f3f4f6', color: '#111827' };
  } else if (variants[variant].includes('bg-green-500')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#22c55e', color: '#ffffff' };
  } else if (variants[variant].includes('bg-blue-500')) {
    inlineStyle = { ...inlineStyle, backgroundColor: '#3b82f6', color: '#ffffff' };
  }
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`} style={inlineStyle}>
      {children}
    </span>
  );
};

// Brand Journey step data
const brandSteps = [
  { id: 1, title: "Define Your Essence", description: "브랜드의 핵심 가치와 미션을 발견하세요." },
  { id: 2, title: "Define Your Persona", description: "브랜드의 개성과 목소리를 만드세요." },
  { id: 3, title: "Organize Brand Expression Style", description: "일관된 브랜드 스타일 가이드를 정리하세요." },
  { id: 4, title: "Refine Brand Message", description: "브랜드의 핵심 메시지를 다듬으세요." },
  { id: 5, title: "Create Brand Positioning Map", description: "시장에서 브랜드의 위치를 파악하세요." },
  { id: 6, title: "Validate Brand Hypothesis", description: "브랜드의 핵심 가치를 테스트할 계획을 세우세요." },
  { id: 7, title: "Create Brand Roadmap", description: "브랜드 성장을 위한 장기 계획을 세우세요." },
  { id: 8, title: "Define Customer Persona", description: "이상적인 고객의 특징을 구체적으로 정의하세요." },
  { id: 9, title: "Create Brand Launch Strategy", description: "시장에 브랜드를 성공적으로 론칭할 전략을 세우세요." },
  { id: 10, title: "Monitor & Optimize", description: "브랜드 성과를 추적하고 최적화할 계획을 세우세요." },
];

const getStatusIcon = (status) => {
  if (status === 'completed') {
    return <CheckCircle className="h-6 w-6 text-green-500" style={{ color: '#22c55e' }} />;
  }
  if (status === 'in-progress') {
    return <Play className="h-6 w-6 text-blue-500" style={{ color: '#3b82f6' }} />;
  }
  return <Circle className="h-6 w-6 text-gray-400" style={{ color: '#9ca3af' }} />;
};

const getStatusBadge = (status) => {
  if (status === 'completed') {
    return <Badge variant="success">완료</Badge>;
  }
  if (status === 'in-progress') {
    return <Badge variant="progress">진행 중</Badge>;
  }
  return <Badge variant="secondary">시작 전</Badge>;
};

// Generic Form Component
const BrandStepForm = ({ stepId, title, description, fields, onNext, onPrevious, onSave, onExit, brandData, onInputChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    onInputChange(stepId, name, value);
  };

  const handleExitClick = () => {
    if (window.confirm('저장하시겠습니까? (확인: 저장 후 나가기, 취소: 저장하지 않고 나가기)')) {
      onExit(true); // 저장 후 나가기
    } else {
      onExit(false); // 저장하지 않고 나가기
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{ color: '#111827' }}>{`Step ${stepId}: ${title}`}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground" style={{ color: '#6b7280' }}>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {fields.map((field) => (
              <div key={field.id} className="space-y-3">
                <Label htmlFor={field.id} className="text-base font-medium" style={{ color: '#4b5563' }}>{field.label}</Label>
                <Textarea
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="min-h-[120px] resize-none"
                  style={{ minHeight: '120px', borderColor: '#e5e7eb', backgroundColor: '#ffffff', color: '#6b7280' }}
                  required
                  value={brandData[field.name]}
                  onChange={handleTextAreaChange}
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4">
              <Button type="button" variant="outline" onClick={onPrevious} disabled={stepId === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> 이전 단계
              </Button>
              <Button type="submit">
                {stepId < brandSteps.length ? '다음 단계' : '요약 보기'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-200" style={{ borderColor: '#e5e7eb' }}>
            <Button type="button" variant="outline" onClick={onSave}>저장</Button>
            <Button type="button" variant="ghost" onClick={() => onExit(false)}>
              저장하지 않고 나가기
            </Button>
            <Button type="button" onClick={handleExitClick}>나가기</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BrandSummaryPage = ({ onPrevious, brandData, onExit }) => {
  const handleDownload = () => {
    const input = document.getElementById('brand-summary-content');
    if (!input) {
      console.error('Summary content element not found!');
      return;
    }

    html2canvas(input, {
      scale: 2, // 해상도를 높여서 PDF 품질을 향상
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('brand-kit-summary.pdf');
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{ color: '#111827' }}>브랜드 아이덴티티가 완성되었습니다!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground" style={{ color: '#6b7280' }}>
            브랜드 아이덴티티를 검토하고 전체 브랜드 키트를 다운로드하세요.
          </CardDescription>
        </CardHeader>
        <div id="brand-summary-content" className="p-6 pt-0 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 1: Define Your Essence</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>이 브랜드를 시작하는 이유:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step1.brandReason}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>미션 및 비전:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step1.missionVision}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>핵심 가치:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step1.coreValues}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>고객이 느끼길 원하는 감정:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step1.customerFeeling}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 2: Define Your Persona</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드의 인구통계학적 특성:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step2.personDemographics}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드의 목소리 및 톤:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step2.brandVoiceTone}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 스토리:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step2.brandStory}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>캐치프레이즈:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step2.catchphrases}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>고객에 대한 태도:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step2.customerAttitude}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 3: Organize Brand Expression Style</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>주요 브랜드 색상:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step3.mainColor}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>서체 스타일:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step3.fontStyle}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>이미지 및 그래픽 스타일:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step3.imageStyle}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 스타일 키워드:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step3.brandKeywords}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 4: Refine Brand Message</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 슬로건:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step4.brandSlogan}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>고유한 가치 제안:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step4.valueProposition}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 소개:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step4.brandIntroduction}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 철학:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step4.brandPhilosophy}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 5: Create Your Positioning Statement</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>타겟 고객:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step5.customerDemographics}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>경쟁사 분석:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step5.competitorAnalysis}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>고객의 문제점:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step5.customerPains}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>기대하는 해결책:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step5.expectedSolutions}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 6: Validate Your Brand Concept</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>주요 경쟁사:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step6.competitorList}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드 차별점:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step6.brandDifferentiator}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드의 고유한 틈새시장:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step6.brandNichePosition}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 7: Develop Your Brand Roadmap</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>단기 및 장기 목표:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step7.brandGoals}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>구체적인 실행 계획:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step7.actionPlan}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>성장 전략:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step7.growthPlan}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>주요 마일스톤 및 KPI:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step7.milestonesKpis}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 8: Define Customer Persona</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>고객 페르소나 이름:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step8.personaName}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>인구통계학적 정보:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step8.personaDemographics}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>페르소나의 목표와 도전과제:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step8.personaGoals}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>브랜드가 페르소나에게 제공할 가치:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step8.personaValue}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 9: Create Brand Launch Strategy</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>론칭 목표:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step9.launchGoals}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>핵심 메시지:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step9.launchMessage}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>채널 및 활동:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step9.launchChannels}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>Step 10: Monitor & Optimize</h3>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>주요 성과 지표 (KPIs):</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step10.kpis}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>모니터링 도구 및 방법:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step10.monitoringTools}</div>
            </div>
            <div className="space-y-2">
              <p className="font-medium" style={{ color: '#374151' }}>최적화 계획:</p>
              <div className="p-4 rounded-md whitespace-pre-wrap" style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}>{brandData.step10.optimizationPlan}</div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex justify-between space-x-4">
          <Button type="button" variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 이전 단계
          </Button>
          <Button type="button" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> 브랜드 키트 다운로드
          </Button>
          <Button type="button" onClick={onExit}>
            저장 및 종료
          </Button>
        </div>
      </Card>
    </div>
  );
};


const DashboardPage = ({ stepStatus, onCardClick, onContinueClick, completedSteps, totalSteps, progressPercentage, nextStepTitle, stepProgress }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 md:p-10" style={{ backgroundColor: '#ffffff' }}>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center" style={{ color: '#111827' }}>브랜드 여정 대시보드</h1>
        <p className="mt-2 text-xl text-gray-600 text-center" style={{ color: '#4b5563' }}>
          브랜드를 구축하는 여정을 시작하세요.
        </p>
      </header>

      {/* Progress Card */}
      <Card className="mb-8 p-6" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold" style={{ color: '#1e40af' }}>
            진행 상황
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full h-3 rounded-full mb-3" style={{ backgroundColor: '#e5e7eb' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%`, backgroundColor: '#2563eb' }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm font-medium" style={{ color: '#4b5563' }}>
            <span>{completedSteps} / {totalSteps} 단계 완료</span>
            <span>{progressPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Step CTA */}
      {nextStepTitle && (
        <Card className="mb-12 p-6" style={{ backgroundColor: '#f0fdf4', borderColor: '#dcfce7' }}>
          <CardContent className="p-0 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 text-left">
              <div className="flex-shrink-0">
                <Lightbulb className="h-10 w-10" style={{ color: '#16a34a' }} />
              </div>
              <div>
                <p className="text-lg font-semibold" style={{ color: '#1f2937' }}>다음 단계: {nextStepTitle}</p>
                <p style={{ color: '#4b5563' }}>준비되면 계속하세요.</p>
              </div>
            </div>
            <Button
              onClick={onContinueClick}
              size="lg"
              className="mt-4 md:mt-0"
              style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
            >
              <Play className="mr-2 h-4 w-4" /> 계속하기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Steps Grid */}
      <div className="space-y-4">
        {brandSteps.map((step) => (
          <Card
            key={step.id}
            onClick={() => onCardClick(step.id)}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              stepStatus[step.id] === 'completed'
                ? 'border-green-200 bg-green-50/50'
                : stepStatus[step.id] === 'in-progress'
                ? 'border-blue-200 bg-blue-50/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ 
              borderColor: stepStatus[step.id] === 'completed' ? '#dcfce7' : stepStatus[step.id] === 'in-progress' ? '#bfdbfe' : '#e5e7eb',
              backgroundColor: stepStatus[step.id] === 'completed' ? '#f0fdf4' : stepStatus[step.id] === 'in-progress' ? '#eff6ff' : '#ffffff' 
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(stepStatus[step.id])}
                  <div>
                    <CardTitle className="text-lg font-semibold" style={{ color: '#111827' }}>
                      Step {step.id}: {step.title}
                    </CardTitle>
                    <CardDescription className="mt-1" style={{ color: '#4b5563' }}>
                      {step.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(stepStatus[step.id])}
                  {stepProgress[step.id] > 0 && (
                    <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${stepProgress[step.id]}%`, backgroundColor: '#60a5fa' }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentStep, setCurrentStep] = useState(0);
  const [brandData, setBrandData] = useState({
    step1: { brandReason: '', missionVision: '', coreValues: '', customerFeeling: '' },
    step2: { personDemographics: '', brandVoiceTone: '', brandStory: '', catchphrases: '', customerAttitude: '' },
    step3: { mainColor: '', fontStyle: '', imageStyle: '', brandKeywords: '' },
    step4: { brandSlogan: '', valueProposition: '', brandIntroduction: '', brandPhilosophy: '' },
    step5: { customerDemographics: '', competitorAnalysis: '', customerPains: '', expectedSolutions: '' },
    step6: { competitorList: '', brandDifferentiator: '', brandNichePosition: '' },
    step7: { brandGoals: '', actionPlan: '', growthPlan: '', milestonesKpis: '' },
    step8: { personaName: '', personaDemographics: '', personaGoals: '', personaValue: '' },
    step9: { launchGoals: '', launchMessage: '', launchChannels: '' },
    step10: { kpis: '', monitoringTools: '', optimizationPlan: '' },
  });
  const [stepStatus, setStepStatus] = useState({
    1: 'not-started',
    2: 'not-started',
    3: 'not-started',
    4: 'not-started',
    5: 'not-started',
    6: 'not-started',
    7: 'not-started',
    8: 'not-started',
    9: 'not-started',
    10: 'not-started',
  });

  const stepFields = {
    1: [
      { id: 'brand-reason', name: 'brandReason', label: '이 브랜드를 시작하는 이유는 무엇인가요?', placeholder: '브랜드의 창립 배경과 목적을 설명하세요.' },
      { id: 'mission-vision', name: 'missionVision', label: '당신의 브랜드 미션과 비전은 무엇인가요?', placeholder: '브랜드의 목표와 미래상을 구체적으로 작성하세요.' },
      { id: 'core-values', name: 'coreValues', label: '당신의 핵심 가치는 무엇인가요?', placeholder: '브랜드의 핵심 가치를 나열하세요.' },
      { id: 'customer-feeling', name: 'customerFeeling', label: '고객이 당신의 브랜드를 사용한 후 어떤 느낌을 받기를 원하나요?', placeholder: '고객에게 불러일으키고 싶은 감정을 설명하세요.' },
    ],
    2: [
      { id: 'person-demographics', name: 'personDemographics', label: '브랜드가 사람이라면, 어떤 인구통계학적 특성을 가질까요?', placeholder: 'e.g., 30대 여성, 전문직, 열정적이고 모험을 좋아함.' },
      { id: 'brand-voice-tone', name: 'brandVoiceTone', label: '브랜드의 목소리와 톤은 어떤가요?', placeholder: 'e.g., 친근하고 유머러스, 전문적이고 진지함, 우아하고 세련됨.' },
      { id: 'brand-story', name: 'brandStory', label: '당신의 브랜드 스토리는 무엇인가요?', placeholder: 'e.g., 어떻게 시작되었고, 어떤 어려움을 극복했는지에 대한 이야기.' },
      { id: 'catchphrases', name: 'catchphrases', label: '브랜드의 핵심 슬로건이나 캐치프레이즈는 무엇인가요?', placeholder: 'e.g., \'Just Do It.\', \'Think Different.\'' },
      { id: 'customer-attitude', name: 'customerAttitude', label: '고객에 대한 브랜드의 태도는 어떤가요?', placeholder: 'e.g., 도움이 되는 가이드, 신뢰받는 파트너, 재미있는 친구.' },
    ],
    3: [
      { id: 'main-color', name: 'mainColor', label: '주요 브랜드 색상은 무엇인가요?', placeholder: '브랜드의 주요 색상과 보조 색상을 설명하세요.' },
      { id: 'font-style', name: 'fontStyle', label: '브랜드의 서체 스타일은 어떤가요?', placeholder: 'e.g., 세리프, 산세리프, 손글씨체.' },
      { id: 'image-style', name: 'imageStyle', label: '주로 사용할 이미지 및 그래픽 스타일은 무엇인가요?', placeholder: 'e.g., 사실적인 사진, 일러스트레이션, 미니멀한 사진, 추상적인 아트.' },
      { id: 'brand-keywords', name: 'brandKeywords', label: '브랜드 스타일을 설명하는 키워드는 무엇인가요?', placeholder: 'e.g., 단순함, 우아함, 모던함, 장난스러움.' },
    ],
    4: [
      { id: 'brand-slogan', name: 'brandSlogan', label: '브랜드 슬로건은 무엇인가요?', placeholder: '브랜드의 핵심 가치를 간결하게 담은 슬로건을 작성하세요.' },
      { id: 'value-proposition', name: 'valueProposition', label: '고유한 가치 제안은 무엇인가요?', placeholder: '고객에게 제공하는 독특한 가치를 한 문장으로 정의하세요.' },
      { id: 'brand-introduction', name: 'brandIntroduction', label: '브랜드를 한두 문장으로 설명해 주세요.', placeholder: '브랜드를 간결하게 소개하세요.' },
      { id: 'brand-philosophy', name: 'brandPhilosophy', label: '브랜드의 핵심 철학은 무엇인가요?', placeholder: '브랜드의 근본적인 원칙들을 설명하세요.' },
    ],
    5: [
      { id: 'customer-demographics', name: 'customerDemographics', label: '타겟 고객은 누구인가요?', placeholder: '고객의 인구통계학적, 심리적 특성을 설명하세요.' },
      { id: 'competitor-analysis', name: 'competitorAnalysis', label: '주요 경쟁사는 누구이며, 그들의 강점과 약점은 무엇인가요?', placeholder: '경쟁사 목록을 작성하고 각각의 주요 특징을 분석하세요.' },
      { id: 'customer-pains', name: 'customerPains', label: '고객이 겪고 있는 주요 문제점은 무엇인가요?', placeholder: '고객이 겪는 어려움과 불만족을 설명하세요.' },
      { id: 'expected-solutions', name: 'expectedSolutions', label: '고객이 당신의 브랜드로부터 기대하는 해결책은 무엇인가요?', placeholder: '고객이 찾는 기능이나 이점을 설명하세요.' },
    ],
    6: [
      { id: 'competitor-list', name: 'competitorList', label: '주요 경쟁사는 누구인가요?', placeholder: '경쟁사들의 리스트를 작성하세요.' },
      { id: 'brand-differentiator', name: 'brandDifferentiator', label: '경쟁사와 비교했을 때 당신의 브랜드의 차별점은 무엇인가요?', placeholder: '당신의 브랜드가 제공하는 독특한 가치나 특징을 설명하세요.' },
      { id: 'brand-niche-position', name: 'brandNichePosition', label: '시장에서 당신의 브랜드의 고유한 틈새시장(niche)이나 위치는 무엇인가요?', placeholder: 'e.g., 가장 저렴함, 가장 고급스러움, 가장 지속 가능함.' },
    ],
    7: [
      { id: 'brand-goals', name: 'brandGoals', label: '브랜드의 단기 및 장기 목표는 무엇인가요?', placeholder: '단기(6개월), 중기(1-2년), 장기(5년 이상) 목표를 구분하여 작성하세요.' },
      { id: 'action-plan', name: 'actionPlan', label: '목표를 달성하기 위한 구체적인 실행 계획은 무엇인가요?', placeholder: '마케팅, 제품 개발, 콘텐츠 전략 등 구체적인 계획을 설명하세요.' },
      { id: 'growth-plan', name: 'growthPlan', label: '브랜드 확장 및 성장을 위한 전략은 무엇인가요?', placeholder: 'e.g., 신제품 출시, 새로운 시장 진출, 제휴 캠페인.' },
      { id: 'milestones-kpis', name: 'milestonesKpis', label: '주요 마일스톤과 KPI(핵심 성과 지표)는 무엇인가요?', placeholder: 'e.g., 소셜 미디어 팔로워 1000명, 매출 1000만원, 등.' },
    ],
    8: [
      { id: 'persona-name', name: 'personaName', label: '고객 페르소나의 이름과 특징을 정의해 주세요.', placeholder: 'e.g., 마케터 지수(32세, 잦은 야근으로 효율적인 업무 툴을 찾음).' },
      { id: 'persona-demographics', name: 'personaDemographics', label: '페르소나의 인구통계학적 정보(나이, 직업, 위치 등)를 상세히 작성하세요.', placeholder: 'e.g., 서울 거주, 30대 여성, IT 스타트업 마케터.' },
      { id: 'persona-goals', name: 'personaGoals', label: '페르소나가 달성하고자 하는 목표와 겪고 있는 어려움은 무엇인가요?', placeholder: 'e.g., 목표: 신규 고객 획득. 어려움: 수작업으로 인한 시간 낭비.' },
      { id: 'persona-value', name: 'personaValue', label: '우리 브랜드가 이 페르소나에게 제공할 가치:', placeholder: 'e.g., 시간 절약형 자동화 기능.' },
    ],
    9: [
      { id: 'launch-goals', name: 'launchGoals', label: '론칭의 주요 목표는 무엇인가요?', placeholder: 'e.g., 시장 인지도 30% 달성, 초기 고객 1,000명 확보.' },
      { id: 'launch-message', name: 'launchMessage', label: '론칭 시 전달할 핵심 메시지는 무엇인가요?', placeholder: 'e.g., "당신의 업무를 3배 빠르게 해주는 AI 솔루션."' },
      { id: 'launch-channels', name: 'launchChannels', label: '어떤 채널(SNS, 광고 등)과 활동을 통해 론칭할 계획인가요?', placeholder: 'e.g., 인스타그램 광고, 블로그 콘텐츠 발행, 론칭 기념 웨비나.' },
    ],
    10: [
      { id: 'kpis', name: 'kpis', label: '브랜드 성과를 측정할 주요 지표(KPIs)는 무엇인가요?', placeholder: 'e.g., 웹사이트 트래픽, 소셜 미디어 참여율, 고객 만족도 점수(CSAT).' },
      { id: 'monitoring-tools', name: 'monitoringTools', label: '어떤 도구를 사용하여 성과를 모니터링할 계획인가요?', placeholder: 'e.g., Google Analytics, Ahrefs, 설문조사 도구.' },
      { id: 'optimization-plan', name: 'optimizationPlan', label: '데이터 분석을 통해 어떤 방식으로 브랜드를 최적화할 계획인가요?', placeholder: 'e.g., A/B 테스트를 통한 메시지 개선, 고객 피드백 기반 제품 업데이트.' },
    ],
  };

  useEffect(() => {
    const newStepStatus = brandSteps.reduce((acc, step) => {
      const stepData = brandData[`step${step.id}`];
      const isCompleted = Object.values(stepData).some(value => value.trim() !== '');
      acc[step.id] = isCompleted ? 'completed' : 'not-started';
      return acc;
    }, {});

    const nextIncompleteStep = brandSteps.find(step => !Object.values(brandData[`step${step.id}`]).some(value => value.trim() !== ''));
    if (nextIncompleteStep) {
      newStepStatus[nextIncompleteStep.id] = 'in-progress';
    }

    const allCompleted = Object.values(brandData).every(stepData =>
      Object.values(stepData).every(fieldValue => fieldValue.trim() !== '')
    );
    if (allCompleted) {
      Object.keys(newStepStatus).forEach(key => {
        newStepStatus[key] = 'completed';
      });
    }

    setStepStatus(newStepStatus);
  }, [brandData]);

  const handleCardClick = (stepId) => {
    setCurrentPage(`step-${stepId}`);
    setCurrentStep(stepId - 1);
  };

  const handleNextStep = () => {
    const nextStepId = currentStep + 2;
    if (nextStepId <= brandSteps.length) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        [currentStep + 1]: 'completed',
        [nextStepId]: 'in-progress',
      }));
      setCurrentStep(nextStepId - 1);
      setCurrentPage(`step-${nextStepId}`);
    } else {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        [currentStep + 1]: 'completed',
      }));
      setCurrentPage('summary');
    }
  };

  const handlePrevStep = () => {
    const prevStepId = currentStep;
    if (prevStepId > 0) {
      setCurrentStep(prevStepId - 1);
      setCurrentPage(`step-${prevStepId}`);
    } else {
      setCurrentPage('dashboard');
    }
  };

  const onInputChange = (stepId, name, value) => {
    setBrandData(prevData => ({
      ...prevData,
      [`step${stepId}`]: {
        ...prevData[`step${stepId}`],
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    alert('저장되었습니다.');
  };

  const handleExit = (shouldSave) => {
    if (shouldSave) {
      handleSave();
    }
    setCurrentPage('dashboard');
  };

  const getCompletedStepsCount = () => {
    return brandSteps.filter(step => {
      const stepData = brandData[`step${step.id}`];
      return Object.values(stepData).some(value => value.trim() !== '');
    }).length;
  };

  const getNextStepTitle = () => {
    const nextStep = brandSteps.find(step => stepStatus[step.id] === 'in-progress');
    return nextStep ? nextStep.title : null;
  };

  const getStepProgress = (stepId) => {
    const stepData = brandData[`step${stepId}`];
    if (!stepData) return 0;
    const totalFields = Object.keys(stepData).length;
    if (totalFields === 0) return 0;
    const completedFields = Object.values(stepData).filter(value => value.trim() !== '').length;
    return Math.round((completedFields / totalFields) * 100);
  };

  const renderPage = () => {
    const stepId = currentStep + 1;
    switch (currentPage) {
      case 'dashboard':
        const completedStepsCount = getCompletedStepsCount();
        const totalSteps = brandSteps.length;
        const progressPercentage = Math.round((completedStepsCount / totalSteps) * 100);

        return (
          <DashboardPage
            stepStatus={stepStatus}
            onCardClick={handleCardClick}
            onContinueClick={() => {
              const nextStep = brandSteps.find(step => stepStatus[step.id] === 'in-progress');
              if (nextStep) {
                handleCardClick(nextStep.id);
              }
            }}
            completedSteps={completedStepsCount}
            totalSteps={totalSteps}
            progressPercentage={progressPercentage}
            nextStepTitle={getNextStepTitle()}
            stepProgress={brandSteps.reduce((acc, step) => {
              acc[step.id] = getStepProgress(step.id);
              return acc;
            }, {})}
          />
        );
      case 'step-1':
      case 'step-2':
      case 'step-3':
      case 'step-4':
      case 'step-5':
      case 'step-6':
      case 'step-7':
      case 'step-8':
      case 'step-9':
      case 'step-10':
        const step = brandSteps[currentStep];
        return (
          <BrandStepForm
            stepId={step.id}
            title={step.title}
            description={step.description}
            fields={stepFields[step.id]}
            onNext={handleNextStep}
            onPrevious={handlePrevStep}
            onSave={handleSave}
            onExit={handleExit}
            brandData={brandData[`step${step.id}`]}
            onInputChange={onInputChange}
          />
        );
      case 'summary':
        return <BrandSummaryPage onPrevious={() => {
          setCurrentStep(brandSteps.length - 1);
          setCurrentPage(`step-${brandSteps.length}`);
        }} onExit={() => setCurrentPage('dashboard')} brandData={brandData} />;
      default:
        return <div>페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>
      {renderPage()}
    </div>
  );
}