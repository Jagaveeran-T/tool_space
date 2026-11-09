export default function AgeInfo() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          About the Age Calculator
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          Our free online Age Calculator helps you calculate your exact
          age using your date of birth and a selected calculation date.
          It displays your age in years, months and days, along with
          additional information such as total months, weeks, days,
          hours, minutes and seconds.
        </p>

        <p className="mt-3 leading-7 text-muted-foreground">
          You can use this calculator to find your current age, calculate
          your age on a past date, or determine how old you will be on a
          future date. No manual date calculations are required.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          How Does the Age Calculator Work?
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          Enter your date of birth and choose the date on which you want
          to calculate your age. The calculator compares both dates and
          determines the completed years, months and remaining days.
          It then calculates the total elapsed days and converts them
          into weeks, hours, minutes and seconds.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          How Is Age Calculated?
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          Age is calculated by comparing the date of birth with the
          selected calculation date. The calculator first determines
          the number of completed years, then calculates the completed
          months after those years, and finally finds the remaining days.
        </p>

        <p className="mt-3 leading-7 text-muted-foreground">
          For example, if someone was born on 4 November 2000 and the
          calculation date is 4 November 2026, their age is 26 years,
          0 months and 0 days.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          What Is a Leap Year?
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          A leap year contains 366 days instead of the usual 365 days.
          February has 29 days during a leap year rather than 28 days.
          A year is generally a leap year if it is divisible by 4.
          However, years divisible by 100 are not leap years unless
          they are also divisible by 400.
        </p>

        <p className="mt-3 leading-7 text-muted-foreground">
          If your birthday is on February 29, this calculator uses
          February 28 as your birthday in non-leap years.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          Understanding Your Age in Different Units
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          In addition to your calendar age, the calculator provides
          several useful measurements:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
          <li>
            <strong>Total Months:</strong> Completed months of age,
            including completed years.
          </li>
          <li>
            <strong>Total Weeks:</strong> Complete seven-day periods
            since your date of birth.
          </li>
          <li>
            <strong>Total Days:</strong> Total calendar days between
            your birth date and the selected date.
          </li>
          <li>
            <strong>Total Hours:</strong> Total days multiplied by 24.
          </li>
          <li>
            <strong>Total Minutes:</strong> Total days multiplied by
            1,440.
          </li>
          <li>
            <strong>Total Seconds:</strong> Total days multiplied by
            86,400.
          </li>
        </ul>

        <p className="mt-3 leading-7 text-muted-foreground">
          Hours, minutes and seconds are estimates based on complete
          calendar days. They do not account for the exact time of birth.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          How Is the Next Birthday Calculated?
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          The calculator identifies the next birthday after your
          selected calculation date and displays the number of days
          remaining. If the selected date is your birthday, the
          countdown refers to your birthday in the following year.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-foreground">
              1. Is this Age Calculator free to use?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              Yes. You can use the Age Calculator for free without
              creating an account or registering.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              2. Can I calculate my age on a past date?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              Yes. Select any valid calculation date that is on or
              after your date of birth to find your age on that date.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              3. Can I calculate my future age?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              Yes. Choose a future calculation date to find out how
              old you will be on that date.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              4. Can I enter a future date of birth?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              No. The date of birth must be today or an earlier date.
              The calculator does not accept a future birth date.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              5. How are February 29 birthdays handled?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              For birthdays on February 29, the calculator uses
              February 28 in years that do not have a February 29.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              6. Does the calculator store my date of birth?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              The calculator performs its age calculations in your
              browser. Your entered dates are not sent to the
              application server by the calculator.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              7. Can I copy my age calculation results?
            </h3>

            <p className="mt-2 leading-7 text-muted-foreground">
              Yes. Use the Copy Results button to copy your calculated
              age and additional statistics.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          Explore More Free Online Tools
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          ToolSpace provides free online calculators and converters
          designed to make everyday calculations easier. Explore
          our other tools to find useful solutions for common tasks.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <a
            href="/calculators"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            Explore Calculators
          </a>

          <a
            href="/converters"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            Explore Converters
          </a>

          <a
            href="/tools"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            View All Tools
          </a>
        </div>
      </div>
    </section>
  );
}