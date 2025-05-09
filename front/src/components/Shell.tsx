import React, { useEffect, useRef, useState } from 'react';
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
  /** 로그가가 추가될 때 자동 스크롤 여부 */
  autoScroll?: boolean;
}

const Shell: React.FC<ShellProps> = ({ output, searchData = {}, maxLines = 100, autoScroll = true }) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [logBuffer, setLogBuffer] = useState<string[]>([]);
  const { keyword, filter, highlight } = searchData;

  // const getOutPutSetting = () => {};

  // 새로운 로그 추가시
  useEffect(() => {
    setLogBuffer((prevBuffer) => {
      const newBuffer = [...prevBuffer, ...output];
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

  const render = (): React.ReactNode[] => {
    const searchWord = keyword?.trim().toLowerCase() || '';

    return logBuffer.map((line, idx) => {
      const lineId = `${line}-${idx}`;

      // includes() 사용 안하기.
      // const isMatched = line.toLowerCase().includes(searchWord);

      // if (
      //   // keyword 값이 없는 경우
      //   !searchWord ||
      //   // filter, highlight 모두 비활성화된 경우
      //   (!filter && !highlight) ||
      //   // highlight만 활성화되어 있고, keyword와 매칭되는 텍스트가 없는 경우
      //   (!filter && highlight && !isMatched)
      // ) {
      //   return <ShellLine key={lineId}>{line}</ShellLine>;
      // }

      // 공백기준으로 단어 분리
      const regex = /(\s+)/;
      // const regex = new RegExp(`(${searchWord})`, 'gi');
      // const parts = line.split(regex);
      const parts = line.split(regex);

      return (
        // 필터링을 개행라인 기준으로
        <ShellLine key={lineId} className={line} $keyword={searchWord} $filter={filter}>
          {parts.map((v, i) => {
            const vId = `${lineId}-${i}`;

            return v !== ' ' ? (
              <ShellWord key={vId} className={v.trim().toLowerCase()} $keyword={searchWord} $highlight={highlight}>
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
