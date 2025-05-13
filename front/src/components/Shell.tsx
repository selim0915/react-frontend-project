import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { ShellDiv, ShellLine, ShellWord } from '../pages/admin/admin.style';

interface ShellProps {
  /** 출력할 로그 라인 배열 */
  output: string[];
  /** 화면에 표시할 최대 로그 라인 수 (기본값: 100) */
  maxLines?: number;
  /** 검색 설정 */
  searchData?: {
    /** 검색 키워드 */
    keyword?: string;
    /** 필터링 여부 */
    filter?: boolean;
    /** 하이라이트 여부 */
    highlight?: boolean;
  };
  /** 로그가 추가시 자동 스크롤 여부 */
  autoScroll?: boolean;
}

interface Log {
  id: string;
  line: string;
}

// 문자열을 소문자로 변환하고 공백 제거하는 함수
export const trimAndLower = (str: string | undefined): string => str?.trim().toLowerCase() || '';

// 최대 라인 수 초과 시 오래된 로그 제거하는 함수
export const trimLogBuffer = <T,>(prev: T[], next: T[], maxLines: number): T[] => {
  const combined = [...prev, ...next];
  return combined.length > maxLines ? combined.slice(-maxLines) : combined;
};

export const Shell: React.FC<ShellProps> = ({ output, searchData = {}, maxLines = 100, autoScroll = true }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [logBuffer, setLogBuffer] = useState<Log[]>([]);
  const { keyword, filter, highlight } = searchData;

  // 검색어 최적화
  const searchWord = useMemo(() => trimAndLower(keyword), [keyword]);

  // 로그 수신시 버퍼 처리
  useEffect(() => {
    const timestamp = Date.now();

    const newEntries = output
      .flatMap((chunk) => chunk.split('\n'))
      .filter((line) => line.trim() !== '')
      .map((line, i) => ({
        id: `line-${timestamp}-${i}`,
        line,
      }));

    setLogBuffer((prev) => trimLogBuffer<Log>(prev, newEntries, maxLines));
  }, [output, maxLines]);

  // 자동 스크롤
  useEffect(() => {
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [autoScroll, logBuffer]);

  // 로그 출력
  const renderedLogs = useMemo(() => {
    console.log('start renderedLogs');

    return logBuffer.map((log) => {
      const { id, line } = log;
      const lineLower = trimAndLower(line);

      let content = line as React.ReactNode;

      if (searchWord && highlight) {
        const keywordIndex = lineLower.indexOf(searchWord);

        if (keywordIndex !== -1) {
          const before = line.slice(0, keywordIndex);
          const matched = line.slice(keywordIndex, keywordIndex + searchWord.length);
          const after = line.slice(keywordIndex + searchWord.length);
          const beforeLower = trimAndLower(before);
          const matchedLower = trimAndLower(matched);
          const afterLower = trimAndLower(after);

          content = (
            <>
              {before && <ShellWord data-word={beforeLower}>{before}</ShellWord>}
              <ShellWord data-word={matchedLower} $keyword={searchWord} $highlight={highlight}>
                {matched}
              </ShellWord>
              {after && <ShellWord data-word={afterLower}>{after}</ShellWord>}
            </>
          );
        }
      }

      return (
        <ShellLine key={id} data-word={lineLower} $keyword={searchWord} $filter={filter}>
          {content}
        </ShellLine>
      );
    });
  }, [logBuffer, searchWord, highlight, filter]);

  return <ShellDiv ref={outputRef}>{renderedLogs}</ShellDiv>;
};

export default Shell;
