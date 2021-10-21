import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyList from '../PropertyList';

it('renders PropertyList with empty data', () => {
  render(
    <PropertyList
      actionType='add'
      actionLabel='Button Name'
      actionOnClick={() => {}}
      data={[]}
      emptyMessage='it is empty'
      title='title'
    />
  );
  expect(screen.getByText('it is empty')).toBeInTheDocument();
});

it('renders PropertyList with some data', () => {
  render(
    <PropertyList
      actionType='add'
      actionLabel='Button Name'
      actionOnClick={() => {}}
      data={[{
        "price": "$526,500",
        "agency": {
          "brandingColors": {
            "primary": "#000000"
          },
          "logo": "https://i2.au.reastatic.net/170x32/3015ba9710c7e3ddc2ac30f45fd7906df5b04e442a7f6948f75a6029b8b871e2/main.gif"
        },
        "id": "4",
        "mainImage": "https://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg"
      }]}
      emptyMessage='it is empty'
      title='title'
    />
  );
  expect(screen.queryByText('it is empty')).not.toBeInTheDocument();
  expect(screen.getByText('title')).toBeInTheDocument();
});