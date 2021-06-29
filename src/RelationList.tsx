import React, { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Item from './Item';

const EMPTY_DATA: never[] = [];

export interface RelationListProps<T> {
  renderItem?: (record: T, index: number) => React.ReactNode;
  title?: React.ReactNode;
  dataSource?: T[];
  rowKey?: ((item: T) => string) | string;
  empty?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  bordered?: boolean;
  /** 是否展示分割线 */
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
const RelationList = <RecordType extends unknown>(
  props: RelationListProps<RecordType>,
) => {
  const {
    prefixCls,
    title,
    renderItem,
    dataSource,
    empty,
    className,
    rowKey,
    bordered,
    split,
    header,
    footer,
    children,
    ...restProps
  } = props;
  const mergedData = dataSource || EMPTY_DATA;
  const ulRef = useRef<HTMLUListElement>(null);
  const [contentLineWidth, setContentLineWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const ulNode = ulRef.current;
    const ulHeight = ulNode?.clientHeight ?? 0;
    const heithg0th = ulNode?.firstElementChild?.clientHeight ?? 0;

    const contentLineHeight = ulHeight - heithg0th;
    console.log(contentLineHeight);

    setContentLineWidth(contentLineHeight);
  }, [mergedData]);

  const keys: { [key: string]: string } = {};

  const renderInnerItem = (item: RecordType, idx: number) => {
    if (!renderItem) return null;

    let key;
    if (typeof rowKey === 'function') {
      key = rowKey!(item);
    } else if (typeof rowKey === 'string') {
      key = rowKey;
    } else {
      key = (item as any).key;
    }

    if (!key) {
      key = `list-item-${idx}`;
    }
    keys[idx] = key;

    return renderItem(item, idx);
  };
  // if (mergedData.length === 0) return empty;

  let childrenContent: React.ReactNode;
  if (mergedData.length > 0) {
    const items = mergedData.map(renderInnerItem);
    const newItems = React.Children.map(items, (child, idx) => (
      <li key={keys[idx]} className={`${prefixCls}-item-wrap`}>
        <div className={`${prefixCls}-item-prefix-line`} />
        {child}
      </li>
    ));
    childrenContent = (
      <ul ref={ulRef} className={`${prefixCls}-items`}>
        {newItems}
      </ul>
    );
  }

  const shouldContent = Boolean(header || footer);
  const Content = shouldContent ? 'div' : React.Fragment;

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-content`]: !shouldContent,
    },
    className,
  );

  return (
    <div className={classString} {...restProps}>
      {header && <div className={`${prefixCls}-header`}>{header}</div>}
      <Content className={`${prefixCls}-content`}>
        <span className={`${prefixCls}-title`}>{title}</span>
        {childrenContent}
        {children}
      </Content>
      {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      {/* <div
        className={`${prefixCls}-parent-line`}
        style={{ height: firstHeight }}
      /> */}
      {/* <ul ref={ulRef} className={`${prefixCls}-content`}> */}
      {/* {mergedData?.map((item, idx) => (
          <li key={idx} className={`${prefixCls}-item`}>
            <div className={`${prefixCls}-item-vertical-line`} />
            {renderItem?.(item, idx) ?? `${item}`}
          </li>
        ))} */}
      {/* </ul> */}
    </div>
  );
};

RelationList.Item = Item;

RelationList.defaultProps = {
  prefixCls: 'relation-list',
  dataSource: [],
  empty: '无数据',
  bordered: true,
  split: true,
};

export default RelationList;
