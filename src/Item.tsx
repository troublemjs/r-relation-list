import React from 'react';
import classNames from 'classnames';

export interface RelationListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  /** 操作组，展示在右侧 */
  actions?: React.ReactNode[];
  /** 额外内容，展示在最右侧 */
  extra?: React.ReactNode;
}
const Item: React.FC<RelationListItemProps> = (props) => {
  const { prefixCls, className, children, extra, actions, ...restProps } =
    props;

  const actionsContent = actions && actions.length > 0 && (
    <ul className={`${prefixCls}-action`}>
      {actions.map((action, idx) => (
        <li key={idx}>
          {action}
          {idx !== actions.length - 1 && (
            <em className={`${prefixCls}-action-split`} />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classNames(`${prefixCls}`, className)} {...restProps}>
      {children}
      {actionsContent}
      {extra}
    </div>
  );
};

Item.defaultProps = {
  prefixCls: 'relation-list-item',
};

export default Item;
