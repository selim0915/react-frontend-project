/* eslint-disable import/no-extraneous-dependencies */
import { Box, Button, Clock, Header, Select, Text, TextInput } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

type Section = {
  title: string;
  est: number;
  isDiscuss: boolean;
  act: number;
};

const DefaultEst = 5;

const Schedule: React.FC = () => {
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [title, updateTitle] = useState('');
  const [est, updateEst] = useState(DefaultEst);

  // 반복 타이머로 act 증가
  useEffect(() => {
    const interval = setInterval(() => {
      setSectionList(prev =>
        prev.map(section =>
          section.isDiscuss ? { ...section, act: section.act + 1 } : section
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addSection = (_title: string, _est: number) => {
    setSectionList([
      ...sectionList,
      { title: _title, est: _est, isDiscuss: false, act: 0 },
    ]);
    updateTitle('');
    updateEst(DefaultEst);
  };

  const startDiscuss = (index: number) => {
    const updated = [...sectionList];
    updated[index].isDiscuss = true;
    setSectionList(updated);
  };

  const stopDiscuss = (index: number) => {
    const updated = [...sectionList];
    updated[index].isDiscuss = false;
    setSectionList(updated);
  };

  const removeSection = (index: number) => {
    const updated = sectionList.filter((_, i) => i !== index);
    setSectionList(updated);
  };

  return (
    <Box style={{ padding: 20 }
    }>
      <Header pad="xsmall" align="baseline" style={{ marginBottom: 40 }}>
        <Box style={{ width: 200 }}>
          <Clock type="digital" />
        </Box>
        < Box basis="full" >
          <TextInput
            value={title}
            placeholder="논의 주제"
            onChange={e => updateTitle(e.target.value)}
          />
        </Box>
        < Box basis="1/4" >
          <Select
            options={[1, 5, 10, 15, 20, 25, 30, 40]}
            value={est}
            onChange={({ option }) => updateEst(Number(option))}
          />
        </Box>
        < Box align="end" style={{ width: 60, paddingTop: 5 }}>
          <Button icon={
            <Add />} onClick={() => addSection(title, est)} />
        </Box>
      </Header>

      {
        sectionList.map((section, index) => {
          const id = section.act + index;

          return (
            <Box key={id} direction="row" justify="between" pad="xsmall" border={{ side: 'bottom' }}>
              <Text>{section.title}({section.act}s) </Text>
              < Box direction="row" gap="small" >
                {
                  section.isDiscuss ? (
                    <Button label="Stop" onClick={() => stopDiscuss(index)
                    } />
                  ) : (
                    <Button label="Start" onClick={() => startDiscuss(index)
                    } />
                  )}
                <Button label="Remove" onClick={() => removeSection(index)} />
              </Box>
            </Box>
          )
        })}
    </Box>
  );
};

export default Schedule;
