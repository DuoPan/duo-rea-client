import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button, Card, Typography } from '@mui/material';
import { 
  ADD_PROPERTY_ACTION_TYPE, 
} from '../constant/actionTypes';

const CardWrapper = styled(Card)({
  width: 320,
  marginTop: 20,
});

const AgencyInfo = styled('div')(({color}) => ({
  backgroundColor: color,
}));

const Logo = styled('img')({
  margin: '8px 0 6px 8px',
});

const MainImage = styled('img')({
  width: '100%',
  height: 'auto',
});

const Price = styled(Typography)({
  margin: 8,
});

const ActionButtonWrapper = styled('div')({
  position: 'relative',
  bottom: 88,
  textAlign: 'center',
  height: 20,
});

const EmptyRow = styled('div')({
  height: 20,
});

const ActionButton = styled(Button)(({isAdd}) => ({
  color: isAdd ? '#05a153' : '#ff0000',
  backgroundColor: isAdd ? '#c4ffc4' : '#e9cdcd',
  textTransform: 'initial',
}));

function PropertyCard({
  actionType,
  actionLabel,
  agency,
  mainImage,
  price,
  propertyId,
}) {
  const [showAction, setShowAction] = useState(false);

  return (
    <CardWrapper 
      id={propertyId} 
      // onMouseOver={()=> setShowAction(true)}
      // onMouseOut={()=> setShowAction(false)}

      onMouseEnter={()=> setShowAction(true)}
      onMouseLeave={()=> setShowAction(false)}
    >
      <AgencyInfo color={agency.brandingColors.primary}>
        <Logo src={agency.logo} alt='agency logo'/>
      </AgencyInfo>
      <MainImage src={mainImage} alt='main image'/>
      <Price variant='subtitle1'>Price: {price}</Price>
      {showAction ? (
        <ActionButtonWrapper>
          <ActionButton 
            variant='contained' 
            isAdd={actionType === ADD_PROPERTY_ACTION_TYPE}
            size='small'
          >
            {actionLabel}
          </ActionButton>
        </ActionButtonWrapper>
      ) : (
        <EmptyRow/>
      )}
    </CardWrapper>
  );
}

PropertyCard.propTypes = {
  actionType: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  agency: PropTypes.shape({
    brandingColors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  mainImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default PropertyCard;
