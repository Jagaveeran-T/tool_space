"use client";

import type { WeightedGradeResult } from "@/lib/calculators/grade-calculator";

type GradeResultProps = {
  result: WeightedGradeResult | null;
};

export default function GradeResult({ result }: GradeResultProps) {
  if (!result) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center">
        <p className="font-medium text-foreground">
          Your grade will appear here
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter valid assignment grades and weights to calculate your result.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border bg-card p-5"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-sm text-muted-foreground">
        Current Weighted Grade
      </p>

      <div className="mt-2 flex flex-wrap items-end gap-3">
        <span className="text-4xl font-bold tabular-nums text-foreground">
          {result.percentage.toFixed(2)}%
        </span>

        <span className="rounded-md bg-primary/10 px-3 py-1 text-lg font-semibold text-primary">
          {result.letterGrade}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">
            GPA Equivalent
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
            {result.gpa.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Completed Weight
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
            {result.completedWeight.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Remaining Weight
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
            {result.remainingWeight.toFixed(2)}%
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        GPA equivalent is based on the grading scale selected above.
        Your institution may use a different GPA conversion policy.
      </p>
    </div>
  );
}