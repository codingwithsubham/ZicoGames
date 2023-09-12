import React, { useEffect } from 'react';
import Spinner from "./Spinner"
import store from "../../store";
import { loadUser } from '../../actions/auth';

const LoadingPage = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="load-page">
        <Spinner />
        <h1>Fetching !! Please Wait ...</h1>
    </div>
  )
}

export default LoadingPage