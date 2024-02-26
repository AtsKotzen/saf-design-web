import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCurrentUser } from '../../services/firebaseService'; // Importando a função getCurrentUser
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ListSafs = ({ onSafSelect }) => {
  const [safs, setSafs] = useState([]);

  useEffect(() => {
    const fetchSafs = async () => {
      const currentUser = await getCurrentUser(); // Obtendo o usuário atual
      const safsRef = collection(db, 'safs');
      const q = query(safsRef, where('uid', '==', currentUser.uid)); // Buscando registros com a mesma uid do currentUser

      const querySnapshot = await getDocs(q);
      const safsData = querySnapshot.docs.map(doc => doc.data());
      setSafs(safsData); // Atualizando o estado com os dados obtidos
    };

    fetchSafs();
  }, []);

  return (
    <div>
        <Typography variant="h5" component="div" style={{ fontFamily: "Roboto" }}>
          Meus SAF´s
        </Typography>
      {safs.map((saf, index) => (
        <Box 
          component={Card} 
          key={index} 
          sx={{ 
            marginBottom: "15px", 
            width: "600px", 
            cursor: "pointer", 
            transition: "0.3s", 
            '&:hover': { transform: "scale(1.02)", backgroundColor: "#C3E3B9" } 
          }} 
          onClick={() => onSafSelect(saf)}
        >
          <CardContent>
            <Typography variant="h5" component="div" style={{ fontFamily: "Roboto" }}>
              {saf.safName}
            </Typography>
            <Typography color="text.secondary" style={{ fontFamily: "Roboto" }}>
              Mentor: {saf.mentor}
            </Typography>
          </CardContent>
        </Box>
      ))}
    </div>
  );
};

export default ListSafs;
