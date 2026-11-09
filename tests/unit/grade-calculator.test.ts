import { describe, expect, it } from "vitest";

import {
  calculateGPA,
  calculateRequiredFinalExamGrade,
  calculateRequiredRemainingGrade,
  calculateWeightedGrade,
  getLetterGrade,
  PLUS_MINUS_SCALE,
  STANDARD_US_SCALE,
  validateGradeScale,
  withDerivedMax,
  type Assignment,
  type CourseGrade,
} from "@/lib/calculators/grade-calculator";

describe("Grade Calculator", () => {
  describe("getLetterGrade", () => {
    it("returns A for a grade of 95", () => {
      const result = getLetterGrade(95, STANDARD_US_SCALE);

      expect(result?.letter).toBe("A");
    });

    it("returns B for a grade of 85", () => {
      const result = getLetterGrade(85, STANDARD_US_SCALE);

      expect(result?.letter).toBe("B");
    });

    it("returns F for a grade below 60", () => {
      const result = getLetterGrade(50, STANDARD_US_SCALE);

      expect(result?.letter).toBe("F");
    });

    it("returns undefined for an empty scale", () => {
      expect(getLetterGrade(90, [])).toBeUndefined();
    });

    it("supports plus and minus grades", () => {
      const result = getLetterGrade(88, PLUS_MINUS_SCALE);

      expect(result?.letter).toBe("B+");
    });
  });

  describe("calculateWeightedGrade", () => {
    it("calculates the weighted grade correctly", () => {
      const assignments: Assignment[] = [
        {
          id: "1",
          name: "Homework",
          category: "Homework",
          weight: 20,
          grade: 80,
          extraCredit: false,
        },
        {
          id: "2",
          name: "Midterm",
          category: "Exam",
          weight: 30,
          grade: 90,
          extraCredit: false,
        },
      ];

      const result = calculateWeightedGrade(
        assignments,
        STANDARD_US_SCALE,
      );

      expect(result?.percentage).toBe(86);
      expect(result?.completedWeight).toBe(50);
      expect(result?.remainingWeight).toBe(50);
      expect(result?.letterGrade).toBe("B");
    });

    it("supports extra credit", () => {
      const assignments: Assignment[] = [
        {
          id: "1",
          name: "Homework",
          category: "Homework",
          weight: 20,
          grade: 80,
          extraCredit: false,
        },
        {
          id: "2",
          name: "Midterm",
          category: "Exam",
          weight: 30,
          grade: 90,
          extraCredit: false,
        },
        {
          id: "3",
          name: "Bonus",
          category: "Other",
          weight: 5,
          grade: 100,
          extraCredit: true,
        },
      ];

      const result = calculateWeightedGrade(
        assignments,
        STANDARD_US_SCALE,
      );

      expect(result?.percentage).toBe(96);
    });

    it("returns null when regular weights exceed 100", () => {
      const assignments: Assignment[] = [
        {
          id: "1",
          name: "Homework",
          category: "Homework",
          weight: 60,
          grade: 80,
          extraCredit: false,
        },
        {
          id: "2",
          name: "Exam",
          category: "Exam",
          weight: 50,
          grade: 90,
          extraCredit: false,
        },
      ];

      expect(
        calculateWeightedGrade(assignments, STANDARD_US_SCALE),
      ).toBeNull();
    });

    it("returns null when an assignment grade is missing", () => {
      const assignments: Assignment[] = [
        {
          id: "1",
          name: "Homework",
          category: "Homework",
          weight: 20,
          grade: "",
          extraCredit: false,
        },
      ];

      expect(
        calculateWeightedGrade(assignments, STANDARD_US_SCALE),
      ).toBeNull();
    });

    it("returns null when a regular grade exceeds 100", () => {
      const assignments: Assignment[] = [
        {
          id: "1",
          name: "Homework",
          category: "Homework",
          weight: 20,
          grade: 120,
          extraCredit: false,
        },
      ];

      expect(
        calculateWeightedGrade(assignments, STANDARD_US_SCALE),
      ).toBeNull();
    });
  });

  describe("calculateRequiredRemainingGrade", () => {
    it("calculates the required remaining grade", () => {
      const result = calculateRequiredRemainingGrade(85, 88, 70);

      expect(result?.requiredGrade).toBe(95);
      expect(result?.achievable).toBe(true);
    });

    it("detects when a target is already secured", () => {
      const result = calculateRequiredRemainingGrade(100, 60, 80);

      expect(result?.alreadyAchieved).toBe(true);
      expect(result?.requiredGrade).toBeLessThan(0);
    });

    it("detects an unachievable target", () => {
      const result = calculateRequiredRemainingGrade(50, 90, 80);

      expect(result?.achievable).toBe(false);
      expect(result?.maximumFinalGrade).toBe(60);
    });

    it("returns null when completed weight is 100", () => {
      expect(
        calculateRequiredRemainingGrade(85, 90, 100),
      ).toBeNull();
    });
  });

  describe("calculateRequiredFinalExamGrade", () => {
    it("calculates the required final exam grade", () => {
      const result = calculateRequiredFinalExamGrade(85, 88, 30);

      expect(result?.requiredGrade).toBe(95);
      expect(result?.achievable).toBe(true);
    });

    it("returns null for an invalid exam weight", () => {
      expect(
        calculateRequiredFinalExamGrade(85, 90, 0),
      ).toBeNull();
    });
  });

  describe("calculateGPA", () => {
    it("calculates GPA using course credits", () => {
      const courses: CourseGrade[] = [
        {
          id: "1",
          courseName: "Mathematics",
          credits: 3,
          grade: "A",
        },
        {
          id: "2",
          courseName: "English",
          credits: 3,
          grade: "B",
        },
      ];

      const result = calculateGPA(courses, STANDARD_US_SCALE);

      expect(result).toBe(3.5);
    });

    it("calculates GPA with different course credits", () => {
      const courses: CourseGrade[] = [
        {
          id: "1",
          courseName: "Mathematics",
          credits: 4,
          grade: "A",
        },
        {
          id: "2",
          courseName: "English",
          credits: 2,
          grade: "B",
        },
      ];

      const result = calculateGPA(courses, STANDARD_US_SCALE);

      expect(result).toBe(3.67);
    });

    it("returns null for an empty course list", () => {
      expect(calculateGPA([], STANDARD_US_SCALE)).toBeNull();
    });

    it("returns null for an invalid course", () => {
      const courses: CourseGrade[] = [
        {
          id: "1",
          courseName: "Mathematics",
          credits: 0,
          grade: "A",
        },
      ];

      expect(
        calculateGPA(courses, STANDARD_US_SCALE),
      ).toBeNull();
    });
  });

  describe("validateGradeScale", () => {
    it("accepts the standard US scale", () => {
      expect(validateGradeScale(STANDARD_US_SCALE)).toBeNull();
    });

    it("accepts the plus/minus scale", () => {
      expect(validateGradeScale(PLUS_MINUS_SCALE)).toBeNull();
    });

    it("rejects an empty scale", () => {
      expect(validateGradeScale([])).not.toBeNull();
    });

    it("rejects duplicate letter grades", () => {
      const invalidScale = [
        ...STANDARD_US_SCALE,
        {
          letter: "A",
          min: 0,
          max: 10,
          gpa: 0,
        },
      ];

      expect(validateGradeScale(invalidScale)).not.toBeNull();
    });

    it("rejects an invalid GPA value", () => {
      const invalidScale = STANDARD_US_SCALE.map((item) => ({
        ...item,
      }));

      invalidScale[0].gpa = 6;

      expect(validateGradeScale(invalidScale)).not.toBeNull();
    });
  });
});

describe("Grade Calculator regressions", () => {
  const assignment = (
    id: string,
    weight: number,
    grade: number,
    extraCredit = false,
  ): Assignment => ({
    id,
    name: id,
    category: "Other",
    weight,
    grade,
    extraCredit,
  });

  describe("extra credit with partially completed coursework", () => {
    it("counts extra credit as course points over the completed weight", () => {
      // 90% on 50% of the course = 45 points, plus a 5% bonus at 100%.
      // (45 + 5) / 50 = 100%.
      const result = calculateWeightedGrade(
        [assignment("a", 50, 90), assignment("bonus", 5, 100, true)],
        PLUS_MINUS_SCALE,
      );

      expect(result?.percentage).toBe(100);
    });

    it("adds extra credit points one-for-one when all coursework is complete", () => {
      const result = calculateWeightedGrade(
        [assignment("a", 100, 85), assignment("bonus", 5, 100, true)],
        PLUS_MINUS_SCALE,
      );

      expect(result?.percentage).toBe(90);
    });

    it("is consistent with the final grade planner", () => {
      const result = calculateWeightedGrade(
        [assignment("a", 50, 90), assignment("bonus", 5, 100, true)],
        PLUS_MINUS_SCALE,
      );

      // Points already earned = current grade x completed weight.
      const pointsEarned =
        ((result?.percentage ?? 0) * (result?.completedWeight ?? 0)) / 100;

      expect(pointsEarned).toBeCloseTo(50, 5);
    });
  });

  describe("rounding", () => {
    it("rounds to two decimals before choosing the letter grade", () => {
      const justBelowD = calculateWeightedGrade(
        [assignment("a", 100, 59.996)],
        PLUS_MINUS_SCALE,
      );

      expect(justBelowD?.percentage).toBe(60);
      expect(justBelowD?.letterGrade).toBe("D-");

      const justBelowA = calculateWeightedGrade(
        [assignment("a", 100, 89.994)],
        PLUS_MINUS_SCALE,
      );

      expect(justBelowA?.percentage).toBe(89.99);
      expect(justBelowA?.letterGrade).toBe("B+");
    });

    it("decides achievability from the rounded required grade", () => {
      // Required = 180 - 79.996 = 100.004, which is displayed as 100.00.
      const reachable = calculateRequiredRemainingGrade(79.996, 90, 50);

      expect(reachable?.requiredGrade).toBe(100);
      expect(reachable?.achievable).toBe(true);

      // Required = 100.01 is genuinely out of reach.
      const unreachable = calculateRequiredRemainingGrade(79.99, 90, 50);

      expect(unreachable?.requiredGrade).toBe(100.01);
      expect(unreachable?.achievable).toBe(false);
    });
  });

  describe("withDerivedMax", () => {
    const stripMax = (scale: typeof STANDARD_US_SCALE) =>
      scale.map((item) => ({ ...item, max: 0 }));

    it("rebuilds the standard scale ranges from the minimums", () => {
      expect(withDerivedMax(stripMax(STANDARD_US_SCALE))).toEqual(
        STANDARD_US_SCALE,
      );
    });

    it("rebuilds the plus/minus scale ranges from the minimums", () => {
      expect(withDerivedMax(stripMax(PLUS_MINUS_SCALE))).toEqual(
        PLUS_MINUS_SCALE,
      );
    });

    it("supports half-point cut-offs without gaps", () => {
      const scale = withDerivedMax([
        { letter: "A", min: 89.5, max: 0, gpa: 4 },
        { letter: "B", min: 0, max: 0, gpa: 3 },
      ]);

      expect(scale[0].max).toBe(100);
      expect(scale[1].max).toBe(89.49);
      expect(validateGradeScale(scale)).toBeNull();
    });

    it("keeps the row order the user typed", () => {
      const scale = withDerivedMax([
        { letter: "F", min: 0, max: 0, gpa: 0 },
        { letter: "A", min: 90, max: 0, gpa: 4 },
        { letter: "B", min: 80, max: 0, gpa: 3 },
      ]);

      expect(scale.map((item) => item.letter)).toEqual(["F", "A", "B"]);
      expect(scale.map((item) => item.max)).toEqual([79.99, 100, 89.99]);
    });

    it("rejects two grades with the same minimum", () => {
      const scale = withDerivedMax([
        { letter: "A", min: 90, max: 0, gpa: 4 },
        { letter: "B", min: 90, max: 0, gpa: 3 },
        { letter: "F", min: 0, max: 0, gpa: 0 },
      ]);

      expect(validateGradeScale(scale)).toBe(
        "Each grade needs a different minimum percentage.",
      );
    });

    it("requires the lowest grade to start at 0%", () => {
      const scale = withDerivedMax([
        { letter: "A", min: 90, max: 0, gpa: 4 },
        { letter: "B", min: 10, max: 0, gpa: 3 },
      ]);

      expect(validateGradeScale(scale)).toBe(
        "The grading scale must start at 0%.",
      );
    });
  });
});
