"use client";

import NumberField from "@/components/common/NumberField";
import {
  PLUS_MINUS_SCALE,
  STANDARD_US_SCALE,
  validateGradeScale,
  withDerivedMax,
  type GradeScaleItem,
} from "@/lib/calculators/grade-calculator";

type GradeScaleSettingsProps = {
  scale: GradeScaleItem[];
  onChange: (scale: GradeScaleItem[]) => void;
};

type PresetType = "plus-minus" | "standard" | "custom";

function isSameScale(
  current: GradeScaleItem[],
  preset: GradeScaleItem[],
): boolean {
  if (current.length !== preset.length) {
    return false;
  }

  return current.every((item, index) => {
    const presetItem = preset[index];

    return (
      item.letter === presetItem.letter &&
      item.min === presetItem.min &&
      item.max === presetItem.max &&
      item.gpa === presetItem.gpa
    );
  });
}

export default function GradeScaleSettings({
  scale,
  onChange,
}: GradeScaleSettingsProps) {
  const validationError = validateGradeScale(scale);

  const selectedPreset: PresetType = isSameScale(
    scale,
    PLUS_MINUS_SCALE,
  )
    ? "plus-minus"
    : isSameScale(scale, STANDARD_US_SCALE)
      ? "standard"
      : "custom";

  // People only edit minimum percentages. Each maximum is derived from
  // the next higher minimum, so ranges can never overlap or leave gaps.
  const updateItem = (
    index: number,
    updates: Partial<Pick<GradeScaleItem, "letter" | "min" | "gpa">>,
  ) => {
    const updated = scale.map((item, itemIndex) =>
      itemIndex === index ? { ...item, ...updates } : item,
    );

    onChange(withDerivedMax(updated));
  };

  const selectPreset = (value: string) => {
    if (value === "standard") {
      onChange(STANDARD_US_SCALE.map((item) => ({ ...item })));
    } else if (value === "plus-minus") {
      onChange(PLUS_MINUS_SCALE.map((item) => ({ ...item })));
    }
  };

  const addGrade = () => {
    onChange(
      withDerivedMax([
        ...scale,
        {
          letter: "",
          min: 0,
          max: 0,
          gpa: 0,
        },
      ]),
    );
  };

  const removeGrade = (index: number) => {
    onChange(
      withDerivedMax(
        scale.filter((_, itemIndex) => itemIndex !== index),
      ),
    );
  };

  const inputClassName =
    "w-full rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Grading Scale
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a preset or customize the grades. Enter the lowest
          percentage for each grade and the maximum is filled in
          automatically.
        </p>
      </div>

      <div className="max-w-sm">
        <label
          htmlFor="grading-scale-preset"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Grading Scale Preset
        </label>

        <select
          id="grading-scale-preset"
          value={selectedPreset}
          onChange={(event) => selectPreset(event.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="plus-minus">US Plus/Minus Scale</option>
          <option value="standard">Standard US Scale</option>
          <option value="custom" disabled>
            Custom / Current Scale
          </option>
        </select>
      </div>

      {/* A compact table that fits a phone without sideways scrolling. The
          automatic maximum is shown from the md breakpoint up; on phones it
          appears as a short hint under each minimum. */}
      <table className="w-full table-fixed border-collapse text-sm">
        <caption className="sr-only">
          Grading scale: letter grade, minimum percentage, maximum
          percentage and GPA value
        </caption>

        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th scope="col" className="w-20 p-1.5 font-medium md:w-28 md:p-2">
              Letter
            </th>
            <th scope="col" className="p-1.5 font-medium md:p-2">
              Minimum %
            </th>
            <th
              scope="col"
              className="hidden p-2 font-medium md:table-cell"
            >
              Maximum % (automatic)
            </th>
            <th scope="col" className="p-1.5 font-medium md:p-2">
              GPA
            </th>
            <th scope="col" className="w-12 p-1.5 md:w-28 md:p-2">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {scale.map((item, index) => (
            <tr key={index} className="border-b border-border align-top">
              <td className="p-1.5 md:p-2">
                <input
                  id={`grade-letter-${index}`}
                  aria-label={`Letter grade ${index + 1}`}
                  type="text"
                  value={item.letter}
                  onChange={(event) =>
                    updateItem(index, {
                      letter: event.target.value.toUpperCase(),
                    })
                  }
                  className={inputClassName}
                />
              </td>

              <td className="p-1.5 md:p-2">
                <NumberField
                  id={`grade-min-${index}`}
                  aria-label={`Minimum percentage ${index + 1}`}
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.min}
                  onValueChange={(min) => updateItem(index, { min })}
                  className={inputClassName}
                />
                <span className="mt-1 block text-xs text-muted-foreground md:hidden">
                  up to {item.max}
                </span>
              </td>

              <td className="hidden p-2 md:table-cell">
                <p className="rounded-md bg-muted/50 px-2 py-1.5 tabular-nums text-muted-foreground">
                  <span className="sr-only">
                    Maximum percentage {index + 1}:{" "}
                  </span>
                  {item.max}
                </p>
              </td>

              <td className="p-1.5 md:p-2">
                <NumberField
                  id={`grade-gpa-${index}`}
                  aria-label={`GPA value ${index + 1}`}
                  inputMode="decimal"
                  min="0"
                  max="5"
                  step="0.1"
                  value={item.gpa}
                  onValueChange={(gpa) => updateItem(index, { gpa })}
                  className={inputClassName}
                />
              </td>

              <td className="p-1.5 md:p-2">
                <button
                  type="button"
                  onClick={() => removeGrade(index)}
                  aria-label={`Remove grade ${item.letter || index + 1}`}
                  title="Remove grade"
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span aria-hidden="true" className="md:hidden">
                    ×
                  </span>
                  <span aria-hidden="true" className="hidden md:inline">
                    Remove
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addGrade}
        className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        + Add Grade
      </button>

      {validationError ? (
        <p role="alert" className="text-sm text-destructive">
          {validationError}
        </p>
      ) : (
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          Grading scale is valid.
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Changes apply to the calculators on this page. They are not
        saved after the page is refreshed. GPA policies differ between
        schools, so check your institution&apos;s official scale.
      </p>
    </section>
  );
}
