import React from 'react';
import { mount } from 'enzyme';

import Item from '../src/Item';

describe('RelationList.Item', () => {
  it('render children correctly', () => {
    const wrapper = mount(<Item>content</Item>);

    expect(wrapper.text()).toEqual('content');
  });

  it('render only actions correctly', () => {
    const wrapper = mount(<Item actions={[<a>edit</a>, <a>remove</a>]}></Item>);

    // test the `split` of the Item
    expect(
      wrapper
        .find('li')
        .first()
        .children()
        .last()
        .hasClass('relation-list-item-action-split'),
    ).toBeTruthy();

    expect(wrapper.find('a').children().length).toBe(2);
  });

  it('render only extra correctly', () => {
    const wrapper = mount(
      <Item extra={<div id="extra">extra text</div>}></Item>,
    );

    expect(wrapper.find('#extra').text()).toEqual('extra text');
  });

  it('render actions and extra correctly', () => {
    const wrapper = mount(
      <Item
        actions={[<a>edit</a>, <a>remove</a>]}
        extra={<div id="extra">extra text</div>}
      ></Item>,
    );

    expect(wrapper.find('#extra').text()).toEqual('extra text');
  });
});
