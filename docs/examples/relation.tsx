/**
 * title: 关系型二维数组嵌套
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
    <RelationList<IItem[]>
      title="且"
      dataSource={data}
      header={<button onClick={handleAddGroup}>新增一个或条件</button>}
      renderItem={(group, groupIdx) => (
        <RelationList<IItem>
          title={
            <>
              或{' '}
              <button onClick={() => handleAddItem(group, groupIdx)}>+</button>
            </>
          }
          dataSource={group}
          renderItem={(item, idx) => (
            <RelationList.Item
              actions={[
                <button onClick={() => handleRemove(item, idx, groupIdx)}>
                  -
                </button>,
              ]}
              extra={
                <em>
                  额外内容 #{groupIdx}-{idx}
                </em>
              }
            >
              <input placeholder="输入Label" />
              <input placeholder="输入Value" />
            </RelationList.Item>
          )}
        />
      )}
    />
  );
};
