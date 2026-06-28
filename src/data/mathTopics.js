// ─────────────────────────────────────────────
//  ACT MATH TOP 75 TOPIC DATA
//  tier: 'guaranteed' | 'likely' | 'worth' | 'twice'
// ─────────────────────────────────────────────

export const mathTopics = [
  // ── GUARANTEED ─────────────────────────────
  {
    id: 1, tier: 'guaranteed', name: 'Fractions and Decimals',
    know: 'All four operations with fractions and decimals. Convert between them. Mixed numbers: convert to improper fractions before multiplying or dividing.',
    trap: 'Forgetting to find a common denominator before adding/subtracting. Dividing fractions: multiply by the reciprocal of the second fraction.',
  },
  {
    id: 2, tier: 'guaranteed', name: 'Area / Perimeter of Basic Shapes',
    know: 'Triangle: A = ½bh. Rectangle: A = lw, P = 2l + 2w. Circle: A = πr², C = 2πr. Trapezoid: A = ½(b₁ + b₂)h.',
    trap: 'Using diameter instead of radius in circle formulas. For triangles, the height must be perpendicular to the base — not a side length.',
  },
  {
    id: 3, tier: 'guaranteed', name: 'Probability (Basic)',
    know: 'P(event) = favorable outcomes ÷ total outcomes. Part-to-whole. Know how to read probability from tables and Venn diagrams.',
    trap: 'Confusing part:part with part:whole ratios. Always divide by the total number of outcomes, not the number of categories.',
  },
  {
    id: 4, tier: 'guaranteed', name: 'Ratio',
    know: 'Part:part and part:whole. Scale ratios. If a:b = 3:5, the actual values are 3x and 5x for some x. Use proportions to solve.',
    trap: 'A ratio of 3:5 means 3 parts to 5 parts (total 8 parts), not 3 out of 5. Always identify which type you have.',
  },
  {
    id: 5, tier: 'guaranteed', name: 'Linear Equations / Slope',
    know: 'Slope = (y₂ − y₁)/(x₂ − x₁). Slope-intercept: y = mx + b. Standard form: Ax + By = C. Point-slope: y − y₁ = m(x − x₁). Parallel lines: same slope. Perpendicular: negative reciprocal slopes.',
    trap: 'Subtracting coordinates in the wrong order. Horizontal lines have slope 0; vertical lines have undefined slope.',
  },
  {
    id: 6, tier: 'guaranteed', name: 'Quadratic Skills',
    know: 'Factor: find two numbers that multiply to c and add to b. FOIL. Set factors equal to zero to find roots. Parabola: y = a(x−h)² + k, vertex at (h, k). Opens up if a > 0.',
    trap: 'Sign errors when factoring: x² − 5x + 6 = (x−2)(x−3), not (x+2)(x+3). Don\'t forget to set each factor equal to zero separately.',
  },
  {
    id: 7, tier: 'guaranteed', name: 'Plug In',
    know: 'Substitute a given value into an equation or function. Evaluate carefully, following order of operations. Used constantly across question types.',
    trap: 'Plugging into the wrong variable, or losing track of negative signs when substituting negative values. Write out the substitution step explicitly.',
  },
  {
    id: 8, tier: 'guaranteed', name: 'Average (Arithmetic Mean)',
    know: 'Mean = sum ÷ count. To find the sum: mean × count. Average sum trick: if 5 tests averaged 80, the total is 400. To find the 6th score needed for a new average, find the new target sum and subtract.',
    trap: 'Averaging averages (you can\'t just add two averages and divide by 2 unless both groups are the same size).',
  },
  {
    id: 9, tier: 'guaranteed', name: 'Factoring',
    know: 'Factor out the GCF first. Then try x² + bx + c: find two numbers that multiply to c and add to b. Difference of two squares: a² − b² = (a+b)(a−b).',
    trap: 'Missing the GCF — always check for a common factor first. Leading coefficient ≠ 1 is rare on the ACT, but if it appears, use the AC method.',
  },
  {
    id: 10, tier: 'guaranteed', name: 'Solving Equations',
    know: 'ax + b = cx + d: move variables to one side, constants to the other. Distribute first, then combine like terms. Translate word problems into equations carefully.',
    trap: 'Forgetting to flip the inequality sign when multiplying or dividing by a negative. In word problems, define your variable explicitly before writing the equation.',
  },
  {
    id: 11, tier: 'guaranteed', name: 'Functions',
    know: 'f(x) is notation for the output when x is the input. Evaluate by substituting. Composition: g(f(x)) means plug f(x) into g. Inverse: swap x and y, then solve for y.',
    trap: 'f(x+1) ≠ f(x) + 1. You must substitute the entire expression (x+1) everywhere x appears in the function.',
  },
  {
    id: 12, tier: 'guaranteed', name: 'Conversion',
    know: 'Set up unit fractions so unwanted units cancel. Watch for squared or cubed units (e.g. ft² to in² requires multiplying by 12², not 12).',
    trap: 'Forgetting to square or cube conversion factors for area and volume problems. Always write out the unit fraction explicitly.',
  },

  // ── VERY LIKELY ────────────────────────────
  {
    id: 13, tier: 'likely', name: 'Angle Chasing',
    know: 'Straight line = 180°. Triangle interior angles sum to 180°. Vertical angles are equal. Corresponding and alternate interior angles are equal when lines are parallel.',
    trap: 'Co-interior (same-side interior) angles are supplementary (add to 180°), not equal. Don\'t confuse them with alternate interior angles.',
  },
  {
    id: 14, tier: 'likely', name: 'Exponents',
    know: 'Product rule: xᵃ · xᵇ = xᵃ⁺ᵇ. Quotient rule: xᵃ/xᵇ = xᵃ⁻ᵇ. Power rule: (xᵃ)ᵇ = xᵃᵇ. x⁰ = 1. Negative exponent: x⁻ⁿ = 1/xⁿ. Fractional: x^(m/n) = (ⁿ√x)ᵐ.',
    trap: '(xy)² = x²y², but (x+y)² ≠ x² + y². The power applies to each factor, not each term.',
  },
  {
    id: 15, tier: 'likely', name: 'MPH (Speed / Rate)',
    know: 'd = rt (distance = rate × time). Rearrange for any variable. Watch units: if speed is mph, time must be in hours. Average speed over a round trip ≠ average of the two speeds.',
    trap: 'Average speed = total distance ÷ total time, NOT (speed₁ + speed₂) ÷ 2. This trips up almost everyone.',
  },
  {
    id: 16, tier: 'likely', name: 'Percents',
    know: 'Percent of: multiply by the decimal. Percent change: (new − old)/old × 100. Markup/discount: use multipliers (×1.15 for 15% increase, ×0.85 for 15% decrease). Successive discounts compound — don\'t add them.',
    trap: 'A 20% increase followed by a 20% decrease does NOT return to the original value. 1.20 × 0.80 = 0.96 — you end up at 96%.',
  },
  {
    id: 17, tier: 'likely', name: 'Radicals',
    know: '√(ab) = √a · √b. Simplify by factoring out perfect squares: √72 = 6√2. Rationalize denominators: multiply by √n/√n. Translate: √x = x^(1/2), ⁿ√x = x^(1/n).',
    trap: '√(a + b) ≠ √a + √b. You cannot split a radical over addition or subtraction.',
  },
  {
    id: 18, tier: 'likely', name: 'SOHCAHTOA',
    know: 'sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. Set up the correct ratio from the given angle. Use inverse trig (sin⁻¹ etc.) to find angles.',
    trap: 'Always identify the reference angle first, then label opposite/adjacent from that angle\'s perspective — not the triangle\'s perspective generally.',
  },
  {
    id: 19, tier: 'likely', name: 'Arithmetic Sequence',
    know: 'Constant difference between terms. nth term: aₙ = a₁ + (n−1)d. Sum of n terms: Sₙ = n/2 × (a₁ + aₙ).',
    trap: 'The 5th term uses (n−1) = 4, not 5. Off-by-one errors are the most common mistake here.',
  },
  {
    id: 20, tier: 'likely', name: 'Fractional Exponents',
    know: 'x^(m/n) = (ⁿ√x)ᵐ. The denominator is the root, the numerator is the power. 8^(2/3) = (∛8)² = 4. All standard exponent rules still apply.',
    trap: 'Applying the power before the root gets messy. Take the root first, then apply the power — it keeps numbers smaller and more manageable.',
  },
  {
    id: 21, tier: 'likely', name: 'Graph Translations',
    know: 'y = f(x−h) + k shifts right h and up k. y = −f(x) reflects over x-axis. y = f(−x) reflects over y-axis. y = af(x) stretches vertically by factor a. y = 2(x+1)² − 5: vertex at (−1, −5), opens up, narrower than standard.',
    trap: 'Horizontal shifts are counter-intuitive: (x − 3) shifts RIGHT, (x + 3) shifts LEFT. The sign inside the function is opposite to the direction of shift.',
  },
  {
    id: 22, tier: 'likely', name: 'Imaginary Numbers',
    know: 'i = √(−1), i² = −1, i³ = −i, i⁴ = 1 (cycle repeats). For large powers of i, divide the exponent by 4 and use the remainder. Complex number: a + bi.',
    trap: 'i² = −1, not 1. When multiplying complex numbers, don\'t forget to replace i² with −1 after FOILing.',
  },
  {
    id: 23, tier: 'likely', name: 'Negatives',
    know: 'Negative × negative = positive. (−a)² = a² but −a² = −(a²). Subtracting a negative adds. Distributing a negative flips all signs inside.',
    trap: '−3² = −9 (the exponent applies to 3, not −3), but (−3)² = 9. This distinction trips up students constantly.',
  },
  {
    id: 24, tier: 'likely', name: 'Probability, Two Events',
    know: 'Independent events: P(A and B) = P(A) × P(B). P(A or B) = P(A) + P(B) − P(A and B). Dependent events (without replacement): adjust the denominator for the second draw.',
    trap: 'Only multiply probabilities for independent "and" events. For "or" questions, don\'t double-count the overlap.',
  },
  {
    id: 25, tier: 'likely', name: 'Similar Triangles',
    know: 'Same angles = similar triangles. Corresponding sides are proportional. Set up a proportion: a/b = c/d. Side ratios are consistent; area ratios are the side ratio squared.',
    trap: 'Matching up the CORRESPONDING sides, not just adjacent sides in the diagram. Label which sides correspond before setting up the proportion.',
  },
  {
    id: 26, tier: 'likely', name: 'Number Properties',
    know: 'Even/odd rules: even×odd=even, odd+odd=even, even+odd=odd. Divisibility rules (2, 3, 5, 9, 10). Factors vs. multiples. Prime factorization. Prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23...',
    trap: '1 is not prime. 2 is the only even prime. A number\'s factors include 1 and itself.',
  },

  // ── WORTH KNOWING ──────────────────────────
  {
    id: 27, tier: 'worth', name: 'Negative Exponents',
    know: 'x⁻ⁿ = 1/xⁿ. To eliminate a negative exponent, move the term to the other side of the fraction. (x/y)⁻² = (y/x)². All standard exponent rules still apply.',
    trap: 'A negative exponent does NOT make the base negative. x⁻² = 1/x², which is positive when x is real.',
  },
  {
    id: 28, tier: 'worth', name: 'Picking Numbers',
    know: 'When variables appear in the answer choices, pick a simple number for the variable, evaluate the question, then test each answer choice. Use easy numbers: 2, 5, 10, 100.',
    trap: 'Avoid 0 and 1 — they have special properties that can make multiple answers work. Pick numbers that keep arithmetic simple.',
  },
  {
    id: 29, tier: 'worth', name: 'Plug In Answers',
    know: 'For "what is x?" problems, try the answer choices — start with C (the middle value) and adjust. Works especially well for integer-answer problems.',
    trap: 'Always check the answer in the original problem, not a simplified version. And try all required checks — sometimes more than one value seems to work initially.',
  },
  {
    id: 30, tier: 'worth', name: 'Shaded Area',
    know: 'Classic: square with inscribed circle, or circle with inscribed shape. Find the area of the outer shape, subtract the inner shape. Identify the radius relationship from the given shape.',
    trap: 'The radius of an inscribed circle in a square equals half the side length. The radius of a circumscribed circle around a square equals half the diagonal.',
  },
  {
    id: 31, tier: 'worth', name: 'Triangle Opposite Side Rule',
    know: 'The largest side is opposite the largest angle. Sides and their opposite angles scale together. The triangle inequality: any two sides must sum to more than the third.',
    trap: 'Don\'t just compare adjacent sides and angles — identify which side is OPPOSITE which angle before drawing conclusions.',
  },
  {
    id: 32, tier: 'worth', name: 'Weird Shape Area',
    know: 'Decompose the shape into rectangles, triangles, or known shapes. Or use the "big minus small" approach: find the area of a containing shape and subtract what you don\'t need.',
    trap: 'Missing a region or double-counting an overlap. Draw it out and label each component before calculating.',
  },
  {
    id: 33, tier: 'worth', name: 'Periodic Function Graph',
    know: 'Amplitude = (max − min)/2. Period = horizontal length of one full cycle. For y = A·sin(Bx + C) + D: amplitude = |A|, period = 2π/B, vertical shift = D.',
    trap: 'The period is NOT 2π divided by the coefficient as-written unless the function is in standard form. Read directly from the graph when possible.',
  },
  {
    id: 34, tier: 'worth', name: 'Weighted Average',
    know: 'Each value multiplied by its weight, all summed, then divided by the total weight. Example: 30 students scored 80 and 20 scored 90 → (30×80 + 20×90)/50 = 84.',
    trap: 'The simple average of 80 and 90 is 85 — but with different group sizes, it\'s not 85. Always multiply each value by its weight before summing.',
  },
  {
    id: 35, tier: 'worth', name: 'Average Sum Trick',
    know: 'Total sum = mean × count. After adding a value: new total = new mean × new count. Subtract old total to find the new value. Works for any "what score is needed" problem.',
    trap: 'Use the NEW count (not the old one) when calculating the new target total.',
  },
  {
    id: 36, tier: 'worth', name: 'Composite Function',
    know: 'g(f(x)): first apply f to x, then apply g to that result. f(g(x)) is different — order matters. Always work inside-out.',
    trap: 'g(f(x)) ≠ f(g(x)) in general. Write out each step: find f(x) first, then substitute that result into g.',
  },
  {
    id: 37, tier: 'worth', name: 'Expected Value',
    know: 'E = Σ (value × probability) for each outcome. Multiply each possible outcome by its probability, then sum all products.',
    trap: 'Don\'t add the probabilities — multiply each value by its own probability, then add those products.',
  },
  {
    id: 38, tier: 'worth', name: 'Logarithms',
    know: 'logₐ(b) = c means aᶜ = b. Convert between log and exponential form. log(xy) = log x + log y. log(x/y) = log x − log y. log(xⁿ) = n·log x. log base 10 = "log"; base e = "ln".',
    trap: 'log(x + y) ≠ log x + log y. The product rule applies to multiplication inside the log, not addition.',
  },
  {
    id: 39, tier: 'worth', name: 'Matrices',
    know: 'Addition/subtraction: add/subtract corresponding entries (same dimensions required). Multiplication: (m×n)·(n×p) = (m×p). Multiply row by column, sum the products. A matrix product AB ≠ BA in general.',
    trap: 'Matrix multiplication is NOT element-by-element. Row × column: first row of A dotted with first column of B gives the (1,1) entry of the product.',
  },
  {
    id: 40, tier: 'worth', name: 'Median',
    know: 'Middle value when data is sorted. Even count: average the two middle values. Adding values beyond the current max/min doesn\'t change the median if the count changes symmetrically.',
    trap: 'Always re-sort the data after adding or removing values before identifying the median. The position of the median changes when n changes.',
  },
  {
    id: 41, tier: 'worth', name: 'Special Right Triangles',
    know: '45-45-90: sides in ratio 1:1:√2. 30-60-90: sides in ratio 1:√3:2 (short leg : long leg : hypotenuse). Memorize these — they eliminate the need for trig in many problems.',
    trap: 'In a 30-60-90 triangle, the side opposite 30° is the SHORT leg (not the hypotenuse). The hypotenuse is always twice the short leg.',
  },
  {
    id: 42, tier: 'worth', name: 'System of Equations',
    know: 'Substitution: solve one equation for one variable, substitute into the other. Elimination: multiply equations to create matching coefficients, then add or subtract to eliminate a variable.',
    trap: 'When multiplying an entire equation to prepare for elimination, multiply every term on both sides. Missing a term throws off the entire calculation.',
  },
  {
    id: 43, tier: 'worth', name: 'Use the Radius',
    know: 'When a circle is inscribed in or circumscribes another shape, the radius links the two shapes. Draw the radius to a tangent point or to a vertex to extract key lengths.',
    trap: 'A tangent line meets a circle at exactly one point and is perpendicular to the radius at that point. Use this 90° relationship to set up right triangles.',
  },
  {
    id: 44, tier: 'worth', name: 'Venn Diagram',
    know: 'Total = A + B − Both + Neither. "How many in both?" = A + B − Total (when neither = 0). Draw the Venn with two overlapping circles and fill in from the inside out.',
    trap: 'Adding A and B double-counts the overlap. Always subtract the intersection once. And don\'t forget the "neither" category if it\'s mentioned.',
  },
  {
    id: 45, tier: 'worth', name: 'Circle Equations',
    know: '(x−h)² + (y−k)² = r². Center at (h, k), radius = r. If not in standard form, complete the square for both x and y to convert.',
    trap: 'The signs in the equation are flipped: (x−3)² means the center is at x = +3, not −3. r² gives the radius squared — take the square root.',
  },
  {
    id: 46, tier: 'worth', name: 'Conjugates',
    know: 'To rationalize a denominator with a radical: multiply by the conjugate (same terms, opposite sign). For imaginary denominators: multiply numerator and denominator by the complex conjugate. Imaginary roots come in conjugate pairs: if a+bi is a root, so is a−bi.',
    trap: 'When multiplying complex conjugates (a+bi)(a−bi), the result is always real: a² + b². The middle terms cancel.',
  },
  {
    id: 47, tier: 'worth', name: 'Difference of Two Squares',
    know: 'a² − b² = (a+b)(a−b). Recognize it in both directions: factor 9x² − 16 = (3x+4)(3x−4). Also useful for rationalizing: multiply by the conjugate.',
    trap: 'Sum of two squares (a² + b²) does NOT factor over the reals. Only the difference factors this way.',
  },
  {
    id: 48, tier: 'worth', name: 'Given Points, Find Equation',
    know: 'Step 1: find slope using m = (y₂−y₁)/(x₂−x₁). Step 2: use point-slope form y−y₁ = m(x−x₁) with either point. Step 3: rearrange to slope-intercept if needed.',
    trap: 'Plugging a point into y = mx + b with the wrong slope first. Always find the slope before substituting a point.',
  },
  {
    id: 49, tier: 'worth', name: 'LCM',
    know: 'Least Common Multiple: smallest number divisible by all given numbers. Use prime factorization: take the highest power of each prime factor. Used for adding fractions and solving equations with multiple denominators.',
    trap: 'LCM ≠ product. LCM(4,6) = 12, not 24. Use prime factorization, don\'t just multiply.',
  },
  {
    id: 50, tier: 'worth', name: 'Law of Cosines',
    know: 'c² = a² + b² − 2ab·cos(C). Used when you have SAS (two sides + included angle) or SSS (all three sides). The ACT usually gives you the formula — just plug in correctly.',
    trap: 'Identify which angle C is: it must be OPPOSITE the side c you\'re solving for. Mismatching sides and angles gives a wrong answer.',
  },
  {
    id: 51, tier: 'worth', name: 'Linear Inequality',
    know: 'Solve like an equation, but flip the inequality sign when multiplying or dividing by a negative. Graph: dashed line for strict inequality (</>), solid for ≤/≥. Shade the region that satisfies the inequality.',
    trap: 'Forgetting to flip the sign when dividing by a negative. Test a point to verify the correct shaded region.',
  },
  {
    id: 52, tier: 'worth', name: 'Midpoint',
    know: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2). If given the midpoint and one endpoint, solve for the other: 2×midpoint − known endpoint.',
    trap: 'When finding a missing endpoint: double the midpoint coordinate and subtract the known endpoint. Don\'t just subtract or average arbitrarily.',
  },
  {
    id: 53, tier: 'worth', name: 'Multistep Conversion',
    know: 'Chain unit fractions together so units cancel step by step. Write each conversion as a fraction with the unwanted unit in the denominator. Always write units at every step.',
    trap: 'Skipping unit labels and then losing track of which unit is which. The unit fraction method prevents this if you write it out fully.',
  },
  {
    id: 54, tier: 'worth', name: 'Pythagorean Theorem',
    know: 'a² + b² = c² where c is the hypotenuse. Common triples: 3-4-5, 5-12-13, 8-15-17 (and multiples). Use for distances between points: √((x₂−x₁)² + (y₂−y₁)²).',
    trap: 'c is always the hypotenuse (longest side, opposite the right angle). Mixing up which side is c gives a wrong answer.',
  },
  {
    id: 55, tier: 'worth', name: 'Remainders',
    know: 'Simple: use modular arithmetic. Pattern-based: find the cycle and divide the position by the cycle length. The remainder tells you which element in the cycle to use.',
    trap: 'If the remainder is 0, the answer is the LAST item in the cycle, not the first. Always list out the full cycle before looking up position.',
  },
  {
    id: 56, tier: 'worth', name: 'Amplitude',
    know: 'Amplitude = (max value − min value) / 2. It measures the height from midline to peak (or trough). For y = A·sin(x), amplitude = |A|.',
    trap: 'Amplitude is always positive. Also don\'t confuse it with the period or the vertical shift.',
  },
  {
    id: 57, tier: 'worth', name: 'Arc Length',
    know: 'Arc length = (central angle / 360) × 2πr. For radians: arc length = r·θ. Set up a proportion between the angle and the full circle.',
    trap: 'Make sure the angle is in the same unit (degrees or radians) as your formula requires. Mixing degrees with a radian formula is the most common error.',
  },
  {
    id: 58, tier: 'worth', name: 'Binomial Expansion',
    know: '(a+b)² = a² + 2ab + b². (a+b)³ = a³ + 3a²b + 3ab² + b³. For larger powers, use Pascal\'s Triangle for coefficients. Or use the binomial theorem: Σ C(n,k)·aⁿ⁻ᵏ·bᵏ.',
    trap: '(a+b)² ≠ a² + b². The middle term 2ab is always present and always forgotten.',
  },
  {
    id: 59, tier: 'worth', name: 'Circle Wedge (Sector)',
    know: 'Sector area = (central angle / 360) × πr². Same proportion as arc length. Both use the fraction of the full circle.',
    trap: 'Using diameter instead of radius. And mixing up arc length (the curved edge) with sector area (the pie-slice region).',
  },
  {
    id: 60, tier: 'worth', name: 'Hyperbola',
    know: 'Standard form: x²/a² − y²/b² = 1 (opens left/right) or y²/a² − x²/b² = 1 (opens up/down). Recognize the subtraction sign between terms. Often solvable by plugging in values or reading the graph.',
    trap: 'Confusing with an ellipse (which uses addition). The minus sign is the key distinguisher.',
  },
  {
    id: 61, tier: 'worth', name: 'Identify Function from Graph',
    know: 'Linear: straight line. Quadratic: parabola. Exponential: rapid growth/decay, never touches the x-axis. Absolute value: V-shape. Look for key features: intercepts, asymptotes, vertex.',
    trap: 'Exponential and quadratic can look similar for small x-values. Check if the graph has a vertical asymptote (exponential) or passes through the x-axis (quadratic).',
  },
  {
    id: 62, tier: 'worth', name: 'Irrational Numbers',
    know: 'Irrational: non-terminating, non-repeating decimal (e.g. √2, π). Rational: any fraction of integers, including repeating decimals. Irrational + rational = irrational. Irrational × rational (≠0) = irrational.',
    trap: '√4 = 2 is rational, not irrational. Only square roots of non-perfect squares are irrational.',
  },
  {
    id: 63, tier: 'worth', name: 'Polynomial Remainder Theorem',
    know: 'If (x−a) is a factor of a polynomial p(x), then p(a) = 0. To find an unknown constant: set p(a) = 0 and solve. The remainder when dividing p(x) by (x−a) equals p(a).',
    trap: 'The factor (x−5) means you substitute x = +5, not −5. The sign flips from the factor form.',
  },

  // ── DID SHOW UP TWICE ──────────────────────
  {
    id: 64, tier: 'twice', name: 'Absolute Value Equation',
    know: '|expression| = k creates two equations: expression = k and expression = −k. Solve both. For inequalities: |x| < k → −k < x < k; |x| > k → x < −k or x > k.',
    trap: 'Forgetting the negative case. Both solutions must be checked in the original equation to rule out extraneous solutions.',
  },
  {
    id: 65, tier: 'twice', name: 'Algebra LCD',
    know: 'Find the LCM of all denominators. Multiply every term by the LCD to clear fractions. Then solve the resulting equation. Used when adding/subtracting algebraic fractions.',
    trap: 'Not multiplying every term (including those without fractions) by the LCD. Multiplying only some terms creates an imbalanced equation.',
  },
  {
    id: 66, tier: 'twice', name: 'Domain',
    know: 'Set of valid inputs (x-values). For fractions: denominator ≠ 0. For square roots: radicand ≥ 0. For logs: argument > 0. For most polynomials: all real numbers.',
    trap: 'Square roots require ≥ 0 (including 0), not > 0. Fractions require the denominator to be strictly ≠ 0.',
  },
  {
    id: 67, tier: 'twice', name: 'FOIL',
    know: 'First, Outer, Inner, Last. (a+b)(c+d) = ac + ad + bc + bd. Must be automatic — used constantly as a sub-step in factoring, quadratics, composite functions, and simplification.',
    trap: 'Only the middle terms (Outer + Inner) can combine. First and Last terms are never combined with them.',
  },
  {
    id: 68, tier: 'twice', name: 'Find Inverse Function',
    know: 'Swap x and y, then solve for y. The result is f⁻¹(x). Verify: f(f⁻¹(x)) = x. Graphically, the inverse is a reflection over the line y = x.',
    trap: 'The inverse is not 1/f(x). It\'s a new function found by swapping variables. Don\'t confuse multiplicative inverse (reciprocal) with functional inverse.',
  },
  {
    id: 69, tier: 'twice', name: 'Mixed Numbers',
    know: 'Convert to improper fractions before multiplying or dividing: 2½ = 5/2. For addition and subtraction, keep as mixed numbers and work with the fractional and whole parts separately, or convert.',
    trap: '2½ × 3 ≠ 6½. You must convert to 5/2 first: 5/2 × 3 = 15/2 = 7½. Never multiply a mixed number as-is.',
  },
  {
    id: 70, tier: 'twice', name: 'Permutation',
    know: 'Ordered arrangements. P(n,r) = n!/(n−r)!. "5 plants, 3 spots": P(5,3) = 5×4×3 = 60. Use when order matters. Use combination C(n,r) = n!/(r!(n−r)!) when order doesn\'t matter.',
    trap: 'Confusing permutation (ordered) with combination (unordered). "How many ways to arrange" → permutation. "How many ways to choose" → combination.',
  },
  {
    id: 71, tier: 'twice', name: 'Prime Numbers',
    know: 'Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. A prime has exactly two factors: 1 and itself. Often appears in probability or number theory questions.',
    trap: '1 is not prime. 2 is the only even prime. Always check divisibility by small primes (2, 3, 5, 7) when testing whether a number is prime.',
  },
  {
    id: 72, tier: 'twice', name: 'Scientific Notation',
    know: 'a × 10ⁿ where 1 ≤ a < 10. Moving decimal right decreases the exponent. To multiply: multiply the coefficients, add the exponents. To divide: divide the coefficients, subtract the exponents.',
    trap: 'After multiplying or dividing coefficients, the result might not be in proper scientific notation. Adjust: if you get 25 × 10³, rewrite as 2.5 × 10⁴.',
  },
  {
    id: 73, tier: 'twice', name: 'Time',
    know: '1 hour = 60 minutes = 3600 seconds. Time elapsed: subtract start from end, borrowing from larger units when needed. Watch for AM/PM and midnight/noon edge cases.',
    trap: 'When subtracting times: 3:15 to 5:05 is NOT 2:90. Borrow: 4:65 − 3:15 = 1:50. Always convert when the minutes would go negative.',
  },
  {
    id: 74, tier: 'twice', name: 'Value/Frequency Table',
    know: 'Mean: multiply each value by its frequency, sum the products, divide by total frequency. Median: build the cumulative frequency to find the middle position. Mode: highest frequency.',
    trap: 'Reading the table as if each row is one data point. Each value must be counted according to its frequency.',
  },
  {
    id: 75, tier: 'twice', name: 'Congruent Shapes',
    know: 'Congruent = same shape AND same size. All corresponding sides and angles are equal. Similar = same shape, proportional size. Congruent is a special case of similar where the scale factor is 1.',
    trap: 'Similar triangles with a ratio of 1:1 ARE congruent. But similar does not imply congruent in general — always check whether size is preserved.',
  },
]

export const tierMeta = {
  guaranteed: { label: 'Guaranteed', color: '#e24b4a', bg: '#2e1212' },
  likely:     { label: 'Very Likely', color: '#ef9f27', bg: '#2a1e00' },
  worth:      { label: 'Worth Knowing', color: '#4f8ef7', bg: '#1a2a4a' },
  twice:      { label: 'Showed Up Twice', color: '#a0a0ab', bg: '#2a2a2e' },
}
