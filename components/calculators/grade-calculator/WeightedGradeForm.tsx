"use client";

import { useMemo, useState } from "react";

import {
  calculateWeightedGrade,
  type Assignment,
  type GradeScaleItem,
} from "@/lib/calculators/grade-calculator";

import GradeRow from "./GradeRow";
import GradeResult from "./GradeResult";

type WeightedGradeFormProps = {
  scale: GradeScaleItem[];
  scaleError: string | null;
};

function createEmptyAssignment(id: string): Assignment {
  return {
    id,
    name: "",
    category: "Homework",
    weight: 0,
    grade: "",
    extraCredit: false,
  };
}

function createInitialAssignments(): Assignment[] {
  return [
    createEmptyAssignment("initial-assignment-1"),
    createEmptyAssignment("initial-assignment-2"),
    createEmptyAssignment("initial-assignment-3"),
  ];
}

export default function WeightedGradeForm({
  scale,
  scaleError,
}: WeightedGradeFormProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(
    createInitialAssignments,
  );

  // Validation messages stay hidden until the person has changed something,
  // so an untouched form does not open with a red error.
  const [touched, setTouched] = useState(false);

  const regularAssignments = assignments.filter(
    (assignment) => !assignment.extraCredit && assignment.weight > 0,
  );

  const totalWeight = regularAssignments.reduce(
    (total, assignment) => total + assignment.weight,
    0,
  );

  const validationError = useMemo(() => {
    if (scaleError) {
      return "Please correct your grading scale first.";
    }

    if (regularAssignments.length === 0) {
      return "Add at least one regular assignment with a weight.";
    }

    for (const assignment of assignments) {
      if (
        !Number.isFinite(assignment.weight) ||
        assignment.weight < 0 ||
        assignment.weight > 100
      ) {
        return "Assignment weights must be between 0 and 100.";
      }

      if (assignment.weight === 0) {
        continue;
      }

      if (assignment.grade === "") {
        return "Enter a grade for every assignment with a weight.";
      }

      const grade = Number(assignment.grade);

      if (!Number.isFinite(grade)) {
        return "Enter a valid numeric grade for every assignment.";
      }

      if (!assignment.extraCredit && (grade < 0 || grade > 100)) {
        return "Regular assignment grades must be between 0 and 100.";
      }

      if (assignment.extraCredit && (grade < 0 || grade > 150)) {
        return "Extra-credit grades must be between 0 and 150.";
      }
    }

    if (totalWeight > 100) {
      return "Regular assignment weights cannot exceed 100%.";
    }

    return null;
  }, [assignments, regularAssignments.length, scaleError, totalWeight]);

  const result = useMemo(() => {
    if (validationError) {
      return null;
    }

    return calculateWeightedGrade(assignments, scale);
  }, [assignments, scale, validationError]);

  const updateAssignment = (
    id: string,
    updates: Partial<Assignment>,
  ) => {
    setTouched(true);
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id
          ? { ...assignment, ...updates }
          : assignment,
      ),
    );
  };

  const addAssignment = () => {
    setTouched(true);
    setAssignments((current) => [
      ...current,
      createEmptyAssignment(crypto.randomUUID()),
    ]);
  };

  const removeAssignment = (id: string) => {
    setTouched(true);
    setAssignments((current) =>
      current.filter((assignment) => assignment.id !== id),
    );
  };

  const reset = () => {
    setTouched(false);
    setAssignments(createInitialAssignments());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Weighted Grade Calculator
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your assignment grades and their course weights.
          Your results update automatically as you make changes.
        </p>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <GradeRow
            key={assignment.id}
            assignment={assignment}
            onChange={updateAssignment}
            onRemove={removeAssignment}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addAssignment}
          className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          + Add Assignment
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Reset
        </button>
      </div>

      <p
        className="text-sm text-muted-foreground"
        aria-live="polite"
        aria-atomic="true"
      >
        Regular assignment weight: {totalWeight.toFixed(2)}% / 100%
      </p>

      {touched && validationError && (
        <p
          role="alert"
          className="text-sm text-destructive"
        >
          {validationError}
        </p>
      )}

      <GradeResult result={result} />

      <p className="text-xs text-muted-foreground">
        Extra credit counts as additional course points (weight × grade).
        It is divided by the completed weight like your other grades and
        does not increase the regular course-weight total.
      </p>
    </div>
  );
}