/**
 * title: 没有数据时显示
 * desc: dataSource 为空且 children 时显示 empty
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => (
  <RelationList
    title="title"
    dataSource={[]}
    empty={
      <div style={{ background: 'yellow', padding: '3rem 6rem' }}>暂无数据</div>
    }
  />
);
