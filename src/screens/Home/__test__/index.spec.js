import React from 'react';
import {render} from '@testing-library/react-native';
import Home from '../index';

describe('Home', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should render Detail correctly', () => {
    const {toJSON} = render(<Home />);

    expect(toJSON()).toMatchSnapshot();
  });
});
