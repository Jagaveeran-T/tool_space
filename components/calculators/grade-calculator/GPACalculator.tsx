"use client";

import { useState } from "react";

import {
  calculateGPA,
  type CourseGrade,
  type GradeScaleItem,
} from "@/lib/calculators/grade-calculator";

type GPACalculatorProps = {
  scale: GradeScaleItem[];
  scaleError: string | null;
};

type CourseFieldErrors = Record<string, string>;

type GPAResult = {
  gpa: number;
  maxGpa: number;
  coursesKey: string;
  scaleKey: string;
};

function createCourse(id: string): CourseGrade {
  return {
    id,
    courseName: "",
    credits: 0,
    grade: "",
  };
}

function createInitialCourses(): CourseGrade[] {
  return [
    createCourse("initial-gpa-course-1"),
    createCourse("initial-gpa-course-2"),
    createCourse("initial-gpa-course-3"),
  ];
}

export default function GPACalculator({
  scale,
  scaleError,
}: GPACalculatorProps) {
  const [courses, setCourses] = useState<CourseGrade[]>(
    createInitialCourses,
  );

  const [errors, setErrors] = useState<CourseFieldErrors>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<GPAResult | null>(null);

  const coursesKey = JSON.stringify(
    courses.map(({ courseName, credits, grade }) => ({
      courseName,
      credits,
      grade,
    })),
  );

  const scaleKey = JSON.stringify(scale);

  const updateCourse = (
    id: string,
    updates: Partial<CourseGrade>,
  ) => {
    setCourses((current) =>
      current.map((course) =>
        course.id === id ? { ...course, ...updates } : course,
      ),
    );

    setErrors((current) => {
      const updated = { ...current };

      Object.keys(updates).forEach((key) => {
        const field =
          key === "courseName"
            ? "name"
            : key === "credits"
              ? "credits"
              : key === "grade"
                ? "grade"
                : key;

        delete updated[`${id}-${field}`];
      });

      return updated;
    });

    setError("");
  };

  const addCourse = () => {
    setCourses((current) => [
      ...current,
      createCourse(crypto.randomUUID()),
    ]);

    setErrors({});
    setError("");
  };

  const removeCourse = (id: string) => {
    setCourses((current) =>
      current.filter((course) => course.id !== id),
    );

    setErrors((current) => {
      const updated = { ...current };

      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${id}-`)) {
          delete updated[key];
        }
      });

      return updated;
    });

    setError("");
  };

  const calculate = () => {
    if (scaleError) {
      setError("Please correct your grading scale first.");
      setErrors({});
      setResult(null);
      return;
    }

    const enteredCourses = courses.filter(
      (course) =>
        course.courseName.trim() !== "" ||
        course.credits !== 0 ||
        course.grade !== "",
    );

    if (enteredCourses.length === 0) {
      setErrors({});
      setResult(null);
      setError("Please enter at least one course.");
      return;
    }

    const newErrors: CourseFieldErrors = {};

    enteredCourses.forEach((course) => {
      if (!course.courseName.trim()) {
        newErrors[`${course.id}-name`] =
          "Course name is required.";
      }

      if (
        !Number.isFinite(course.credits) ||
        course.credits <= 0
      ) {
        newErrors[`${course.id}-credits`] =
          "Enter valid credits.";
      }

      if (
        !course.grade ||
        !scale.some((item) => item.letter === course.grade)
      ) {
        newErrors[`${course.id}-grade`] =
          "Please select a valid grade.";
      }
    });

    setErrors(newErrors);
    setError("");
    setResult(null);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const calculatedGPA = calculateGPA(enteredCourses, scale);

    if (
      calculatedGPA === null ||
      !Number.isFinite(calculatedGPA)
    ) {
      setError("Unable to calculate GPA. Check your course details.");
      return;
    }

    const maxGpa = Math.max(...scale.map((item) => item.gpa));

    setResult({
      gpa: calculatedGPA,
      maxGpa,
      coursesKey,
      scaleKey,
    });
  };

  const reset = () => {
    setCourses(createInitialCourses());
    setErrors({});
    setError("");
    setResult(null);
  };

  const showResult =
    result !== null &&
    result.coursesKey === coursesKey &&
    result.scaleKey === scaleKey &&
    !scaleError &&
    Object.keys(errors).length === 0;

  const inputClassName =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive";

  const buttonClassName =
    "rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          GPA Calculator
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Calculate your GPA using course names, credits, and letter grades.
        </p>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
          >
            <div className="sm:col-span-2 lg:col-span-5">
              <label
                htmlFor={`gpa-course-name-${course.id}`}
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Course Name *
              </label>

              <input
                id={`gpa-course-name-${course.id}`}
                type="text"
                value={course.courseName}
                onChange={(event) =>
                  updateCourse(course.id, {
                    courseName: event.target.value,
                  })
                }
                placeholder="Mathematics"
                aria-invalid={!!errors[`${course.id}-name`]}
                aria-describedby={
                  errors[`${course.id}-name`]
                    ? `gpa-course-name-error-${course.id}`
                    : undefined
                }
                className={`${inputClassName} ${
                  errors[`${course.id}-name`]
                    ? "border-destructive"
                    : ""
                }`}
              />

              {errors[`${course.id}-name`] && (
                <p
                  id={`gpa-course-name-error-${course.id}`}
                  className="mt-1 text-xs text-destructive"
                >
                  {errors[`${course.id}-name`]}
                </p>
              )}
            </div>

            <div className="lg:col-span-3">
              <label
                htmlFor={`gpa-course-credits-${course.id}`}
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Credits *
              </label>

              <input
                id={`gpa-course-credits-${course.id}`}
                type="number"
                min="0.01"
                step="0.5"
                value={course.credits === 0 ? "" : course.credits}
                onChange={(event) =>
                  updateCourse(course.id, {
                    credits:
                      event.target.value === ""
                        ? 0
                        : Number(event.target.value),
                  })
                }
                placeholder="3"
                aria-invalid={!!errors[`${course.id}-credits`]}
                aria-describedby={
                  errors[`${course.id}-credits`]
                    ? `gpa-course-credits-error-${course.id}`
                    : undefined
                }
                className={`${inputClassName} ${
                  errors[`${course.id}-credits`]
                    ? "border-destructive"
                    : ""
                }`}
              />

              {errors[`${course.id}-credits`] && (
                <p
                  id={`gpa-course-credits-error-${course.id}`}
                  className="mt-1 text-xs text-destructive"
                >
                  {errors[`${course.id}-credits`]}
                </p>
              )}
            </div>

            <div className="lg:col-span-3">
              <label
                htmlFor={`gpa-course-grade-${course.id}`}
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Letter Grade *
              </label>

              <select
                id={`gpa-course-grade-${course.id}`}
                value={course.grade}
                onChange={(event) =>
                  updateCourse(course.id, {
                    grade: event.target.value,
                  })
                }
                aria-invalid={!!errors[`${course.id}-grade`]}
                aria-describedby={
                  errors[`${course.id}-grade`]
                    ? `gpa-course-grade-error-${course.id}`
                    : undefined
                }
                className={`${inputClassName} ${
                  errors[`${course.id}-grade`]
                    ? "border-destructive"
                    : ""
                }`}
              >
                <option value="">Select grade</option>

                {scale.map((item) => (
                  <option key={item.letter} value={item.letter}>
                    {item.letter} ({item.gpa.toFixed(2)})
                  </option>
                ))}
              </select>

              {errors[`${course.id}-grade`] && (
                <p
                  id={`gpa-course-grade-error-${course.id}`}
                  className="mt-1 text-xs text-destructive"
                >
                  {errors[`${course.id}-grade`]}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="button"
                onClick={() => removeCourse(course.id)}
                aria-label={`Remove course ${index + 1}`}
                title="Remove course"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="lg:hidden">Remove course</span>
                <span aria-hidden="true" className="hidden lg:inline">
                  ×
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addCourse}
          className={buttonClassName}
        >
          + Add Course
        </button>

        <button
          type="button"
          onClick={calculate}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Calculate GPA
        </button>

        <button
          type="button"
          onClick={reset}
          className={buttonClassName}
        >
          Reset
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {showResult && result && (
        <div
          className="rounded-xl border border-border bg-card p-5"
          aria-live="polite"
        >
          <p className="text-sm text-muted-foreground">
            Your GPA
          </p>

          <p className="mt-2 text-4xl font-bold text-foreground">
            {result.gpa.toFixed(2)}
            <span className="ml-2 text-lg font-normal text-muted-foreground">
              / {result.maxGpa.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        GPA values depend on the grading scale selected below. Some
        colleges use different GPA policies, including different
        treatment of A+ grades and repeated courses.
      </p>
    </div>
  );
}