"use client";

import { useState } from "react";

import {
  PLUS_MINUS_SCALE,
  validateGradeScale,
  type GradeScaleItem,
} from "@/lib/calculators/grade-calculator";

import WeightedGradeForm from "./WeightedGradeForm";
import FinalGradePlanner from "./FinalGradePlanner";
import FinalExamCalculator from "./FinalExamCalculator";
import GPACalculator from "./GPACalculator";
import GradeScaleSettings from "./GradeScaleSettings";
import HowItWorks from "./HowItWorks";

const tabs = [
  {
    id: "weighted",
    label: "Weighted Grade",
  },
  {
    id: "planner",
    label: "Final Grade Planner",
  },
  {
    id: "exam",
    label: "Final Exam Calculator",
  },
  {
    id: "gpa",
    label: "GPA Calculator",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function GradeCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>("weighted");

  const [scale, setScale] = useState<GradeScaleItem[]>(
    PLUS_MINUS_SCALE.map((item) => ({ ...item })),
  );

  const scaleError = validateGradeScale(scale);

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Grade Calculator
          </h1>

          <p className="mt-2 text-muted-foreground">
            Calculate weighted grades, plan your final grade,
            estimate your exam score, and calculate your GPA.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Grade calculator options"
          className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-muted/30 p-2 sm:grid-cols-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div
            id="panel-weighted"
            role="tabpanel"
            aria-labelledby="tab-weighted"
            hidden={activeTab !== "weighted"}
          >
            <WeightedGradeForm
              scale={scale}
              scaleError={scaleError}
            />
          </div>

          <div
            id="panel-planner"
            role="tabpanel"
            aria-labelledby="tab-planner"
            hidden={activeTab !== "planner"}
          >
            <FinalGradePlanner />
          </div>

          <div
            id="panel-exam"
            role="tabpanel"
            aria-labelledby="tab-exam"
            hidden={activeTab !== "exam"}
          >
            <FinalExamCalculator />
          </div>

          <div
            id="panel-gpa"
            role="tabpanel"
            aria-labelledby="tab-gpa"
            hidden={activeTab !== "gpa"}
          >
            <GPACalculator
              scale={scale}
              scaleError={scaleError}
            />
          </div>
        </div>
      </section>

      <GradeScaleSettings
        scale={scale}
        onChange={setScale}
      />

      <HowItWorks />
    </div>
  );
}