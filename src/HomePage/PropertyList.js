import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import PropertyCard from './PropertyCard';

const PropertyListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 320,
});

const EmptyPlaceholder = styled(Typography)({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
});


function PropertyList({
  actionLabel,
  actionType,
  actionOnClick,
  data = [],
  title,
}) {
  if (!data || data.length === 0) {
    return (
      <PropertyListWrapper>
        <Typography variant='h6'>{title}</Typography>
        <EmptyPlaceholder variant='body1'>There are no properties in this column.</EmptyPlaceholder>
      </PropertyListWrapper>
    );
  }

  return (
    <PropertyListWrapper>
      <Typography variant='h6'>{title}</Typography>
      {data.map(item => (
        <PropertyCard
          key={`${title}_${item.id}`}
          agency={item.agency}
          mainImage={item.mainImage}
          price={item.price}
          propertyId={item.id}
          actionLabel={actionLabel}
          actionType={actionType}
          actionOnClick={actionOnClick}
        />
      ))}
    </PropertyListWrapper>
  );
}

PropertyList.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  actionOnClick: PropTypes.func.isRequired,
  data: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default PropertyList;
