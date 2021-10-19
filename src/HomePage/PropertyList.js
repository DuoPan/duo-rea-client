import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';
import PropertyCard from './PropertyCard';

const PropertyListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

function PropertyList({
  actionLabel,
  actionType,
  data = null,
  title,
}) {
  if (!data) {
    return (<div>todo add placeholder</div>);
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
        />
      ))}
    </PropertyListWrapper>
  );
}

PropertyList.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  data: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default PropertyList;
