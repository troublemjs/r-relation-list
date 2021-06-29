/**
 * title: 关系型嵌套列表
 * desc: 与或关系嵌套使用案例
 */

import React, { useState } from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

interface IItem {
  label: string;
  value: string;
}

export default () => {
  const [data, setData] = useState<IItem[][]>([
    [
      {
        label: 'label',
        value: 'val',
      },
    ],
    [
      {
        label: 'label',
        value: 'val',
      },
    ],
  ]);

  const handleAddGroup = () => {
    const newData = [...data];
    newData.push([
      {
        label: 'label',
        value: 'val',
      },
    ]);
    console.log(newData);

    setData(newData);
  };
  const handleAddItem = (group: IItem[], idx: number) => {
    const newData = [...data];
    const newGroup = [...group];
    newGroup.push({ label: 'cellLabel', value: 'cellValue' });
    newData.splice(idx, 1, newGroup);

    setData(newData);
  };

  const handleRemove = (item: IItem, idx: number, groupIdx: number) => {
    const newData = [...data];
    const newGroup = [...newData[groupIdx]];
    if (newGroup.length === 1) {
      newData.splice(groupIdx, 1);
    } else {
      newGroup.splice(idx, 1);
      newData[groupIdx] = newGroup;
    }

    setData(newData);
  };

  return (
    <>
      <RelationList<IItem[]>
        title="且"
        dataSource={data}
        renderItem={(group, groupIdx) => (
          <RelationList<IItem>
            title={
              <>
                或{' '}
                <button onClick={() => handleAddItem(group, groupIdx)}>
                  +
                </button>
              </>
            }
            dataSource={group}
            renderItem={(item, idx) => (
              <>
                <input placeholder="输入Label" />
                <input placeholder="输入Value" />
                <button onClick={() => handleRemove(item, idx, groupIdx)}>
                  -
                </button>
              </>
            )}
          />
        )}
      />
      <br />
      <button onClick={handleAddGroup}>新增一个或条件</button>
    </>
  );
};
