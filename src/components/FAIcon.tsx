import React from 'react';

export default function FAIcon({ icon, style, onClick }: { icon: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: `<i class="${icon}"></i>` }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, ...style }}
      onClick={onClick}
    />
  );
}
