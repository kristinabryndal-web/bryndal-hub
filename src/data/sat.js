// ─────────────────────────────────────────────
//  SAT DATA  —  edit this file to update the SAT page
// ─────────────────────────────────────────────

export const satData = {
  testDate: "2026-08-22",
  scores: {
    verbal: { current: 680, target: "720–780", label: "March 2026 sitting" },
    math:   { current: null, target: null, label: "Add score" },
  },
  focusAreas: [
    { name: "Craft & Structure",            pct: 25,  status: "weak" },
    { name: "Standard English Conventions", pct: 30,  status: "weak" },
    { name: "Information & Ideas",          pct: 60,  status: "review" },
    { name: "Math",                         pct: 50,  status: "review" },
  ],
  practiceTests: [
    // Add entries like: { date: "2026-06-01", test: "Bluebook #1", verbal: 690, math: 720, notes: "Good pacing" }
  ],
  studySchedule: [
    { week: "1",   dates: "Jun 2–8",    focus: "Craft & Structure deep dive" },
    { week: "2",   dates: "Jun 9–15",   focus: "Standard English Conventions" },
    { week: "3",   dates: "Jun 16–22",  focus: "Mixed practice + timed sections" },
    { week: "4",   dates: "Jun 23–29",  focus: "Full practice test" },
    { week: "5–8", dates: "July",       focus: "Repeat cycle + weak area drilling" },
    { week: "Final", dates: "Aug 8–21", focus: "Light review, rest, confidence" },
  ],
}
