/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 * transform: true
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => (
  <RelationList<number>
    title="当前关系标题"
    dataSource={[1, 2, 3, 4, 5]}
    renderItem={(item) => <div>{item + 1}</div>}
  />
);
