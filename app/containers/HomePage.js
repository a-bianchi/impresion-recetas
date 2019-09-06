import React, { useEffect, useContext } from 'react';
import RecetaTable from '../components/RecetaTable';
import { RecetasContext } from '../context/RecetasContext';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
  const { getUSer } = useContext(UserContext);
  const { recetas, getRecetas } = useContext(RecetasContext);

  useEffect(() => {
    getUSer();
    getRecetas();
  }, []);

  return (
    <div>
      <RecetaTable rows={recetas} />
    </div>
  );
};

export default HomePage;
