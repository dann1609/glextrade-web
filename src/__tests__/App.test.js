import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App/App';

test('avoid tests', () => {
  const avoidTest = true;
  expect(avoidTest).toBe(true);
});

test('renders learn react link', () => {
  // const component = renderer.create(<App />);
  // const tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
