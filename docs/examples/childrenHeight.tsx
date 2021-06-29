/**
 * title: 关系型嵌套列表
 * desc: 与或关系嵌套使用案例
 */

import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

interface IItem {
  height: number;
}

export default () => {
  const [data, setData] = useState<IItem[][]>([
    [{ height: 40 }],
    [{ height: 130 }],
  ]);

  const handleAddGroup = () => {
    const newData = [...data];
    newData.push([
      {
        height: 80,
      },
    ]);
    console.log(newData);

    setData(newData);
  };
  const handleAddItem = (group: IItem[], idx: number) => {
    const newData = [...data];
    const newGroup = [...group];
    newGroup.push({ height: 60 });
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

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: IItem,
    idx: number,
    groupIdx: number,
  ) => {
    const newData = [...data];
    const newGroup = [...newData[groupIdx]];

    newGroup[idx].height = +e.currentTarget.value;
    newData[groupIdx] = newGroup;

    setData(newData);
  };

  return (
    <>
      <RelationList<IItem[]>
        title="总标题"
        dataSource={data}
        renderItem={(group, groupIdx) => (
          <RelationList<IItem>
            title={
              <>
                子组标题{' '}
                <button onClick={() => handleAddItem(group, groupIdx)}>
                  +
                </button>
              </>
            }
            dataSource={group}
            renderItem={(item, idx) => (
              <>
                <div style={{ height: item.height, border: '1px solid red' }}>
                  content {idx}
                </div>
                <input
                  type="range"
                  placeholder="改变高度"
                  min={1}
                  max={300}
                  defaultValue={item.height}
                  onChange={(e) => onChange(e, item, idx, groupIdx)}
                />
              </>
            )}
          />
        )}
      />
      <br />
      <button onClick={handleAddGroup}>新增一个高度80的子组</button>
    </>
  );
};
