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
    title="简单列表"
    dataSource={[1, 2, 3, 4, 5]}
    renderItem={(item) => (
      <RelationList.Item
        style={{ padding: '1rem', border: '1px solid fuchsia' }}
      >
        content {item}
      </RelationList.Item>
    )}
  />
);
