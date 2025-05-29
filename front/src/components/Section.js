/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button, Meter, Stack, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import React from 'react';
import { timeFormatter } from '../utils/utils';

export const Section = ({ id, est, act, title, isDiscuss, removeSection, startDiscuss, stopDiscuss }) => {
  const initTime = est * 60;
  const remainingTime = () => initTime - act;

  return (
    <tr>
      <td className="center">
        <Text color="gray" style={{ marginRight: 5 }}>
          {timeFormatter(initTime)}
        </Text>
      </td>
      <td className="center">
        <Text size="large" color={act <= 0 ? 'lightgray' : '#444'}>
          {timeFormatter(act)}
        </Text>
      </td>
      <td style={{ padding: 0 }}>
        <Stack>
          <Text
            size="large"
            style={{
              margin: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Text>
          <Meter
            values={[
              {
                value: act,
                color: remainingTime() < 0 ? 'red' : null,
              },
            ]}
            style={{ width: '100%', marginTop: -10 }}
            max={initTime}
            background="rgba(0,0,0,0)"
            thickness="large"
            opacity={0.2}
          />
        </Stack>
      </td>
      <td className="center">
        <Button
          plain
          size="small"
          color="#ccc"
          style={isDiscuss ? { color: 'black', animation: 'blink 1s linear infinite' } : null}
          onClick={() => (isDiscuss ? stopDiscuss(id) : startDiscuss(id))}
          label="Discuss"
        />
        <Button
          size="small"
          icon={<Trash size="small" color="gray" />}
          style={{ marginLeft: 14 }}
          onClick={() => removeSection(id)}
        />
      </td>
    </tr>
  );
};

export default Section;
