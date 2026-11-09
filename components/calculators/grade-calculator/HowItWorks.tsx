import Link from "next/link";

export default function HowItWorks() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          How the Grade Calculator Works
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Use this free grade calculator to calculate weighted grades,
          plan your final course grade, estimate the exam score you need,
          and calculate your GPA. Each calculator uses the information
          you enter to provide an academic grade estimate.
        </p>
      </div>

      <div className="space-y-7">
        <article>
          <h3 className="text-lg font-semibold text-foreground">
            1. Weighted Grade Calculator
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A weighted grade calculator determines your current course
            grade based on the percentage weight and score of each
            assignment. Assignments with higher weights have a greater
            effect on your overall result.
          </p>

          <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              Weighted Grade Formula
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Current Weighted Grade = Total Weighted Points / Total
              Completed Assignment Weight × 100
            </p>
          </div>

          <h4 className="mt-4 text-sm font-semibold text-foreground">
            Example
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suppose you score 80% on homework worth 30% and 90% on
            an exam worth 40%. Your weighted points are 24 and 36,
            respectively. Your current weighted grade is:
          </p>

          <div className="mt-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
            <p>Weighted Points = (80 × 0.30) + (90 × 0.40)</p>
            <p className="mt-1">Weighted Points = 24 + 36 = 60</p>
            <p className="mt-1 font-semibold">
              Current Grade = 60 / 70 × 100 = 85.71%
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            You can also add extra-credit assignments. Extra credit
            counts as additional course points (its weight × its
            grade). Like your other grades, those points are divided
            by the weight of the coursework you have completed, and
            they do not increase the regular course-weight total.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            For example, suppose you scored 90% on assignments worth 50%
            of the course and earned 100% on a bonus worth 5%. Your
            points are (90 × 0.50) + (100 × 0.05) = 50, out of 50
            completed, so your current grade is 50 / 50 × 100 = 100%.
            If all of your coursework were complete, the same bonus
            would add exactly 5 points to your final grade.
          </p>
        </article>

        <article>
          <h3 className="text-lg font-semibold text-foreground">
            2. Final Grade Planner
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The final grade planner calculates the average you need
            across all remaining coursework to reach your target
            course grade. It considers your current grade and the
            percentage of coursework already completed.
          </p>

          <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              Required Remaining Grade Formula
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Required Grade = (Target Grade − Current Grade ×
              Completed Weight) / Remaining Weight
            </p>
          </div>

          <h4 className="mt-4 text-sm font-semibold text-foreground">
            Example
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suppose your current grade is 82%, you have completed 50%
            of your coursework, and your target is 90%. You need an
            average of 98% across the remaining coursework to reach
            your target grade.
          </p>
        </article>

        <article>
          <h3 className="text-lg font-semibold text-foreground">
            3. Final Exam Calculator
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The final exam calculator determines the score you need
            on your final exam to achieve your desired overall course
            grade. Enter your current grade, target grade, and final
            exam weight.
          </p>

          <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              Final Exam Formula
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Required Exam Grade = (Target Grade − Current Grade ×
              (1 − Exam Weight)) / Exam Weight
            </p>
          </div>

          <h4 className="mt-4 text-sm font-semibold text-foreground">
            Example
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suppose your current grade is 85%, your target is 90%,
            and your final exam is worth 30% of the course grade.
            You need approximately 101.67% on the final exam to
            reach your target.
          </p>
        </article>

        <article>
          <h3 className="text-lg font-semibold text-foreground">
            4. GPA Calculator
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The GPA calculator estimates your Grade Point Average
            using the credits and letter grades of your courses.
            Courses with more credit hours have a greater influence
            on your overall GPA.
          </p>

          <div className="mt-3 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              GPA Formula
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              GPA = Sum of (Course Credits × Grade Points) / Total
              Course Credits
            </p>
          </div>

          <h4 className="mt-4 text-sm font-semibold text-foreground">
            Example
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Suppose you take two courses. Mathematics has 3 credits
            with a 4.0 grade point, while Science has 4 credits with
            a 3.0 grade point.
          </p>

          <div className="mt-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground">
            <p>Mathematics: 3 × 4.0 = 12</p>
            <p className="mt-1">Science: 4 × 3.0 = 12</p>
            <p className="mt-1">Total Grade Points = 24</p>
            <p className="mt-1 font-semibold">
              GPA = 24 / 7 = 3.43
            </p>
          </div>
        </article>
      </div>

      <article className="space-y-3">
        <h3 className="text-xl font-semibold text-foreground">
          Understanding the Grading Scale
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          Different schools and universities use different grading
          systems. Some use a standard letter-grade scale, while
          others include plus and minus grades such as A-, B+, and
          C-. The grading scale settings let you customize letter
          grades, minimum percentages, and GPA values for the Weighted
          Grade and GPA calculators.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          For each grade you enter the lowest percentage that earns it.
          The maximum is filled in automatically from the next grade
          up, so the ranges can never overlap or leave gaps. For
          example, if A starts at 89.5, then B automatically ends at
          89.49.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Percentages are rounded to two decimal places before the
          letter grade is chosen, and the rounded value is the one
          shown. A result of 89.996% is displayed as 90.00% and counts
          as 90%. If your school does not round up, check the exact
          percentage before relying on the letter grade.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Always check your institution&apos;s official grading
          policy before using calculated results for academic
          decisions.
        </p>
      </article>

      <article className="space-y-3">
        <h3 className="text-xl font-semibold text-foreground">
          Frequently Asked Questions
        </h3>

        <div>
          <h4 className="font-semibold text-foreground">
            Is this grade calculator free?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Yes. All four calculator features are free to use.
            You can also customize the grading scale used by
            the Weighted Grade and GPA calculators.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            Can I calculate my final grade without taking the exam?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Yes. Enter your current grade, target grade, and exam
            weight to estimate the score required on your final exam.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            How is weighted GPA different from a regular GPA?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            A regular GPA generally uses the grade points assigned
            to each course. A weighted GPA may include additional
            points for advanced courses, depending on the institution.
            This calculator estimates GPA using the grading scale
            and course grade points you provide.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            Can I use a custom grading scale?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Yes. You can edit letter grades, minimum percentages,
            and GPA values in the grading scale settings. The
            custom scale must pass validation before it can
            be used in the applicable calculators.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            Does the calculator save my grades?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Your calculator entries are handled in your browser
            and are not saved to a personal account by this tool.
            Refreshing the page resets the calculator inputs.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            How does the calculator round my grade?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Results are rounded to two decimal places, and the letter
            grade is based on that rounded number. For example, 59.996%
            is shown as 60.00% and receives a D-. Some schools round
            differently, so use the exact percentage if a letter
            boundary matters.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            How is extra credit counted?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Tick &quot;Extra credit&quot; on an assignment. Its weight
            and grade are added as bonus course points and divided by
            your completed weight. Your instructor may count extra
            credit differently, so confirm the policy in your syllabus.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">
            Are the calculated results official?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            No. Results are estimates based on the values and
            grading scale you enter. Your school&apos;s official
            calculation may use different rounding rules, extra
            credit policies, or course requirements.
          </p>
        </div>
      </article>

      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="font-semibold text-foreground">
          Important Note
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This grade calculator is intended for educational and
          estimation purposes. Always refer to your school or
          university for official grades, GPA calculations, and
          academic requirements.
        </p>
      </div>

      <article className="space-y-3">
        <h3 className="text-xl font-semibold text-foreground">
          Explore More Free Tools
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          Explore other free online tools to help with everyday
          calculations and conversions.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href="/calculators/age-calculator"
            className="text-primary underline-offset-4 hover:underline"
          >
            Age Calculator
          </Link>

          <Link
            href="/calculators/percentage-calculator"
            className="text-primary underline-offset-4 hover:underline"
          >
            Percentage Calculator
          </Link>

          <Link
            href="/calculators"
            className="text-primary underline-offset-4 hover:underline"
          >
            All Calculators
          </Link>

          <Link
            href="/converters"
            className="text-primary underline-offset-4 hover:underline"
          >
            Online Converters
          </Link>

          <Link
            href="/tools"
            className="text-primary underline-offset-4 hover:underline"
          >
            Explore All Tools
          </Link>
        </div>
      </article>
    </section>
  );
}