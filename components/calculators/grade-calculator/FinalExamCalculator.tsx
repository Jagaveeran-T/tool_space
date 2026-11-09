"use client";

import { useState } from "react";

import {
  calculateRequiredFinalExamGrade,
  type RequiredGradeResult,
} from "@/lib/calculators/grade-calculator";

export default function FinalExamCalculator() {
  const [currentGrade, setCurrentGrade] = useState("85");
  const [targetGrade, setTargetGrade] = useState("90");
  const [examWeight, setExamWeight] = useState("30");

  const [result, setResult] =
    useState<RequiredGradeResult | null>(null);

  const [error, setError] = useState("");

  const handleInputChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setResult(null);
    setError("");
  };

  const calculate = () => {
    const current = Number(currentGrade);
    const target = Number(targetGrade);
    const weight = Number(examWeight);

    if (
      currentGrade.trim() === "" ||
      targetGrade.trim() === "" ||
      examWeight.trim() === "" ||
      !Number.isFinite(current) ||
      !Number.isFinite(target) ||
      !Number.isFinite(weight) ||
      current < 0 ||
      current > 150 ||
      target < 0 ||
      target > 100 ||
      weight <= 0 ||
      weight > 100
    ) {
      setError("Please enter valid values for all three fields.");
      setResult(null);
      return;
    }

    const calculated = calculateRequiredFinalExamGrade(
      current,
      target,
      weight,
    );

    if (!calculated) {
      setError("Unable to calculate the required exam grade.");
      setResult(null);
      return;
    }

    setResult(calculated);
    setError("");
  };

  const inputClassName =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Final Exam Calculator
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Calculate the score you need on your final exam.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="exam-current-grade"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Current Grade (%)
          </label>
          <input
            id="exam-current-grade"
            type="number"
            min="0"
            max="150"
            step="0.01"
            value={currentGrade}
            onChange={(event) =>
              handleInputChange(setCurrentGrade, event.target.value)
            }
            aria-invalid={!!error}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="exam-target-grade"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Target Course Grade (%)
          </label>
          <input
            id="exam-target-grade"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={targetGrade}
            onChange={(event) =>
              handleInputChange(setTargetGrade, event.target.value)
            }
            aria-invalid={!!error}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="exam-weight"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Final Exam Weight (%)
          </label>
          <input
            id="exam-weight"
            type="number"
            min="0.01"
            max="100"
            step="0.01"
            value={examWeight}
            onChange={(event) =>
              handleInputChange(setExamWeight, event.target.value)
            }
            aria-invalid={!!error}
            className={inputClassName}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={calculate}
        className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Calculate Exam Grade
      </button>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {result && (
        <div
          className="rounded-xl border border-border bg-card p-5"
          aria-live="polite"
        >
          {result.alreadyAchieved ? (
            <>
              <p className="font-semibold text-foreground">
                Your target is already secured.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                A 0% on the final exam would still leave you at or
                above your target.
              </p>
              <p className="mt-3 text-4xl font-bold text-foreground">
                0% required
              </p>
            </>
          ) : result.achievable ? (
            <>
              <p className="text-sm text-muted-foreground">
                Required Final Exam Score
              </p>
              <p className="mt-2 text-4xl font-bold text-foreground">
                {result.requiredGrade.toFixed(2)}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You need this score on your final exam to reach your
                target course grade.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-destructive">
                Your target is not achievable with the remaining exam.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Your maximum possible final course grade is:
              </p>
              <p className="mt-3 text-4xl font-bold text-foreground">
                {result.maximumFinalGrade.toFixed(2)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}