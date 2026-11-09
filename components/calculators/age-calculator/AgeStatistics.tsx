import type { AgeResult } from '@/types/age-calculator';

type Props = {
  result: AgeResult;
};

const numberFormatter = new Intl.NumberFormat('en-US');

export default function AgeStatistics({ result }: Props) {
  const statistics = [
    {
      label: 'Total Months',
      value: result.totalMonths,
    },
    {
      label: 'Total Weeks',
      value: result.totalWeeks,
    },
    {
      label: 'Total Days',
      value: result.totalDays,
    },
    {
      label: 'Total Hours',
      value: result.totalHours,
    },
    {
      label: 'Total Minutes',
      value: result.totalMinutes,
    },
    {
      label: 'Total Seconds',
      value: result.totalSeconds,
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          Your Age in Different Units
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Additional statistics calculated from the selected calendar dates.
          Hours, minutes and seconds are based on whole calendar days.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground sm:text-sm">
              {item.label}
            </p>

            <p className="mt-2 break-all text-xl font-bold sm:text-2xl">
              {numberFormatter.format(item.value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}