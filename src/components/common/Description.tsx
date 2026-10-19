import { cn } from '../../lib/cn';

interface Props {
  text: string;
  className?: string;
}

type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] };

const BULLET = /^\s*[•*\-–]\s+/;

/** Renders plain text; lines starting with •, -, * or – become a styled list. */
export const Description = ({ text, className }: Props) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const blocks: Block[] = [];
  for (const line of lines) {
    if (BULLET.test(line)) {
      const item = line.replace(BULLET, '');
      const last = blocks[blocks.length - 1];
      if (last?.type === 'ul') last.items.push(item);
      else blocks.push({ type: 'ul', items: [item] });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }

  return (
    <div className={cn('space-y-3 text-sm leading-relaxed text-secondary md:text-[15px]', className)}>
      {blocks.map((block, index) =>
        block.type === 'p' ? (
          <p key={index} className="text-pretty">
            {block.text}
          </p>
        ) : (
          <ul key={index} className="space-y-2">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-secondary/60" />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
};