import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyCard from '../PropertyCard';

it('renders PropertyCard without crash', () => {
  const handleOnCLick = jest.fn();
  const { container } = render(
    <PropertyCard
      actionType='add'
      actionLabel='Button Name'
      actionOnClick={handleOnCLick}
      agency={{
        'brandingColors': {
          'primary': '#000000'
        },
        'logo': 'https://i2.au.reastatic.net/170x32/3015ba9710c7e3ddc2ac30f45fd7906df5b04e442a7f6948f75a6029b8b871e2/main.gif'
      }}
      mainImage='https://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg'
      price='$100'
      propertyId='200'
    />
  );

  // test static elements
  expect(container.querySelectorAll('img')).toHaveLength(2);
  expect(screen.getByText('Price: $100')).toBeInTheDocument();

  // test hover to show button
  expect(screen.queryByText('Button Name')).not.toBeInTheDocument();
  userEvent.hover(screen.getByText('Price: $100'));
  expect(screen.getByText('Button Name')).toBeInTheDocument();

  // test button click
  const button = screen.queryAllByRole('button')[0];
  expect(handleOnCLick).not.toHaveBeenCalled();
  userEvent.click(button);
  expect(handleOnCLick).toHaveBeenCalled();
});
