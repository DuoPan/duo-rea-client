import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { 
  Button,
  Card,
  Typography,
 } from '@mui/material';
import { 
  ADD_PROPERTY_ACTION_TYPE,
  REMOVE_PROPERTY_ACTION_TYPE,
} from '../constant/actionTypes';

const CardWrapper = styled(Card)({
  width: 320,
  marginTop: 10,
  marginBottom: 10,
});

const AgencyInfo = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color'
})(({color}) => ({
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

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'buttonColors'
})(({buttonColors}) => ({
  color: buttonColors.frontColor,
  backgroundColor: buttonColors.backColor,
  textTransform: 'initial',
}));

const getButtonColors = (type) => {
  if (type === ADD_PROPERTY_ACTION_TYPE) {
    return {frontColor: '#05a153', backColor: '#c4ffc4'};
  } else if (type === REMOVE_PROPERTY_ACTION_TYPE) {
    return {frontColor: '#ff0000', backColor: '#e9cdcd'};
  } else { // to support more action types.
    return {frontColor: '#05a153', backColor: '#c4ffc4'}
  }
};

function PropertyCard({
  actionType,
  actionLabel,
  actionOnClick,
  agency,
  mainImage,
  price,
  propertyId,
}) {
  const [showAction, setShowAction] = useState(false);
  const buttonColors = getButtonColors(actionType);

  return (
    <CardWrapper 
      id={propertyId} 
      onMouseOver={()=> setShowAction(true)}
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
            buttonColors={buttonColors}
            size='small'
            onClick={() => actionOnClick(propertyId)}
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
  actionOnClick: PropTypes.func.isRequired,
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
