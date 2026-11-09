"use client";

import NumberField from "@/components/common/NumberField";
import type { Assignment } from "@/lib/calculators/grade-calculator";

type GradeRowProps = {
  assignment: Assignment;
  onChange: (id: string, updates: Partial<Assignment>) => void;
  onRemove: (id: string) => void;
};

export default function GradeRow({
  assignment,
  onChange,
  onRemove,
}: GradeRowProps) {
  const nameId = `assignment-name-${assignment.id}`;
  const categoryId = `assignment-category-${assignment.id}`;
  const weightId = `assignment-weight-${assignment.id}`;
  const gradeId = `assignment-grade-${assignment.id}`;
  const extraCreditId = `assignment-extra-credit-${assignment.id}`;

  const inputClassName =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const labelClassName =
    "mb-1 block text-sm font-medium text-foreground";

  // Layout: one column on phones, two columns on tablets, and a single
  // 12-column row only from the `lg` breakpoint, where every field has
  // enough room.
  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
      <div className="sm:col-span-2 lg:col-span-3">
        <label htmlFor={nameId} className={labelClassName}>
          Assignment Name
        </label>
        <input
          id={nameId}
          type="text"
          value={assignment.name}
          onChange={(event) =>
            onChange(assignment.id, { name: event.target.value })
          }
          placeholder="Homework"
          className={inputClassName}
        />
      </div>

      <div className="lg:col-span-2">
        <label htmlFor={categoryId} className={labelClassName}>
          Category
        </label>
        <select
          id={categoryId}
          value={assignment.category}
          onChange={(event) =>
            onChange(assignment.id, { category: event.target.value })
          }
          className={inputClassName}
        >
          <option value="Homework">Homework</option>
          <option value="Quiz">Quiz</option>
          <option value="Exam">Exam</option>
          <option value="Project">Project</option>
          <option value="Participation">Participation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="lg:col-span-2">
        <label htmlFor={gradeId} className={labelClassName}>
          Grade (%)
        </label>
        <input
          id={gradeId}
          type="number"
          inputMode="decimal"
          min="0"
          max={assignment.extraCredit ? 150 : 100}
          step="0.01"
          value={assignment.grade}
          onChange={(event) =>
            onChange(assignment.id, {
              grade:
                event.target.value === "" ? "" : Number(event.target.value),
            })
          }
          placeholder="90"
          className={inputClassName}
        />
      </div>

      <div className="lg:col-span-2">
        <label htmlFor={weightId} className={labelClassName}>
          Weight (%)
        </label>
        <NumberField
          id={weightId}
          inputMode="decimal"
          min="0"
          max="100"
          step="0.01"
          value={assignment.weight}
          valueWhenEmpty={0}
          onValueChange={(weight) =>
            onChange(assignment.id, { weight })
          }
          className={inputClassName}
        />
      </div>

      <div className="flex items-center justify-between gap-3 lg:col-span-3 lg:pb-2">
        <label
          htmlFor={extraCreditId}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground"
        >
          <input
            id={extraCreditId}
            type="checkbox"
            checked={assignment.extraCredit}
            onChange={(event) =>
              onChange(assignment.id, {
                extraCredit: event.target.checked,
              })
            }
            className="size-4 rounded border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          Extra credit
        </label>

        <button
          type="button"
          onClick={() => onRemove(assignment.id)}
          aria-label={`Remove ${assignment.name || "assignment"}`}
          title="Remove assignment"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="lg:hidden">Remove</span>
          <span aria-hidden="true" className="hidden lg:inline">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
