import React from 'react';

interface MarkdownContentProps {
  content: string;
}

// This component uses a simple method of rendering text that might contain markdown-like syntax.
// It splits by newlines and wraps paragraphs in <p> tags. It also handles simple bolding.
// For a full markdown implementation, a library like 'react-markdown' would be used.
export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none prose-p:my-3 prose-headings:text-gray-200 prose-strong:text-gray-100">
      {paragraphs.map((p, index) => (
        <p key={index}>{renderWithBold(p)}</p>
      ))}
    </div>
  );
};
