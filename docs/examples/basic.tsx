/**
 * title: 基础 RelationList
 * desc: 演示 RelationList 组件的基础示例
 */

import React from 'react';
import RelationList from 'r-relation-list';

import '../../assets/index.less';
import './basic.less';

const dataSource = [1, 2, 3, 4, 5];

export default () => (
  <RelationList<typeof dataSource[number]>
    className="demo-basic"
    title="标题"
    header={
      <div className="header">
        <strong>h4 header</strong>
      </div>
    }
    footer={<div>footer</div>}
    dataSource={dataSource}
    // split={false}
    renderItem={(item) => (
      <RelationList.Item
        className="item"
        actions={[
          <a key="list-loadmore-edit">edit</a>,
          <a key="list-loadmore-more">more</a>,
        ]}
        extra={<button>extra</button>}
      >
        <div className="item-content">content {item}</div>
      </RelationList.Item>
    )}
  />
);
