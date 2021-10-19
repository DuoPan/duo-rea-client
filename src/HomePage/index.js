import React, { useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import PropertyList from './PropertyList';
import { 
  ADD_PROPERTY_ACTION_TYPE, 
  REMOVE_PROPERTY_ACTION_TYPE 
} from '../constant/actionTypes';

const HomePageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: '#eaeef3',
});

function HomePage() {
  const [results, setResults] = useState(null);
  const [savedProperties, setSavedProperties] = useState(null);

  const fetchDefaultData = () => {
    fetch('http://localhost:3001/results', {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    }).then(res => 
      res.json()
    ).then(data => {
      setResults(data.results);
      setSavedProperties(data.saved);
    });
  };

  useEffect(() => {
    fetchDefaultData();
  },[]);

  return (
    <HomePageWrapper>
      <PropertyList 
        title='Results'
        data={results}
        actionLabel='Add Property'
        actionType={ADD_PROPERTY_ACTION_TYPE}
      />
      <PropertyList
        title='Saved Properties'
        data={savedProperties}
        actionLabel='Remove Property'
        actionType={REMOVE_PROPERTY_ACTION_TYPE}
      />
    </HomePageWrapper>
  );
}

HomePage.propTypes = {
};

export default HomePage;
