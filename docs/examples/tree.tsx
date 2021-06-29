/**
 * title: 多层嵌套使用
 * desc: renderItem 为 RelationList 情况
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => (
  <RelationList<number>
    title="当前关系标题"
    dataSource={[1, 2]}
    renderItem={(item) => (
      <RelationList<number>
        title="子标题"
        dataSource={[1, 2, 3, 4, 5]}
        renderItem={(item) => <div>{item + 1}</div>}
      />
    )}
  />
);
