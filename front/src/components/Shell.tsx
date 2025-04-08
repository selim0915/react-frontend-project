import React, { useEffect, useMemo, useRef } from 'react';
import { ShellDiv, ShellLine, ShellWord } from '../pages/admin/admin.style';

interface ShellProps {
  output: string[];
  searchData: {
    keyword: string;
    filter: boolean;
    highlight: boolean;
  };
  maxLines?: number;
}

const Shell: React.FC<ShellProps> = ({ output, searchData, maxLines = 100 }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const { keyword, filter, highlight } = searchData;

  const visibleOutput = useMemo(() => {
    return output.slice(-maxLines);
  }, [output, maxLines]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [visibleOutput]);

  const render = (): React.ReactNode[] => {
    const searchWord = keyword.trim().toLowerCase();

    return visibleOutput.map((line, idx) => {
      const lineId = `${line}-${idx}`;
      const isMatched = line.toLowerCase().includes(searchWord);

      if (
        // keyword 값이 없는 경우
        !searchWord ||
        // filter, highlight 모두 비활성화된 경우
        (!filter && !highlight) ||
        // highlight만 활성화되어 있고, keyword와 매칭되는 텍스트가 없는 경우
        (!filter && highlight && !isMatched)
      ) {
        return <ShellLine key={lineId}>{line}</ShellLine>;
      }

      const regex = new RegExp(`(${searchWord})`, 'gi');
      const parts = line.split(regex);

      return (
        <ShellLine key={lineId} className={!isMatched && filter ? 'hidden' : ''}>
          {parts.map((v, i) => {
            const vId = `${lineId}-${i}`;

            return v.toLowerCase() === searchWord ? (
              <ShellWord key={vId} className={isMatched ? 'highlight' : ''}>
                {v}
              </ShellWord>
            ) : (
              <React.Fragment key={vId}>{v}</React.Fragment>
            );
          })}
        </ShellLine>
      );
    });
  };

  return <ShellDiv ref={outputRef}>{render()}</ShellDiv>;
};

export default Shell;
