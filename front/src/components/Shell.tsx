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

// 문자열을 소문자로 변환하고 공백 제거하는 함수
export const trimAndLower = (str: string | undefined): string => str?.trim().toLowerCase() || '';

// 최대 라인 수 초과 시 오래된 로그 제거하는 함수
export const trimLogBuffer = <T,>(prev: T[], next: T[], maxRow: number): T[] => {
  const combined = [...prev, ...next];
  return combined.length > maxRow ? combined.slice(-maxRow) : combined;
};

// 검색어 위치 확인하는 함수
export const getMatchedIndex = (line: string, word: string): number => trimAndLower(line).indexOf(word);

// Shell Component
export const Shell: React.FC<ShellProps> = ({ output, maxRow = 1000, overscan = 5, searchData, autoScroll = true }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [logBuffer, setLogBuffer] = useState<string[]>([]);

  // 검색어 설정
  const { keyword = '', filter = false, highlight = false } = searchData || {};
  const searchWord = useMemo(() => trimAndLower(keyword), [keyword]);

  // 로그 수신시 버퍼 처리
  useEffect(() => {
    const newEntries = output.flatMap((chunk) => chunk.split('\n')).filter((line) => line.trim() !== '');

    setLogBuffer((prev) => trimLogBuffer(prev, newEntries, maxRow));
  }, [output, maxRow]);

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: logBuffer.length,
    getScrollElement: () => outputRef.current,
    estimateSize: () => 20,
    overscan,
  });

  // 자동 스크롤
  useEffect(() => {
    if (!autoScroll || !outputRef.current || logBuffer.length === 0) return;
    const lastIndex = logBuffer.length - 1;

    requestAnimationFrame(() => {
      rowVirtualizer.scrollToIndex(lastIndex, { align: 'end' });
    });
  }, [autoScroll, logBuffer.length, rowVirtualizer]);

  // 단어 내부 하이라이팅
  const getHighlightedContent = (row: string, word: string, matchIndex: number): React.ReactNode => {
    const before = row.slice(0, matchIndex);
    const matched = row.slice(matchIndex, matchIndex + word.length);
    const after = row.slice(matchIndex + word.length);

    return (
      <>
        {before}
        <ShellWord className="matched">{matched}</ShellWord>
        {after}
      </>
    );
  };

  // 로그 뷰어 출력
  const renderedLogs = rowVirtualizer.getVirtualItems().map((virtualRow) => {
    const log = logBuffer[virtualRow.index];

    let className = ['log-show'];
    let content: React.ReactNode = log;

    if (searchWord) {
      const keywordIndex = getMatchedIndex(log, searchWord);

      if (filter && keywordIndex === -1) {
        className = ['log-hidden'];
      } else if (highlight && keywordIndex !== -1) {
        className.push('log-highlight');
        content = getHighlightedContent(log, searchWord, keywordIndex);
      }
    }

    return (
      <ShellRow
        key={virtualRow.index}
        ref={rowVirtualizer.measureElement}
        data-index={virtualRow.index}
        className={className.join(' ')}
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
