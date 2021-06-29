/**
 * title: 代码演示
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';

export default () => (
  <RelationList<number>
    title="标题"
    header={
      <div>
        <strong>h4 header</strong>
      </div>
    }
    footer={<div>footer</div>}
    bordered={true}
    dataSource={[1, 2, 3, 4, 5]}
    renderItem={(item) => <RelationList.Item>{item + 1}</RelationList.Item>}
  >
    <div
      style={{
        background: 'green',
        color: 'white',
        padding: '1em',
        margin: '1em',
      }}
    >
      inner children
    </div>
  </RelationList>
);
