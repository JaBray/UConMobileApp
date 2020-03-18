import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import 'react-native';
import React from 'react';

import Schedule from '../components/Schedule';

import Event from '../components/Event';
import Header from '../components/Header';
import MyLargeButton from '../components/MyLargeButton';
import MySmallButton from '../components/MySmallButton';
import MyTextBox from '../components/MyTextBox';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('tests jest', () => {
  expect(true).toEqual(true);
});

it('Schedule renders correctly', () => {
  const tree = renderer.create(
    <Schedule />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Event renders correctly', () => {
  const tree = renderer.create(
    <Event />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Header renders correctly', () => {
  const tree = renderer.create(
    <Header />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('MyLargeButton renders correctly', () => {
  const tree = renderer.create(
    <MyLargeButton />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('MySmallButton renders correctly', () => {
  const tree = renderer.create(
    <MySmallButton />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('MyTextBox renders correctly', () => {
  const tree = renderer.create(
    <MyTextBox />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
