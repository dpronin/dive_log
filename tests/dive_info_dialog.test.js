// import dependencies
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import 'date-fns';
import format from "date-fns/format";

// import react-testing methods
import { render, fireEvent, waitFor, screen, getAllByTestId } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

// the component to test
import App from '../src/components/App.js';

// for async to work
import regeneratorRuntime from "regenerator-runtime";

//redux
import { Provider } from 'react-redux';
import store from '../src/redux/store';

jest.mock('../src/redux/selectors')

test('component DiveInfoDialog: display currently selected dive data', async () => {
  // Arrange
  const dives = {
    diveList: [
      {
        dive_num: 1,
        date: "Mar 20, 2019",
        site: "Blue lagoon",
        depth: 30,
        duration: 25,
        lat: 56.265644,
        lon: 44.880680
      },
    ],
    current_dive: 1,
  };
  const test_dive = dives.diveList[0];

  const foo = require('../src/redux/selectors');
  foo.getDivesState.mockImplementation(() => dives);
  foo.getDiveList.mockImplementation(() => dives.diveList);
  foo.getDiveById.mockImplementation(() => test_dive);
  foo.getCurrentDiveData.mockImplementation(() => test_dive);

  const { container, asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>);

  // Act
  fireEvent.click(screen.getAllByTestId('dive_entry')[0]);

  // Assert;
  expect(screen.getByTestId('share_icon')).toBeTruthy();
  expect(screen.getByTestId('edit_icon')).toBeTruthy();
  expect(screen.getByTestId('delete_icon')).toBeTruthy();

  expect(screen.getByTestId('info_dialog_num')).toHaveTextContent(dives.current_dive);
  expect(screen.getByTestId('info_dialog_date')).toHaveTextContent(test_dive.date);
  expect(screen.getByTestId('info_dialog_site')).toHaveTextContent(test_dive.site);
  expect(screen.getByTestId('info_dialog_depth')).toHaveTextContent(test_dive.depth);
  expect(screen.getByTestId('info_dialog_duration')).toHaveTextContent(test_dive.duration);
})
