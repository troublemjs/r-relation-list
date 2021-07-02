import React from 'react';
import { mount } from 'enzyme';

import RelationList from '../src';

describe('RelationList.Basic', () => {
  const data = [1, 2, 3, 4, 5];
  const createList = (props) => (
    <RelationList<typeof data[number]>
      dataSource={data}
      renderItem={(item) => item}
      {...props}
    />
  );

  describe('renders correctly', () => {
    it('basic', () => {
      const wrapper = mount(
        createList({
          prefixCls: 'test-prefix',
          className: 'test-class-name',
        }),
      );
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('header', () => {
      const wrapper = mount(
        createList({
          header: 'test-header',
        }),
      );
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('footer', () => {
      const wrapper = mount(
        createList({
          footer: 'test-footer',
        }),
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe('renders empty correctly', () => {
    describe('renders ReactNode correctly', () => {
      it('has title', () => {
        const wrapper = mount(
          createList({ title: 'Title', dataSource: [], empty: 'No data' }),
        );

        expect(wrapper.find('.relation-list-title').text()).toEqual('Title');

        expect(wrapper.find('.relation-list').children().last().text()).toEqual(
          'No data',
        );
      });

      it('no title', () => {
        const wrapper = mount(createList({ dataSource: [], empty: 'No data' }));
        expect(wrapper.text()).toEqual('No data');
      });
    });

    it('effect update', () => {
      const App = () => {
        const [empty, setEmpty] = React.useState('No data');
        React.useEffect(() => {
          setEmpty('暂无数据');
        }, []);
        return <RelationList empty={empty} />;
      };
      const wrapper = mount(<App />);
      wrapper.update();
      expect(wrapper.find('.relation-list').text()).toEqual('暂无数据');
    });
  });
});
