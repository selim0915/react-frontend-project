import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ShellDiv, ShellLine, ShellWord } from '../pages/admin/admin.style';

interface ShellProps {
  /** 출력할 로그 라인 배열 */
  output: string[];
  /** 화면에 표시할 최대 로그 라인 수 (기본값: 100) */
  maxLines?: number;
  /** 검색 관련 설정 */
  searchData?: {
    /** 검색 키워드 */
    keyword?: string;
    /** 검색 결과 필터링 활성화 여부 */
    filter?: boolean;
    /** 검색 결과 하이라이트 활성화 여부 */
    highlight?: boolean;
  };
  /** 로그가 추가될 때 자동 스크롤 여부 */
  autoScroll?: boolean;
}

interface LogEntry {
  id: string;
  line: string;
  partInfo: { id: string; char: string; className: string }[];
}

export const trimAndLower = (str: string | undefined): string => str?.trim().toLowerCase() || '';

export const Shell: React.FC<ShellProps> = ({ output, searchData = {}, maxLines = 100, autoScroll = true }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [logBuffer, setLogBuffer] = useState<LogEntry[]>([]);
  const { keyword, filter, highlight } = searchData;

  // 검색어 최적화
  const searchWord = useMemo(() => trimAndLower(keyword), [keyword]);

  // 로그 추가시 설정
  useEffect(() => {
    setLogBuffer((prevBuffer) => {
      const newEntries = output.map((line, lineIdx) => {
        const lineId = `line-${Date.now()}-${lineIdx}`;

        // const splitWord = /[-:[\]/]+/;
        const regex = /(\s+)/g;
        const parts = line.split(regex);

        const partInfo = parts.map((char, partIdx) => {
          const className = '';
          return {
            id: `${lineId}-${partIdx}`,
            char,
            className,
          };
        });

        return { id: lineId, line, partInfo };
      });

      // 버퍼 크기 자르기
      const newBuffer = [...prevBuffer, ...newEntries];
      if (newBuffer.length > maxLines) {
        return newBuffer.slice(-maxLines);
      }
      return newBuffer;
    });
  }, [output, maxLines]);

  // 자동 스크롤 기능
  useEffect(() => {
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [autoScroll, logBuffer]);

  const render = (): React.ReactNode[] =>
    logBuffer.map((log) => (
      <ShellLine key={log.id} data-word={trimAndLower(log.line)} $keyword={searchWord} $filter={filter}>
        {log.partInfo.map((part) => (
          <ShellWord
            key={part.id}
            className={trimAndLower(part.className)}
            data-word={trimAndLower(part.char)}
            $keyword={searchWord}
            $highlight={highlight}
          >
            {part.char}
          </ShellWord>
        ))}
      </ShellLine>
    ));

  return <ShellDiv ref={outputRef}>{render()}</ShellDiv>;
};

export default Shell;
