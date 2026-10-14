'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexRendererProps {
    content: string;
    className?: string;
}

/**
 * Component to render text with LaTeX mathematical expressions
 * Supports:
 * - Inline math: $...$ or \(...\)
 * - Display/block math: $$...$$ or \[...\]
 */
export default function LatexRenderer({ content, className }: LatexRendererProps) {
    if (!content) return null;

    // Parse content and identify LaTeX blocks
    const parseLatex = (text: string) => {
        const parts: React.ReactNode[] = [];
        let currentIndex = 0;
        let key = 0;

        // Regular expressions for different LaTeX delimiters
        // Order matters: check display math before inline math
        const patterns = [
            { regex: /\$\$(.*?)\$\$/gs, type: 'block' as const },  // $$...$$
            { regex: /\\\[(.*?)\\\]/gs, type: 'block' as const },   // \[...\]
            { regex: /\$(.*?)\$/g, type: 'inline' as const },       // $...$
            { regex: /\\\((.*?)\\\)/g, type: 'inline' as const },   // \(...\)
        ];

        // Create a combined regex to find all LaTeX expressions
        const findNextMatch = (startPos: number): { match: RegExpMatchArray; type: 'inline' | 'block' } | null => {
            let earliest: { match: RegExpMatchArray; type: 'inline' | 'block'; index: number } | null = null;

            for (const { regex, type } of patterns) {
                regex.lastIndex = startPos;
                const match = regex.exec(text);
                if (match && (!earliest || match.index < earliest.index)) {
                    earliest = { match, type, index: match.index };
                }
            }

            return earliest ? { match: earliest.match, type: earliest.type } : null;
        };

        while (currentIndex < text.length) {
            const next = findNextMatch(currentIndex);

            if (!next) {
                // No more LaTeX, add remaining text
                if (currentIndex < text.length) {
                    parts.push(
                        <span key={key++}>{text.substring(currentIndex)}</span>
                    );
                }
                break;
            }

            const { match, type } = next;
            const matchStart = match.index!;
            const matchEnd = matchStart + match[0].length;

            // Add text before the LaTeX
            if (matchStart > currentIndex) {
                parts.push(
                    <span key={key++}>{text.substring(currentIndex, matchStart)}</span>
                );
            }

            // Add the LaTeX expression
            const latexContent = match[1].trim();
            try {
                if (type === 'block') {
                    parts.push(
                        <span key={key++} style={{ display: 'block', margin: '10px 0' }}>
                            <BlockMath math={latexContent} />
                        </span>
                    );
                } else {
                    parts.push(
                        <span key={key++}>
                            <InlineMath math={latexContent} />
                        </span>
                    );
                }
            } catch (error) {
                // If LaTeX parsing fails, show the raw content
                console.error('LaTeX parsing error:', error);
                parts.push(
                    <span key={key++} style={{ color: 'red' }}>
                        {match[0]}
                    </span>
                );
            }

            currentIndex = matchEnd;
        }

        return parts;
    };

    const renderedContent = parseLatex(content);

    return (
        <span className={className}>
            {renderedContent}
        </span>
    );
}

