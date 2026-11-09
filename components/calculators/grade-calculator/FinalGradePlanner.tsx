"use client";

import { useState } from "react";

import {
  calculateRequiredRemainingGrade,
  type RequiredGradeResult,
} from "@/lib/calculators/grade-calculator";

export default function FinalGradePlanner() {
  const [currentGrade, setCurrentGrade] = useState("85");
  const [targetGrade, setTargetGrade] = useState("90");
  const [completedWeight, setCompletedWeight] = useState("70");

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
    const completed = Number(completedWeight);

    if (
      currentGrade.trim() === "" ||
      targetGrade.trim() === "" ||
      completedWeight.trim() === "" ||
      !Number.isFinite(current) ||
      !Number.isFinite(target) ||
      !Number.isFinite(completed) ||
      current < 0 ||
      current > 150 ||
      target < 0 ||
      target > 100 ||
      completed < 0 ||
      completed >= 100
    ) {
      setError(
        "Enter a current grade, target grade, and completed weight within the allowed ranges.",
      );
      setResult(null);
      return;
    }

    const calculated = calculateRequiredRemainingGrade(
      current,
      target,
      completed,
    );

    if (!calculated) {
      setError("Unable to calculate your required grade.");
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
          Final Grade Planner
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Find out what average you need on your remaining coursework.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="planner-current-grade"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Current Grade (%)
          </label>
          <input
            id="planner-current-grade"
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
            htmlFor="planner-target-grade"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Target Grade (%)
          </label>
          <input
            id="planner-target-grade"
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
            htmlFor="planner-completed-weight"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Completed Weight (%)
          </label>
          <input
            id="planner-completed-weight"
            type="number"
            min="0"
            max="99.99"
            step="0.01"
            value={completedWeight}
            onChange={(event) =>
              handleInputChange(setCompletedWeight, event.target.value)
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
        Calculate Required Grade
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
              <p className="text-lg font-semibold text-foreground">
                Your target is already secured.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Even a 0% on the remaining coursework would leave your
                final grade at or above your target.
              </p>
              <p className="mt-3 text-3xl font-bold text-foreground">
                0% required
              </p>
            </>
          ) : result.achievable ? (
            <>
              <p className="text-sm text-muted-foreground">
                Required average on remaining coursework
              </p>
              <p className="mt-2 text-4xl font-bold text-foreground">
                {result.requiredGrade.toFixed(2)}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                You need this average across the remaining{" "}
                {100 - Number(completedWeight)}% of your course.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-destructive">
                Your target is not achievable.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Even with 100% on all remaining coursework, your
                maximum final grade would be:
              </p>
              <p className="mt-3 text-3xl font-bold text-foreground">
                {result.maximumFinalGrade.toFixed(2)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}