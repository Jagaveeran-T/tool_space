
export type GradeScaleItem = {
  letter: string;
  min: number;
  max: number;
  gpa: number;
};

export type Assignment = {
  id: string;
  name: string;
  category: string;
  weight: number;
  grade: number | "";
  extraCredit: boolean;
};

export type CourseGrade = {
  id: string;
  courseName: string;
  credits: number;
  grade: string;
};

export type WeightedGradeResult = {
  percentage: number;
  completedWeight: number;
  remainingWeight: number;
  letterGrade: string;
  gpa: number;
};

export type RequiredGradeResult = {
  requiredGrade: number;
  achievable: boolean;
  alreadyAchieved: boolean;
  maximumFinalGrade: number;
};

export const STANDARD_US_SCALE: GradeScaleItem[] = [
  { letter: "A", min: 90, max: 100, gpa: 4.0 },
  { letter: "B", min: 80, max: 89.99, gpa: 3.0 },
  { letter: "C", min: 70, max: 79.99, gpa: 2.0 },
  { letter: "D", min: 60, max: 69.99, gpa: 1.0 },
  { letter: "F", min: 0, max: 59.99, gpa: 0.0 },
];

export const PLUS_MINUS_SCALE: GradeScaleItem[] = [
  { letter: "A+", min: 97, max: 100, gpa: 4.0 },
  { letter: "A", min: 93, max: 96.99, gpa: 4.0 },
  { letter: "A-", min: 90, max: 92.99, gpa: 3.7 },
  { letter: "B+", min: 87, max: 89.99, gpa: 3.3 },
  { letter: "B", min: 83, max: 86.99, gpa: 3.0 },
  { letter: "B-", min: 80, max: 82.99, gpa: 2.7 },
  { letter: "C+", min: 77, max: 79.99, gpa: 2.3 },
  { letter: "C", min: 73, max: 76.99, gpa: 2.0 },
  { letter: "C-", min: 70, max: 72.99, gpa: 1.7 },
  { letter: "D+", min: 67, max: 69.99, gpa: 1.3 },
  { letter: "D", min: 63, max: 66.99, gpa: 1.0 },
  { letter: "D-", min: 60, max: 62.99, gpa: 0.7 },
  { letter: "F", min: 0, max: 59.99, gpa: 0.0 },
];

export function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getLetterGrade(
  percentage: number,
  scale: GradeScaleItem[],
): GradeScaleItem | undefined {
  if (!Number.isFinite(percentage) || scale.length === 0) {
    return undefined;
  }

  const sortedScale = [...scale].sort((a, b) => b.min - a.min);

  return sortedScale.find((item) => percentage >= item.min);
}

export function convertGradeToPercentage(
  grade: number | "",
): number | null {
  if (grade === "" || !Number.isFinite(grade)) {
    return null;
  }

  if (grade < 0 || grade > 150) {
    return null;
  }

  return grade;
}

export function calculateWeightedGrade(
  assignments: Assignment[],
  scale: GradeScaleItem[],
): WeightedGradeResult | null {
  if (
    assignments.length === 0 ||
    validateGradeScale(scale) !== null
  ) {
    return null;
  }

  const invalidWeight = assignments.some(
    (assignment) =>
      !Number.isFinite(assignment.weight) ||
      assignment.weight < 0 ||
      assignment.weight > 100,
  );

  if (invalidWeight) {
    return null;
  }

  const regularAssignments = assignments.filter(
    (assignment) => !assignment.extraCredit && assignment.weight > 0,
  );

  const extraCreditAssignments = assignments.filter(
    (assignment) => assignment.extraCredit && assignment.weight > 0,
  );

  if (regularAssignments.length === 0) {
    return null;
  }

  const invalidRegularAssignment = regularAssignments.some(
    (assignment) =>
      assignment.grade === "" ||
      !Number.isFinite(assignment.grade) ||
      assignment.grade < 0 ||
      assignment.grade > 100,
  );

  const invalidExtraCreditAssignment = extraCreditAssignments.some(
    (assignment) =>
      assignment.grade === "" ||
      !Number.isFinite(assignment.grade) ||
      assignment.grade < 0 ||
      assignment.grade > 150,
  );

  if (invalidRegularAssignment || invalidExtraCreditAssignment) {
    return null;
  }

  const completedWeight = regularAssignments.reduce(
    (total, assignment) => total + assignment.weight,
    0,
  );

  if (completedWeight <= 0 || completedWeight > 100) {
    return null;
  }

  const regularPoints = regularAssignments.reduce(
    (total, assignment) =>
      total + Number(assignment.grade) * assignment.weight,
    0,
  );

  const extraCreditPoints = extraCreditAssignments.reduce(
    (total, assignment) =>
      total + Number(assignment.grade) * assignment.weight,
    0,
  );

  const regularPercentage = regularPoints / completedWeight;

  // Extra-credit weight is additional course points (weight x grade).
  // Like regular points, it is divided by the completed weight, so the
  // result is the average over the coursework finished so far. This keeps
  // it consistent with the planner formulas, which multiply the current
  // grade by the completed weight to get the points already earned.
  const extraCreditPercentage = extraCreditPoints / completedWeight;

  const percentage = roundToTwo(
    regularPercentage + extraCreditPercentage,
  );

  if (!Number.isFinite(percentage)) {
    return null;
  }

  const gradeItem = getLetterGrade(percentage, scale);

  if (!gradeItem) {
    return null;
  }

  return {
    percentage,
    completedWeight: roundToTwo(completedWeight),
    remainingWeight: roundToTwo(100 - completedWeight),
    letterGrade: gradeItem.letter,
    gpa: gradeItem.gpa,
  };
}

export function calculateRequiredRemainingGrade(
  currentGrade: number,
  targetGrade: number,
  completedWeight: number,
): RequiredGradeResult | null {
  if (
    !Number.isFinite(currentGrade) ||
    !Number.isFinite(targetGrade) ||
    !Number.isFinite(completedWeight) ||
    currentGrade < 0 ||
    currentGrade > 150 ||
    targetGrade < 0 ||
    targetGrade > 100 ||
    completedWeight < 0 ||
    completedWeight >= 100
  ) {
    return null;
  }

  const remainingWeight = 100 - completedWeight;

  const requiredGrade =
    (targetGrade - currentGrade * (completedWeight / 100)) /
    (remainingWeight / 100);

  const maximumFinalGrade =
    currentGrade * (completedWeight / 100) +
    100 * (remainingWeight / 100);

  // Decide achievability from the same rounded value that is displayed,
  // so a result shown as "100.00%" is never reported as not achievable.
  const roundedRequiredGrade = roundToTwo(requiredGrade);

  return {
    requiredGrade: roundedRequiredGrade,
    achievable: roundedRequiredGrade <= 100,
    alreadyAchieved: roundedRequiredGrade <= 0,
    maximumFinalGrade: roundToTwo(maximumFinalGrade),
  };
}

export function calculateRequiredFinalExamGrade(
  currentGrade: number,
  targetGrade: number,
  examWeight: number,
): RequiredGradeResult | null {
  if (
    !Number.isFinite(examWeight) ||
    examWeight <= 0 ||
    examWeight > 100
  ) {
    return null;
  }

  return calculateRequiredRemainingGrade(
    currentGrade,
    targetGrade,
    100 - examWeight,
  );
}

export function calculateGPA(
  courses: CourseGrade[],
  scale: GradeScaleItem[],
): number | null {
  if (
    courses.length === 0 ||
    validateGradeScale(scale) !== null
  ) {
    return null;
  }

  const validCourses = courses.filter(
    (course) => course.courseName.trim() !== "",
  );

  if (validCourses.length === 0) {
    return null;
  }

  const invalidCourse = validCourses.some(
    (course) =>
      !Number.isFinite(course.credits) ||
      course.credits <= 0 ||
      !scale.some((item) => item.letter === course.grade),
  );

  if (invalidCourse) {
    return null;
  }

  const totalCredits = validCourses.reduce(
    (total, course) => total + course.credits,
    0,
  );

  const totalGradePoints = validCourses.reduce((total, course) => {
    const gradeItem = scale.find(
      (item) => item.letter === course.grade,
    );

    return total + (gradeItem?.gpa ?? 0) * course.credits;
  }, 0);

  if (totalCredits <= 0 || !Number.isFinite(totalGradePoints)) {
    return null;
  }

  return roundToTwo(totalGradePoints / totalCredits);
}

/**
 * Fills in each grade's maximum from the minimums.
 *
 * A grade covers its own minimum up to 0.01 below the next higher minimum,
 * and the highest grade runs up to 100. Users only edit minimums, so the
 * ranges can never overlap or leave gaps. Row order is preserved.
 */
export function withDerivedMax(
  scale: GradeScaleItem[],
): GradeScaleItem[] {
  return scale.map((item) => {
    const higherMinimums = scale
      .map((other) => other.min)
      .filter(
        (minimum) =>
          Number.isFinite(minimum) && minimum > item.min,
      );

    const max =
      higherMinimums.length > 0
        ? roundToTwo(Math.min(...higherMinimums) - 0.01)
        : 100;

    return { ...item, max };
  });
}

export function validateGradeScale(
  scale: GradeScaleItem[],
): string | null {
  if (scale.length === 0) {
    return "Add at least one grade range.";
  }

  const sortedScale = [...scale].sort((a, b) => a.min - b.min);

  if (sortedScale.some((item) => item.letter.trim() === "")) {
    return "Every grade range must have a letter grade.";
  }

  if (
    sortedScale.some(
      (item) =>
        !Number.isFinite(item.min) ||
        !Number.isFinite(item.max) ||
        !Number.isFinite(item.gpa) ||
        item.min < 0 ||
        item.max > 100 ||
        item.min > item.max ||
        item.gpa < 0 ||
        item.gpa > 5,
    )
  ) {
    return "Enter valid grade ranges and GPA values.";
  }

  const hasMoreThanTwoDecimals = sortedScale.some(
    (item) =>
      Math.abs(item.min * 100 - Math.round(item.min * 100)) > 0.000001 ||
      Math.abs(item.max * 100 - Math.round(item.max * 100)) > 0.000001,
  );

  if (hasMoreThanTwoDecimals) {
    return "Grade percentages can have a maximum of two decimal places.";
  }

  const minimums = sortedScale.map((item) =>
    Math.round(item.min * 100),
  );

  if (new Set(minimums).size !== minimums.length) {
    return "Each grade needs a different minimum percentage.";
  }

  const firstMin = Math.round(sortedScale[0].min * 100);
  const lastMax = Math.round(
    sortedScale[sortedScale.length - 1].max * 100,
  );

  if (firstMin !== 0) {
    return "The grading scale must start at 0%.";
  }

  if (lastMax !== 10000) {
    return "The grading scale must end at 100%.";
  }

  for (let index = 1; index < sortedScale.length; index += 1) {
    const previousMax = Math.round(sortedScale[index - 1].max * 100);
    const currentMin = Math.round(sortedScale[index].min * 100);

    if (currentMin !== previousMax + 1) {
      return "Grade ranges must not overlap or have gaps. For example, use 80–89.99 and 90–100.";
    }
  }

  const letters = sortedScale.map(
    (item) => item.letter.trim().toUpperCase(),
  );

  if (new Set(letters).size !== letters.length) {
    return "Each letter grade must be unique.";
  }

  return null;
}
