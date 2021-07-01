/**
 * desc: 关系线跟随子元素高度自适应
 */

import React, { ChangeEvent, useState } from 'react';
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

    setData(newData);
  };
  const handleAddItem = (group: IItem[], idx: number) => {
    const newData = [...data];
    const newGroup = [...group];
    newGroup.push({ height: 60 });
    newData.splice(idx, 1, newGroup);

    setData(newData);
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
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
    <RelationList<IItem[]>
      title="总标题"
      footer={<button onClick={handleAddGroup}>新增一个高度80的子组</button>}
      bordered={false}
      split={false}
      dataSource={data}
      renderItem={(group, groupIdx) => (
        <RelationList<IItem>
          style={{ borderColor: 'cyan' }}
          title={
            <>
              子标题
              <button onClick={() => handleAddItem(group, groupIdx)}>+</button>
            </>
          }
          dataSource={group}
          renderItem={(item, idx) => (
            <RelationList.Item>
              <div
                style={{
                  height: item.height,
                  border: '1px solid red',
                  padding: '2rem',
                }}
              >
                content {idx}
              </div>
              <input
                type="range"
                placeholder="改变高度"
                min={20}
                max={400}
                defaultValue={item.height}
                onChange={(e) => onChange(e, idx, groupIdx)}
              />
            </RelationList.Item>
          )}
        />
      )}
    />
  );
};
