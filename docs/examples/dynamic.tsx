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
    setData((old) => [...old, old[old.length - 1] + 1]);
  };

  const handleRm = (idx: number) => {
    const newData = [...data];
    newData.splice(idx, 1);
    setData(newData);
  };

  return (
    <>
      <RelationList<number>
        title="当前关系标题"
        dataSource={data}
        renderItem={(item, idx) => (
          <div>
            {item} <button onClick={() => handleRm(idx)}>rm</button>
          </div>
        )}
      />
      <button onClick={handleAdd}>add</button>
    </>
  );
};
