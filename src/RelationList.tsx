import React from 'react';
import classNames from 'classnames';

import Item from './Item';

const EMPTY_DATA: never[] = [];

/** RelationListProps */
export interface RelationListProps<T> {
  /** 当使用 `dataSource` 时，可以自定义渲染列表项 */
  renderItem?: (record: T, index: number) => React.ReactNode;
  /** 列表显示标题 */
  title?: React.ReactNode;
  /** 列表数据源 */
  dataSource?: T[];
  /**
   * @description 当 `renderItem` 自定义渲染列表有效时，自定义每行的`key`的获取方式
   * @default list-item-${index}
   */
  rowKey?: ((item: T) => string) | string;
  /** 数据为空是显示 */
  empty?: React.ReactNode;
  /** 前缀 classname，如需自定义，则需要同步修改 less 变量 */
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** 是否展示边框 */
  bordered?: boolean;
  /** 是否展示分割线，分割 `header` 与 `footer` */
  split?: boolean;
  /** 列表头部 */
  header?: React.ReactNode;
  /** 列表底部 */
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

  let childrenContent: React.ReactNode;
  if (mergedData.length > 0) {
    const items = mergedData.map(renderInnerItem);
    const newItems = React.Children.map(items, (child, idx) => (
      <li key={keys[idx]} className={`${prefixCls}-item-wrap`}>
        <div className={`${prefixCls}-item-prefix-line`} />
        {child}
      </li>
    ));
    childrenContent = <ul className={`${prefixCls}-items`}>{newItems}</ul>;
  } else if (!children) {
    childrenContent = empty;
  }

  /** 是否需要使用 div 包裹 content 内容，有 header 或者 footer 时需要 */
  const shouldContent = Boolean(header || footer);
  const clsContent = `${prefixCls}-content`;
  const TagContent = shouldContent ? 'div' : React.Fragment;
  const propsTagContent = shouldContent ? { className: clsContent } : null;

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [clsContent]: !shouldContent,
    },
    className,
  );

  return (
    <div className={classString} {...restProps}>
      {header && <div className={`${prefixCls}-header`}>{header}</div>}
      <TagContent {...propsTagContent}>
        <span className={`${prefixCls}-title`}>{title}</span>
        {childrenContent}
        {children}
      </TagContent>
      {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
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
