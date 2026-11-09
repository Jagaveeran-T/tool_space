'use client';

import { useState, useSyncExternalStore } from 'react';

import AgeInputForm from './AgeInputForm';
import AgeResult from './AgeResult';
import AgeStatistics from './AgeStatistics';
import AgeInfo from './AgeInfo';

import {
  calculateAge,
  getTodayDate,
} from '@/lib/calculators/age-calculator';

import type {
  AgeInput,
  AgeResult as AgeResultType,
} from '@/types/age-calculator';

// There is nothing to subscribe to: "today" only needs to be read in the
// browser. This is what keeps it out of the statically exported HTML.
function subscribeToNothing() {
  return () => {};
}

function getServerToday() {
  return '';
}

export default function AgeCalculator() {
  // The site is a static export, so anything computed while rendering on
  // the server is frozen at build time. Reading the date through
  // useSyncExternalStore gives '' on the server and the visitor's real
  // date in the browser, without a hydration mismatch.
  const today = useSyncExternalStore(
    subscribeToNothing,
    getTodayDate,
    getServerToday,
  );

  const [dateOfBirth, setDateOfBirth] = useState('');

  // null means "use today's date". Once the person picks or clears a
  // date, their value is kept.
  const [ageAtDateOverride, setAgeAtDateOverride] = useState<
    string | null
  >(null);

  const values: AgeInput = {
    dateOfBirth,
    ageAtDate: ageAtDateOverride ?? today,
  };

  const [result, setResult] = useState<AgeResultType | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleCalculate() {
    setError('');
    setResult(null);
    setCopied(false);

    if (!values.dateOfBirth) {
      setError('Please enter your date of birth.');
      return;
    }

    if (!values.ageAtDate) {
      setError('Please select the calculation date.');
      return;
    }

    if (values.dateOfBirth > values.ageAtDate) {
      setError('Date of birth cannot be after the calculation date.');
      return;
    }

    const calculatedResult = calculateAge(
      values.dateOfBirth,
      values.ageAtDate,
    );

    if (!calculatedResult) {
      setError('Please enter valid dates.');
      return;
    }

    setResult(calculatedResult);
  }

  function handleReset() {
    setDateOfBirth('');
    setAgeAtDateOverride(null);

    setResult(null);
    setError('');
    setCopied(false);
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    const text = [
      'Age Calculator Results',
      `Age: ${result.years} years, ${result.months} months and ${result.days} days`,
      `Total Months: ${result.totalMonths}`,
      `Total Weeks: ${result.totalWeeks}`,
      `Total Days: ${result.totalDays}`,
      `Total Hours: ${result.totalHours}`,
      `Total Minutes: ${result.totalMinutes}`,
      `Total Seconds: ${result.totalSeconds}`,
      `Day of Birth: ${result.dayOfBirth}`,
      `Next Birthday: ${result.nextBirthday}`,
      `Days Until Birthday: ${result.daysUntilBirthday}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setError('Unable to copy results. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AgeInputForm
        values={values}
        today={today}
        onChange={(nextValues) => {
          setDateOfBirth(nextValues.dateOfBirth);

          if (nextValues.ageAtDate !== values.ageAtDate) {
            setAgeAtDateOverride(nextValues.ageAtDate);
          }

          setResult(null);
          setError('');
          setCopied(false);
        }}
        onCalculate={handleCalculate}
        onReset={handleReset}
        error={error}
      />

      {result && (
        <div className="mt-8">
          <AgeResult
            result={result}
            onCopy={handleCopy}
            copied={copied}
          />

          <AgeStatistics result={result} />
        </div>
      )}

      <AgeInfo />
    </div>
  );
}