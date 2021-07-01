/**
 * title: 动态改变
 * desc: 添加或删除
 */

import React, { useState } from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => {
  const [data, setData] = useState<number[]>([1, 2]);

  const handleAdd = () => {
    setData((old) => [...old, parseInt(`${Math.random() * 100}`)]);
  };

  const handleRm = (idx: number) => {
    const newData = [...data];
    newData.splice(idx, 1);
    setData(newData);
  };

  return (
    <RelationList<typeof data[number]>
      title="动态改变"
      dataSource={data}
      footer={<button onClick={handleAdd}>add</button>}
      renderItem={(item, idx) => (
        <RelationList.Item
          style={{ padding: '1rem' }}
          actions={[<button onClick={() => handleRm(idx)}>rm</button>]}
        >
          content #{item}
        </RelationList.Item>
      )}
    />
  );
};
