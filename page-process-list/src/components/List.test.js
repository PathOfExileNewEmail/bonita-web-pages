import React from 'react';
import List from './List';

import { shallow } from 'enzyme';

const mockupProcesses = Array(25).fill({
  displayDescription: '',
  deploymentDate: '2018-02-14 12:18:34.254',
  displayName: 'Pool',
  name: 'Pool',
  description: '',
  deployedBy: '4',
  id: '7544905540282516773',
  activationState: 'ENABLED',
  version: '1.0',
  configurationState: 'RESOLVED',
  last_update_date: '2018-02-14 12:18:34.723',
  actorinitiatorid: '1',
  categories: []
});

describe('<List />', () => {
  it('should render as many processes as given', () => {
    const wrapper = shallow(
      <List processes={mockupProcesses} pagination={{}} />
    );
    expect(wrapper.find('.List-process')).toHaveLength(mockupProcesses.length);
  });

  it('should render a table from a non-empty array of processes with their displayName, version and categories', () => {
    const wrapper = shallow(
      <List processes={mockupProcesses} pagination={{}} />
    );

    wrapper.find('.List-process').forEach((process_node, i) => {
      const process = mockupProcesses[i];
      const children = process_node.children();

      expect(children.at(0).text()).toBe(process.displayName);
      expect(children.at(1).text()).toBe(process.version);
      expect(children.at(2).children()).toHaveLength(process.categories.length);
    });
  });

  it('should display a well computed pagination', () => {
    const wrapper = shallow(
      <List
        processes={mockupProcesses}
        pagination={{ page: 1, size: 25, total: 100 }}
      />
    );
    expect(wrapper.find('.List-info > p').text()).toBe('26-50 of 100');
  });
});