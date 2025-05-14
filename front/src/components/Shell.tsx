/* eslint-disable import/no-extraneous-dependencies */
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ShellRow, ShellWord, ShellWrap, VirtualizerList } from '../pages/admin/admin.style';

interface ShellProps {
  /** 출력할 로그 배열 */
  output: string[];
  /** 버퍼에 저장할 최대 로그 배열 크기 (기본값: 1000) */
  maxRow?: number;
  /** 뷰포트 안에 보이는 요소 외에 추가로 렌더링할 항목 수 (기본값: 5) */
  overscan?: number;
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
export const trimLogBuffer = <T,>(prev: T[], next: T[], maxRow: number): T[] => {
  const combined = [...prev, ...next];
  return combined.length > maxRow ? combined.slice(-maxRow) : combined;
};

// Shell Component
export const Shell: React.FC<ShellProps> = ({
  output,
  maxRow = 1000,
  overscan = 5,
  searchData = {},
  autoScroll = true,
}) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [logBuffer, setLogBuffer] = useState<Log[]>([]);

  // 검색어 설정
  const { keyword, filter, highlight } = searchData;
  const searchWord = useMemo(() => trimAndLower(keyword), [keyword]);

  // 가상화 설정
  const rowVirtualizer = useVirtualizer({
    count: logBuffer.length,
    getScrollElement: () => outputRef.current,
    estimateSize: () => 30,
    overscan,
  });

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

    setLogBuffer((prev) => trimLogBuffer(prev, newEntries, maxRow));
  }, [output, maxRow]);

  // 자동 스크롤
  useEffect(() => {
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [autoScroll, logBuffer, rowVirtualizer]);

  // 로그 출력
  const renderedLogs = rowVirtualizer.getVirtualItems().map((virtualRow) => {
    const log = logBuffer[virtualRow.index];
    const { id, line } = log;

    let content: React.ReactNode = line;

    const lineLower = trimAndLower(line);
    const keywordIndex = lineLower.indexOf(searchWord);
    const isMatch = searchWord && keywordIndex !== -1;

    const isHidden = !isMatch && filter;

    if (highlight && isMatch) {
      const before = line.slice(0, keywordIndex);
      const matched = line.slice(keywordIndex, keywordIndex + searchWord.length);
      const after = line.slice(keywordIndex + searchWord.length);

      content = (
        <>
          {before}
          <ShellWord className="highlight">{matched}</ShellWord>
          {after}
        </>
      );
    }

    return (
      <ShellRow
        key={id}
        ref={rowVirtualizer.measureElement}
        data-index={virtualRow.index}
        className={isHidden ? 'hidden' : undefined}
        style={{ transform: `translateY(${virtualRow.start}px)` }}
      >
        {content}
      </ShellRow>
    );
  });

  return (
    <ShellWrap ref={outputRef}>
      <VirtualizerList height={`${rowVirtualizer.getTotalSize()}px`}>{renderedLogs}</VirtualizerList>
    </ShellWrap>
  );
};

export default Shell;
