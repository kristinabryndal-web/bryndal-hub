// ─────────────────────────────────────────────
//  COLLEGE DATA  —  edit this file to update the college tracker
// ─────────────────────────────────────────────

export const collegeData = {
  student: "Chase Bryndal",
  school:  "Benet Academy, Class of 2027",

  schools: [
    {
      name:      "Boston College",
      strategy:  "ED",
      satRange:  "1440–1550",
      actRange:  "33–35",
      deadline:  "Nov 1",
      interview: null,
      status:    "not-started",
      notes:     "Ever to Excel program — accepted. ED gives ~30% boost.",
    },
    {
      name:      "Wake Forest",
      strategy:  "Early",
      satRange:  "1390–1530",
      actRange:  "32–34",
      deadline:  "Nov 1",
      interview: "Within 5 days of applying — HIGH PRIORITY",
      status:    "not-started",
      notes:     "Schedule interview immediately after submitting.",
    },
    {
      name:      "Villanova",
      strategy:  "EA",
      satRange:  "1310–1490",
      actRange:  "30–34",
      deadline:  "Nov 1",
      interview: null,
      status:    "not-started",
      notes:     "",
    },
    {
      name:      "TCU",
      strategy:  "EA",
      satRange:  "1220–1430",
      actRange:  "27–33",
      deadline:  "Nov 1",
      interview: null,
      status:    "not-started",
      notes:     "",
    },
    {
      name:      "Vanderbilt",
      strategy:  "Regular",
      satRange:  "1510–1570",
      actRange:  "34–36",
      deadline:  "Jan 1",
      interview: null,
      status:    "not-started",
      notes:     "",
    },
    {
      name:      "Duke",
      strategy:  "Regular",
      satRange:  "1500–1570",
      actRange:  "34–36",
      deadline:  "Jan 2",
      interview: null,
      status:    "not-started",
      notes:     "",
    },
  ],

  essays: [
    { name: "Common App Personal Statement", wordCount: 650,  due: "Aug 1 (goal)", status: "not-started" },
    { name: "Boston College — Why BC?",      wordCount: 400,  due: "Nov 1",        status: "not-started" },
    { name: "Wake Forest supplemental",      wordCount: null, due: "Nov 1",        status: "not-started" },
    { name: "Vanderbilt supplemental",       wordCount: null, due: "Jan 1",        status: "not-started" },
  ],

  checklist: [
    { text: "Register for August 22 SAT",                            done: false },
    { text: "Decide on July 11 ACT — registration closes ~June 6",  done: false },
    { text: "Request teacher recommendations by end of June",        done: false },
    { text: "Request counselor recommendation",                      done: false },
    { text: "Begin Common App personal statement",                   done: false },
    { text: "Submit BC ED application by Nov 1",                     done: false },
    { text: "Schedule Wake Forest interview within 5 days of applying", done: false },
  ],
}
