/**
 * title: 单子集
 * desc: 只有一个子集时
 * transform: true
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => (
  <RelationList<number>
    title="当前关系标题"
    dataSource={[111]}
    renderItem={(item) => <div>{item + 1}</div>}
  />
);
