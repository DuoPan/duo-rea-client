import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Fab,
  CircularProgress,
  Typography,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import PropertyList from '../components/PropertyList';
import { 
  ADD_PROPERTY_ACTION_TYPE, 
  REMOVE_PROPERTY_ACTION_TYPE 
} from '../constant/actionTypes';

const HomePageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  paddingTop: 20,
  height: '100vh',
  flexWrap: 'wrap',
});

const SnackbarContentWrapper = styled(SnackbarContent, {
  shouldForwardProp: (prop) => prop !== 'variant'
})(({variant}) => ({
  color: variant === 'success' ? '#05a153' : '#ff0000',
  backgroundColor: variant === 'success' ? '#c4ffc4' : '#e9cdcd',
}));

const CenterBox = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '100hvw',
  justifyContent: 'center',
  alignItems: 'center',
});

function HomePage() {
  const [results, setResults] = useState(null);
  const [savedProperties, setSavedProperties] = useState(null);
  const [messageInfo, setMessageInfo] = useState({open: false});
  const [serverError, setServerError] = useState(false);

  const fetchUserData = () => {
    fetch('http://localhost:3001/').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(data => {
      // we can use setTimeout to see the Loading icon more clearly.
      // setTimeout(()=>{},5000);
      setResults(data.results);
      setSavedProperties(data.saved);
    }).catch(e => {
      // server is not available
      setServerError(true);
      console.log(e.message)
    });
  };

  const handleReset = () => {
    fetch('http://localhost:3001/reset').then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(data => {
      setResults(data.results);
      setSavedProperties(data.saved);
    }).catch(e => {
      setServerError(true);
      console.log(e.message)
    });
  };

  const addProperty = (id) => {
    fetch(`http://localhost:3001/add?id=${id}`).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(data => {
      if (data.data) {
        setSavedProperties(data.data);
        setMessageInfo({
          open: true,
          variant: 'success', 
          message: 'Successfully Added.',
        });
      }
      if (data.message) {
        setMessageInfo({
          open: true,
          variant: 'warning',
          message: data.message,
        });
      }
    }).catch(e => {
      setServerError(true);
      console.log(e.message)
    });
  };

  const removeProperty = (id) => {
    fetch(`http://localhost:3001/remove?id=${id}`).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(data => {
      if (data.data) {
        setSavedProperties(data.data);
        setMessageInfo({
          open: true,
          variant: 'success', 
          message: 'Successfully Removed.',
        });
      }
      if (data.message) {
        setMessageInfo({
          open: true,
          variant: 'warning',
          message: data.message,
        });
      }
    }).catch(e => {
      setServerError(true);
      console.log(e.message)
    });
  };

  useEffect(() => {
    fetchUserData();
  },[]);

  const handleCloseSnackbar = () => {
    setMessageInfo({open: false});
  };

  // display the loading icon for the first time open
  if (results === null && !serverError) {
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );
  }

  // display server error, tell users the serveice is not available now
  if (serverError) {
    return (
      <CenterBox style={{flexDirection: 'column'}}>
        <Typography variant='h6'>Server Error</Typography>
        <Typography variant='body1'>Please try again later.</Typography>
      </CenterBox>
    );
  }

  return (
    <HomePageWrapper>
      <PropertyList 
        title='Results'
        data={results}
        actionLabel='Add Property'
        actionType={ADD_PROPERTY_ACTION_TYPE}
        actionOnClick={addProperty}
      />
      <PropertyList
        title='Saved Properties'
        data={savedProperties}
        actionLabel='Remove Property'
        actionType={REMOVE_PROPERTY_ACTION_TYPE}
        actionOnClick={removeProperty}
        emptyMessage='There are no properties in this column.'
      />
      <Snackbar
        open={messageInfo.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          variant={messageInfo.variant}
          message={messageInfo.message}
        />
      </Snackbar>
      <Fab 
        color="primary" 
        aria-label="reset" 
        style={{position: 'fixed', left: 20}}
        onClick={handleReset}
      >
        Reset
      </Fab>
    </HomePageWrapper>
  );
}

HomePage.propTypes = {
};

export default HomePage;
