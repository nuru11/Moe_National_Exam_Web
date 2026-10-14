# LaTeX Support Guide

This application supports LaTeX mathematical expressions in questions, choices, and explanations.

## Supported Syntax

### Inline Math
Use inline math for mathematical expressions within text:

- **Dollar signs**: `$x^2 + y^2 = z^2$` renders as: $x^2 + y^2 = z^2$
- **Parentheses**: `\(E = mc^2\)` renders as: \(E = mc^2\)

### Display/Block Math
Use display math for standalone equations:

- **Double dollar signs**: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`
- **Square brackets**: `\[\sum_{i=1}^n i = \frac{n(n+1)}{2}\]`

## Examples

### Question with LaTeX
```
What is the solution to the quadratic equation $ax^2 + bx + c = 0$?

The quadratic formula is:
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

### Choice with LaTeX
```
A) $x = \frac{-b}{2a}$
B) $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
C) $x = \frac{b^2 - 4ac}{2a}$
D) None of the above
```

### Common LaTeX Commands

#### Greek Letters
- `\alpha, \beta, \gamma, \delta` → α, β, γ, δ
- `\pi, \theta, \omega` → π, θ, ω

#### Superscripts and Subscripts
- `x^2` → x²
- `x_1` → x₁
- `x^{2y}` → x^(2y)
- `x_{i+1}` → x_(i+1)

#### Fractions
- `\frac{a}{b}` → a/b
- `\frac{x^2 + 1}{x - 1}` → (x² + 1)/(x - 1)

#### Square Roots
- `\sqrt{x}` → √x
- `\sqrt[3]{x}` → ³√x

#### Summation and Integration
- `\sum_{i=1}^{n}` → Σ from i=1 to n
- `\int_0^1` → ∫ from 0 to 1
- `\prod_{i=1}^{n}` → Π from i=1 to n

#### Matrices
```
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
```

#### Common Symbols
- `\leq, \geq` → ≤, ≥
- `\neq` → ≠
- `\approx` → ≈
- `\infty` → ∞
- `\times, \div` → ×, ÷
- `\pm, \mp` → ±, ∓

## Implementation

The LaTeX rendering is powered by:
- **KaTeX**: A fast math typesetting library
- **react-katex**: React components for KaTeX integration

The `LatexRenderer` component automatically parses text and renders any LaTeX expressions it finds.

## Tips

1. Always test your LaTeX expressions before adding them to questions
2. Use proper spacing around LaTeX delimiters
3. Escape special characters if needed
4. For complex equations, prefer display math ($$...$$)
5. Keep inline math short for better readability

## Error Handling

If a LaTeX expression cannot be parsed, it will be displayed in red color with the raw LaTeX code visible, making it easy to identify and fix syntax errors.

