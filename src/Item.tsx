import React from 'react';
import classNames from 'classnames';

export interface RelationListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
}
const Item: React.FC<RelationListItemProps> = (props) => {
  const { prefixCls, className, children, extra, actions, ...restProps } =
    props;

  const actionsContent = actions && actions.length > 0 && (
    <ul className={`${prefixCls}-item-action`}>
      {actions.map((action, idx) => (
        <li key={idx}>{action}</li>
      ))}
    </ul>
  );

  return (
    <div className={classNames(`${prefixCls}-item`, className)} {...restProps}>
      {children}
      {actionsContent}
      {extra}
    </div>
  );
};

Item.defaultProps = {
  prefixCls: 'relation-list',
};

export default Item;
