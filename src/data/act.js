// ─────────────────────────────────────────────
//  ACT DATA  —  edit this file to update the ACT page
// ─────────────────────────────────────────────

export const actData = {
  testDate: "2026-07-11",
  registrationDeadline: "2026-06-06",
  decision: "deciding",   // "yes" | "no" | "deciding"
  targets: {
    english:   { score: 34, current: null },
    math:      { score: 34, current: null },
    reading:   { score: 33, current: null },
    science:   { score: 34, current: null },
    composite: { score: 34, current: null },
  },
  practiceTests: [
    // Add entries like: { date: "2026-06-10", english: 33, math: 34, reading: 32, science: 35, composite: 34 }
  ],
  pros: [
    "Science section suits aerospace/pilot background",
    "July 11 test date — before SAT",
    "Strong composite score accepted everywhere",
  ],
  cons: [
    "Registration closes ~June 6",
    "4 sections vs SAT's 2",
    "Less time to prep alongside SAT",
  ],
}
