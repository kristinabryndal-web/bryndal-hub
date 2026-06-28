// ─────────────────────────────────────────────
//  PRACTICE QUESTION BANKS
//  Edit/add questions here. Each question:
//  { passage, question, choices: [string,...], correct: index, explain }
//  "passage" is optional (omit for standalone grammar items).
// ─────────────────────────────────────────────

export const actConventions = [
  {
    passage: "The committee reviewed the proposal, however they made no final decision.",
    question: "Which choice best corrects the underlined portion?",
    choices: ["the proposal, however they", "the proposal; however, they", "the proposal however, they", "the proposal, however; they"],
    correct: 1,
    explain: "Rule: \"However\" joining two independent clauses needs a semicolon before it and a comma after. A comma alone before \"however\" creates a comma splice — the single most common Conventions trap.",
  },
  {
    passage: "Each of the students brought their own laptop to the workshop.",
    question: "Which choice maintains agreement and is most consistent with formal written English?",
    choices: ["their own laptop", "his or her own laptop", "there own laptop", "NO CHANGE"],
    correct: 1,
    explain: "Rule: \"Each\" is singular, so the pronoun should agree in number. The ACT favors \"his or her\" in formal contexts even though \"their\" is common in speech.",
  },
  {
    passage: "Maria, who had studied abroad for two years she became fluent in three languages.",
    question: "Which choice fixes the sentence?",
    choices: ["NO CHANGE", "two years, became fluent", "two years became, fluent", "two years she became, fluent"],
    correct: 1,
    explain: "Rule: the original has a redundant subject (\"who...she\") creating a fragment-like error. Removing \"she\" lets \"Maria\" connect directly to its verb \"became.\"",
  },
  {
    passage: "The novel's themes are complex, the author uses symbolism throughout.",
    question: "Which choice best corrects this comma splice?",
    choices: ["NO CHANGE", "complex; the author", "complex the author", "complex, and, the author"],
    correct: 1,
    explain: "Rule: two independent clauses joined only by a comma is a comma splice. A semicolon, a period, or a comma + coordinating conjunction (and/but/so) all fix it.",
  },
  {
    passage: "Walking into the old library, the smell of aged paper greeted me.",
    question: "Which revision fixes the misplaced modifier?",
    choices: ["NO CHANGE", "Walking into the old library, I was greeted by the smell of aged paper.", "The smell of aged paper, walking into the old library, greeted me.", "Walking into the old library greeted me with the smell of aged paper."],
    correct: 1,
    explain: "Rule: the introductory phrase must modify the actual person walking. Only choice B places \"I\" right after the comma to receive the action.",
  },
  {
    passage: "The data, collected over five years, shows a clear upward trend.",
    question: "Is the underlined verb correct?",
    choices: ["NO CHANGE — \"data\" is singular here", "Change to \"show\" — \"data\" is plural", "Change to \"showing\"", "Change to \"shown\""],
    correct: 1,
    explain: "Rule: \"data\" is technically plural (singular: datum), so formal written English on the ACT typically treats it as plural: \"data show.\" A classic agreement trap hiding behind a long interrupting phrase.",
  },
  {
    passage: "She enjoys hiking, swimming, and to ride her bike on weekends.",
    question: "Which choice fixes the faulty parallelism?",
    choices: ["NO CHANGE", "and riding her bike", "and she rides her bike", "and bike riding is enjoyed"],
    correct: 1,
    explain: "Rule: items in a list must match grammatical form. \"Hiking, swimming, and riding\" — all gerunds — is parallel; mixing in \"to ride\" breaks the pattern.",
  },
  {
    passage: "Between you and I, the project deadline seems unrealistic.",
    question: "Which choice is correct?",
    choices: ["NO CHANGE", "Between you and me", "Between you and myself", "Between yourself and I"],
    correct: 1,
    explain: "Rule: \"between\" is a preposition, so it takes the object pronoun \"me,\" not the subject pronoun \"I.\" Test: would you say \"between I\"? No — so it's \"between me.\"",
  },
  {
    passage: "Although the storm had passed. The streets remained flooded for days.",
    question: "Which choice best joins these word groups?",
    choices: ["NO CHANGE", "Although the storm had passed, the streets remained flooded for days.", "Although the storm had passed; the streets remained flooded for days.", "Although, the storm had passed, the streets remained flooded for days."],
    correct: 1,
    explain: "Rule: \"Although the storm had passed\" is a dependent clause and can't stand alone as a sentence. It needs a comma — not a period or semicolon — connecting it to the independent clause that follows.",
  },
  {
    passage: "The coach, along with the players, were excited about the win.",
    question: "Which choice corrects the verb?",
    choices: ["NO CHANGE", "was excited", "is excited", "have been excited"],
    correct: 1,
    explain: "Rule: phrases like \"along with,\" \"as well as,\" and \"in addition to\" don't make the subject plural. The true subject is \"the coach\" (singular), so the verb must be \"was.\"",
  },
]

export const actCraftStructure = [
  {
    passage: "Excerpt context: A scientist describes her early career being repeatedly dismissed by senior colleagues, then closes with: \"I kept my notebooks anyway. Someone, eventually, would have to be right.\"",
    question: "The author's primary purpose in this passage is most likely to:",
    choices: ["document a historical scientific discovery in chronological detail", "convey quiet persistence in the face of professional doubt", "criticize the institution she worked for", "explain the technical methodology behind her research"],
    correct: 1,
    explain: "Skill: Author's Purpose. The tone (\"anyway,\" \"eventually\") signals determination despite obstacles, not anger or technical explanation. These questions test inferring tone from word choice, not just content.",
  },
  {
    passage: "From a passage: \"The factory didn't so much close as exhale its last breath, machines sighing into silence one by one.\"",
    question: "The phrase \"exhale its last breath\" primarily serves to:",
    choices: ["provide a literal account of the factory's mechanical shutdown process", "personify the factory, emphasizing a sense of slow, organic decline", "criticize the factory owners for poor maintenance", "establish the exact timeline of the closure"],
    correct: 1,
    explain: "Skill: Word Choice/Figurative Language. \"Exhale,\" \"breath,\" and \"sighing\" are personification — giving the factory human, dying qualities. Tests whether you can name *why* an author chose a word, not just what it means.",
  },
  {
    passage: "A first-person narrator says: \"I told them the bridge was safe. I believed it, too — right up until I didn't.\"",
    question: "This statement most reveals which aspect of the narrator's point of view?",
    choices: ["complete confidence that never wavers", "a shift from certainty to doubt, suggesting self-awareness about being wrong", "indifference to the outcome", "a desire to deceive others intentionally"],
    correct: 1,
    explain: "Skill: Point of View. \"Right up until I didn't\" marks a turning point — the narrator is honest about a change in belief. Watch for pivot words (until, but, then) — they often mark where POV shifts.",
  },
  {
    passage: "An essay states: \"Critics call the policy 'bold.' I'd call it overdue.\"",
    question: "The author's word choice (\"overdue\" vs. \"bold\") primarily functions to:",
    choices: ["show neutral agreement with critics", "subtly reframe the policy as something that should have happened long ago, not as a risky innovation", "praise the critics' analysis", "introduce a counterargument the author will refute later"],
    correct: 1,
    explain: "Skill: Connotation/Author's Stance. \"Bold\" implies risk; \"overdue\" implies it was already necessary and delayed. The contrast is the author quietly asserting a stronger position than \"bold\" suggests.",
  },
  {
    passage: "A passage on urban planning opens with a personal anecdote about getting lost, then transitions: \"That confusion, I'd later learn, was not an accident of bad signage — it was the design.\"",
    question: "This transition primarily functions to:",
    choices: ["correct an error made earlier in the passage", "shift from a personal narrative to a broader claim the rest of the passage will support", "introduce a contradictory source", "summarize the passage's conclusion early"],
    correct: 1,
    explain: "Skill: Structure/Transitions. \"I'd later learn\" signals a pivot from anecdote to thesis. Tests how a paragraph's structure moves the reader from specific to general.",
  },
  {
    passage: "A character is described: \"He spoke the way other men shouted — every word landing like a decision already made.\"",
    question: "This description most suggests that the character is:",
    choices: ["loud and aggressive in his speech", "quietly authoritative, with a calm but commanding manner", "indecisive and uncertain", "uninterested in being heard"],
    correct: 1,
    explain: "Skill: Characterization through word choice. The comparison implies he does NOT shout — but his calm words carry the same force. The simile flips expectation, which is the key to the inference.",
  },
  {
    passage: "A historian writes: \"To call the treaty a failure is to misunderstand what it was built to prevent.\"",
    question: "This sentence functions in the passage primarily to:",
    choices: ["agree fully with prior critics of the treaty", "challenge a common assumption and redirect the reader's evaluation criteria", "provide a statistic supporting the treaty's success", "introduce a new historical figure"],
    correct: 1,
    explain: "Skill: Author's Purpose within structure. \"To call X is to misunderstand Y\" reframes the standard by which we should judge the treaty, not just disagree with critics.",
  },
  {
    passage: "A passage about a chess match: \"She didn't move quickly. She moved as if speed had never once helped her.\"",
    question: "The repetition of \"moved\" across these two sentences emphasizes:",
    choices: ["the character's physical exhaustion", "a deliberate, measured quality to her actions, contrasted with hastiness", "confusion about how to proceed", "the literal mechanics of chess piece movement"],
    correct: 1,
    explain: "Skill: Structure/Repetition for emphasis. Repeating \"moved\" while changing the description sets up a contrast that defines her style as careful rather than hurried.",
  },
  {
    passage: "An op-ed states: \"We don't lack solutions. We lack the will to use them.\"",
    question: "The parallel structure of these two sentences primarily serves to:",
    choices: ["confuse the reader about the real problem", "sharpen a contrast between two possible explanations, favoring one over the other", "list every possible solution available", "apologize for a previous claim"],
    correct: 1,
    explain: "Skill: Structure for argument. Parallel sentence structure makes the contrast between two ideas hit harder — tests whether you can identify *why* a structural choice was made.",
  },
  {
    passage: "A nature writer describes a forest fire's aftermath: \"What looked like devastation was, the ecologist insisted, simply the forest clearing its throat.\"",
    question: "The metaphor \"clearing its throat\" reframes the fire's aftermath as:",
    choices: ["permanently destructive", "a natural, almost routine process rather than a catastrophe", "an unprecedented ecological disaster", "evidence of human negligence"],
    correct: 1,
    explain: "Skill: Figurative language and reframing. \"Clearing its throat\" is a small, ordinary human action — applying it to a forest fire downgrades the event from \"disaster\" to \"normal function.\"",
  },
]

// Digital SAT format: short passage with one blank, choices fill the blank.
// No "NO CHANGE" option — this is how the actual Bluebook interface presents these.
export const satConventions = [
  {
    passage: "Marine biologists have long studied coral bleaching, but recent satellite data ____ a faster rate of reef decline than previously modeled.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["reveals", "reveal", "revealing", "have revealed"],
    correct: 0,
    explain: "Rule: the subject is \"data,\" which on the SAT is often tested as singular in this construction when paired with \"recent satellite data\" as a unit. Check what the verb's true subject is — here it's the singular noun phrase acting as the sentence's subject.",
  },
  {
    passage: "The museum's new wing, ____ houses over three hundred Indigenous artifacts, opened to the public last spring.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["which", "who", "where", "this"],
    correct: 0,
    explain: "Rule: \"which\" correctly introduces a nonessential clause describing a thing (the wing). \"Who\" is for people, \"where\" needs a location-based clause structure, and \"this\" would create a fragment.",
  },
  {
    passage: "Despite years of negotiation, the two companies ____ unable to reach an agreement on distribution rights.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["remained", "remains", "remaining", "has remained"],
    correct: 0,
    explain: "Rule: \"the two companies\" is plural, so the verb must agree: \"remained,\" not the singular \"remains\" or \"has remained.\"",
  },
  {
    passage: "Before ____ to the lab, the researchers calibrated each instrument twice to rule out measurement error.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["returning", "they return", "having returned", "returned"],
    correct: 0,
    explain: "Rule: after a preposition like \"before,\" English requires a gerund (\"returning\"), not a full clause or past-tense verb. This is a common SAT trap testing prepositions + gerunds.",
  },
  {
    passage: "The committee's recommendation, along with supporting financial projections, ____ submitted to the board on Friday.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["was", "were", "have been", "are"],
    correct: 0,
    explain: "Rule: \"along with\" is a parenthetical phrase, not part of the subject. The true subject is \"the committee's recommendation\" (singular), so the verb is \"was.\"",
  },
  {
    passage: "Neither the city council nor the mayor ____ willing to comment on the proposed budget cuts.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["was", "were", "have been", "are"],
    correct: 0,
    explain: "Rule: with \"neither...nor,\" the verb agrees with the closer subject — here, \"the mayor,\" which is singular. So the verb is \"was.\"",
  },
  {
    passage: "The scientist's hypothesis, while controversial at the time, ____ ultimately confirmed by three independent studies.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["was", "were", "being", "have been"],
    correct: 0,
    explain: "Rule: the long interrupting phrase (\"while controversial at the time\") distracts from the true singular subject \"hypothesis,\" which needs the singular verb \"was.\"",
  },
  {
    passage: "Anyone who wants to attend the workshop should bring ____ own laptop and a notebook.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["his or her", "their", "its", "the"],
    correct: 0,
    explain: "Rule: \"anyone\" is singular and indefinite. Formal written English on the SAT favors \"his or her\" for strict agreement, even though \"their\" is common in speech.",
  },
  {
    passage: "The findings of the report ____ not only surprising but also difficult to replicate in follow-up trials.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["were", "was", "is", "being"],
    correct: 0,
    explain: "Rule: \"the findings\" is plural (findings = multiple results), so the verb must be the plural \"were,\" not the singular \"was\" or \"is.\"",
  },
  {
    passage: "Having spent a decade restoring the old theater, the architect finally ____ the building reopen to a sold-out crowd.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["watched", "watching", "had watched", "watches"],
    correct: 0,
    explain: "Rule: the introductory participial phrase (\"Having spent...\") needs a clear, simple main verb to follow. \"Watched\" correctly completes the main clause in past tense, matching \"finally.\"",
  },
]

export const satCraftStructure = [
  {
    passage: "A biographer writes of an inventor who failed publicly for a decade before succeeding: \"His critics called the years a waste. He called them a draft.\"",
    question: "Which choice best states the main purpose of this contrast?",
    choices: ["to suggest the inventor reframed failure as a necessary, ongoing process rather than wasted time", "to argue that critics were entirely correct in their assessment", "to provide a precise timeline of the inventor's career", "to introduce a disagreement between two historians"],
    correct: 0,
    explain: "Skill: Words in Context / Author's Purpose. \"Draft\" implies an early, revisable version — the inventor saw the failed years as productive groundwork, not waste. The contrast structure is the clue.",
  },
  {
    passage: "An essay on urban design states: \"A good plaza doesn't tell you where to sit. It makes every spot worth sitting in.\"",
    question: "The most likely purpose of this sentence is to:",
    choices: ["define successful design as creating flexible, inviting space rather than rigid instruction", "criticize plazas that provide too much seating", "argue that plazas should have no seating at all", "describe the materials used in plaza construction"],
    correct: 0,
    explain: "Skill: Central Idea / Purpose. The parallel structure (\"doesn't tell you... it makes...\") contrasts rigid control with flexible appeal — the core claim about what makes design \"good.\"",
  },
  {
    passage: "A passage on climate science notes: \"The model isn't wrong. It's incomplete — and incompleteness, in science, is not the same as failure.\"",
    question: "Which choice best describes the function of the final clause (\"and incompleteness... is not the same as failure\")?",
    choices: ["it reframes a potential weakness as a normal, expected stage rather than a flaw", "it admits the model is entirely useless", "it introduces a new model with different assumptions", "it provides a statistic about the model's accuracy"],
    correct: 0,
    explain: "Skill: Text Structure and Purpose. This is a defensive reframing move — distinguishing \"incomplete\" from \"wrong\" protects the model's credibility while acknowledging its limits.",
  },
  {
    passage: "A profile describes a chef: \"She doesn't follow recipes so much as interrogate them.\"",
    question: "The word \"interrogate\" in this context most nearly suggests that the chef:",
    choices: ["questions and tests recipes rather than following them passively", "refuses to cook from written recipes at all", "is hostile toward other chefs", "memorizes recipes exactly as written"],
    correct: 0,
    explain: "Skill: Words in Context. \"Interrogate\" (normally used for questioning a person) is applied metaphorically to recipes — implying active scrutiny and challenge, not blind following.",
  },
  {
    passage: "Two researchers studying the same fossil reach different conclusions. Text 1 argues the species was a predator; Text 2 argues it was a scavenger, citing tooth-wear patterns Text 1 doesn't address.",
    question: "Based on the texts, how would the author of Text 2 most likely respond to Text 1's claim?",
    choices: ["by pointing out that Text 1's argument doesn't account for evidence Text 2 considers central", "by fully agreeing with Text 1's conclusion", "by questioning whether the fossil is genuine", "by proposing an entirely unrelated species classification"],
    correct: 0,
    explain: "Skill: Cross-Text Connections. Text 2's argument rests on evidence (tooth-wear) that Text 1 ignores — so Text 2 would most logically challenge Text 1 for that omission, not agree or change the subject.",
  },
  {
    passage: "A travel writer notes: \"The guidebooks call it a quiet town. I'd call it a town that hasn't been asked the right question yet.\"",
    question: "This statement primarily functions to:",
    choices: ["suggest the writer believes the town has untold stories the guidebooks missed", "confirm that the guidebooks are completely accurate", "criticize the town for being too quiet", "provide a statistic about the town's population"],
    correct: 0,
    explain: "Skill: Author's Purpose. The reframe (\"hasn't been asked the right question\") implies hidden depth the guidebooks failed to surface — setting up the writer's own deeper exploration.",
  },
  {
    passage: "An economist writes: \"Markets don't predict the future. They price our disagreements about it.\"",
    question: "Which choice best captures the function of this sentence in an argument about market behavior?",
    choices: ["it redefines what markets actually do, shifting focus from prediction to reflecting differing beliefs", "it claims markets are always wrong", "it argues markets should be replaced by central planning", "it summarizes historical market crashes"],
    correct: 0,
    explain: "Skill: Central Idea. The parallel \"don't... they...\" structure redefines the premise — markets aren't forecasting tools, they're a reflection of collective disagreement. This reframing is the sentence's whole job.",
  },
  {
    passage: "A novelist describes a character's homecoming: \"The house remembered her before she remembered it.\"",
    question: "This line primarily serves to:",
    choices: ["personify the house, suggesting an emotional connection that runs deeper than the character's own memory", "literally claim the house has consciousness and intent", "criticize the character for forgetting her home", "describe the physical condition of the house in detail"],
    correct: 0,
    explain: "Skill: Figurative Language / Purpose. Giving the house \"memory\" before the character regains hers is personification used to convey the depth and inevitability of belonging, not a literal claim.",
  },
  {
    passage: "A science writer explains: \"Calling it a 'theory' undersells it. In science, a theory isn't a guess — it's the survivor of every attempt to prove it wrong.\"",
    question: "The primary function of this passage is to:",
    choices: ["correct a common misconception about how the word \"theory\" is used in science", "argue that all scientific theories are guesses", "introduce a specific scientific theory by name", "criticize scientists for using imprecise language"],
    correct: 0,
    explain: "Skill: Author's Purpose. The passage directly addresses a gap between everyday usage (\"theory\" = guess) and scientific usage (\"theory\" = rigorously tested), correcting the reader's assumption.",
  },
  {
    passage: "A memoirist writes: \"Grief, I learned, doesn't move in a line. It circles back wearing different clothes.\"",
    question: "The metaphor \"wearing different clothes\" most nearly suggests that grief:",
    choices: ["reappears in new, sometimes unrecognizable forms rather than disappearing for good", "ends completely after a fixed period of time", "is identical in feeling every time it returns", "can be controlled through deliberate planning"],
    correct: 0,
    explain: "Skill: Figurative Language. \"Different clothes\" implies grief returns disguised — recognizable as itself only on closer inspection, never fully gone, just dressed differently each time.",
  },
]

// ACT Math — Functions (75%, missed 2/8)
// Tests: function notation/evaluation, composition, inverses, transformations, domain/range
export const actFunctions = [
  {
    question: "If f(x) = 3x² − 2x + 1, what is f(−2)?",
    choices: ["9", "17", "13", "−3"],
    correct: 1,
    explain: "f(−2) = 3(−2)² − 2(−2) + 1 = 3(4) + 4 + 1 = 12 + 4 + 1 = 17. Watch your signs: (−2)² = +4, and −2(−2) = +4.",
  },
  {
    question: "If f(x) = 2x + 3 and g(x) = x² − 1, what is f(g(3))?",
    choices: ["19", "21", "17", "11"],
    correct: 0,
    explain: "Work inside-out: g(3) = 3² − 1 = 8. Then f(8) = 2(8) + 3 = 19. Composition means plug the inner output into the outer function.",
  },
  {
    question: "What is the inverse of f(x) = (x − 4) / 2?",
    choices: ["f⁻¹(x) = 2x + 4", "f⁻¹(x) = 2x − 4", "f⁻¹(x) = (x + 4) / 2", "f⁻¹(x) = x/2 + 4"],
    correct: 0,
    explain: "To find the inverse, swap x and y then solve for y. x = (y − 4)/2 → 2x = y − 4 → y = 2x + 4. Always verify: f(f⁻¹(x)) should give x.",
  },
  {
    question: "The function g(x) = f(x − 3) represents which transformation of f(x)?",
    choices: ["Shift left 3", "Shift right 3", "Shift up 3", "Shift down 3"],
    correct: 1,
    explain: "Replacing x with (x − h) shifts a graph RIGHT by h. This is the opposite of what looks intuitive — f(x − 3) moves every point 3 units to the right.",
  },
  {
    question: "What is the domain of f(x) = √(x − 5)?",
    choices: ["x ≥ 5", "x > 5", "x ≥ −5", "All real numbers"],
    correct: 0,
    explain: "The expression under a square root must be ≥ 0. So x − 5 ≥ 0 → x ≥ 5. At x = 5 the function equals 0, which is valid, so the domain includes 5.",
  },
  {
    question: "If f(x) = |2x − 6|, for what values of x does f(x) = 4?",
    choices: ["x = 5 or x = 1", "x = 5 only", "x = 1 only", "x = −1 or x = 5"],
    correct: 0,
    explain: "Set up two equations: 2x − 6 = 4 → x = 5, and 2x − 6 = −4 → x = 1. Absolute value equations always produce two cases — don't forget the negative case.",
  },
  {
    question: "A function f is defined as f(x) = x² for x < 0 and f(x) = 2x for x ≥ 0. What is f(−3) + f(4)?",
    choices: ["17", "−1", "25", "5"],
    correct: 0,
    explain: "f(−3): since −3 < 0, use x²: (−3)² = 9. f(4): since 4 ≥ 0, use 2x: 2(4) = 8. Sum = 9 + 8 = 17. Piecewise functions require checking which rule applies first.",
  },
  {
    question: "If f(x) = 5x − 2, what is f(a + 1) in simplest form?",
    choices: ["5a + 3", "5a − 1", "5a + 1", "5a − 3"],
    correct: 0,
    explain: "Substitute (a + 1) for x: f(a + 1) = 5(a + 1) − 2 = 5a + 5 − 2 = 5a + 3. This tests whether you can substitute an expression, not just a number.",
  },
  {
    question: "Which of the following represents a function?",
    choices: [
      "A circle centered at the origin",
      "{(1,2), (2,3), (3,4), (4,5)}",
      "{(1,2), (1,3), (2,4)}",
      "x = y²"
    ],
    correct: 1,
    explain: "A relation is a function if each input (x-value) maps to exactly one output. The set {(1,2),(2,3),(3,4),(4,5)} has no repeated x-values. The circle and x = y² fail the vertical line test; (1,2),(1,3) has x=1 giving two outputs.",
  },
  {
    question: "The graph of f(x) is shifted 2 units up and reflected over the x-axis. Which expression represents the result?",
    choices: ["−f(x) − 2", "−f(x) + 2", "f(−x) + 2", "f(x) − 2"],
    correct: 0,
    explain: "Shift up 2: f(x) + 2. Then reflect over x-axis: multiply the whole thing by −1 → −(f(x) + 2) = −f(x) − 2. Order matters: apply the shift first, then the reflection.",
  },
]

// ACT Math — Integrating Essential Skills (75%, missed 2/8)
// Tests: rates/ratios, percents, unit conversion, multi-step applied problems, averages
export const actEssentialSkills = [
  {
    question: "A car travels 210 miles in 3.5 hours. At the same rate, how far will it travel in 5 hours?",
    choices: ["300 miles", "280 miles", "320 miles", "350 miles"],
    correct: 0,
    explain: "Rate = 210 ÷ 3.5 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles. These problems always work through unit rate first.",
  },
  {
    question: "A shirt originally costs $80. It is discounted 25%, then an additional 10% is taken off the sale price. What is the final price?",
    choices: ["$54.00", "$52.00", "$56.00", "$60.00"],
    correct: 0,
    explain: "After 25% off: $80 × 0.75 = $60. Then 10% off $60: $60 × 0.90 = $54. A common trap: applying 35% total. Sequential discounts compound — they're NOT additive.",
  },
  {
    question: "The average of five numbers is 18. If four of the numbers are 12, 15, 20, and 24, what is the fifth number?",
    choices: ["19", "18", "17", "21"],
    correct: 0,
    explain: "Total sum needed = 18 × 5 = 90. Sum of four known numbers = 12 + 15 + 20 + 24 = 71. Fifth number = 90 − 71 = 19.",
  },
  {
    question: "A recipe calls for 2½ cups of flour to make 24 cookies. How many cups are needed for 60 cookies?",
    choices: ["6.25 cups", "5.5 cups", "6 cups", "7 cups"],
    correct: 0,
    explain: "Set up a proportion: 2.5/24 = x/60. Cross-multiply: x = 2.5 × 60 / 24 = 150/24 = 6.25 cups.",
  },
  {
    question: "A tank holds 450 gallons. It drains at 15 gallons per minute. How many minutes until it reaches 25% full?",
    choices: ["22.5 minutes", "30 minutes", "18 minutes", "25 minutes"],
    correct: 0,
    explain: "25% of 450 = 112.5 gallons must remain. Gallons to drain = 450 − 112.5 = 337.5. Time = 337.5 ÷ 15 = 22.5 minutes.",
  },
  {
    question: "A worker earns $18/hour and gets a 15% raise. What is the new hourly rate?",
    choices: ["$20.70", "$20.00", "$21.00", "$19.80"],
    correct: 0,
    explain: "New rate = $18 × 1.15 = $20.70. The multiplier method (× 1.15) is faster and less error-prone than computing 15% separately and adding.",
  },
  {
    question: "Two trains leave the same station in opposite directions. Train A travels at 65 mph and Train B at 75 mph. How far apart are they after 2.5 hours?",
    choices: ["350 miles", "325 miles", "300 miles", "375 miles"],
    correct: 0,
    explain: "Moving in opposite directions, their speeds add: 65 + 75 = 140 mph combined. Distance = 140 × 2.5 = 350 miles.",
  },
  {
    question: "If 3 workers can complete a job in 8 days, how many days would it take 6 workers at the same rate?",
    choices: ["4 days", "6 days", "3 days", "5 days"],
    correct: 0,
    explain: "Total work = 3 × 8 = 24 worker-days. With 6 workers: 24 ÷ 6 = 4 days. Inverse proportion — doubling workers halves the time.",
  },
  {
    question: "A store marks up a product 40% above cost, then offers a 20% discount. What percent of the original cost is the final price?",
    choices: ["112%", "120%", "108%", "100%"],
    correct: 0,
    explain: "Markup: cost × 1.40. Discount: × 0.80. Combined: 1.40 × 0.80 = 1.12 = 112% of cost. This is a classic 'percent of percent' trap — the final price is 12% above cost, not 20% above.",
  },
  {
    question: "A student scores 78, 85, and 91 on three tests. What score is needed on the fourth test to achieve an average of 85?",
    choices: ["86", "84", "88", "90"],
    correct: 0,
    explain: "Target sum = 85 × 4 = 340. Current sum = 78 + 85 + 91 = 254. Needed = 340 − 254 = 86.",
  },
]
