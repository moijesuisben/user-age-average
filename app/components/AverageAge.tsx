import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import styled from 'styled-components';

interface AverageAgeProps {
  selectedUsers: Set<string>;
}

const AverageAgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const Texts = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const AverageAge: React.FC<AverageAgeProps> = ({ selectedUsers }) => {
  const [averageAge, setAverageAge] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageAge = async () => {
      if (selectedUsers.size === 0) {
        setAverageAge(null);
        return;
      }

      const selectedUserIds = Array.from(selectedUsers).join(',');
      try {
        const response = await axios.get(`average?ids=${selectedUserIds}`);
        const { average } = response.data;
        const currentYear = new Date().getFullYear();
        setAverageAge(Math.round(currentYear - average));
      } catch (error) {
        console.error('Error fetching average age:', error);
        setAverageAge(NaN);
      }
    };

    fetchAverageAge();
  }, [selectedUsers]);

  let displayMessage;
  if (averageAge === null) {
    displayMessage = 'Sélectionnez des utilisateurs pour connaitre la moyenne';
  } else if (isNaN(averageAge)) {
    displayMessage = 'Erreur : date de naissance de Jecho Thompson absente';
  } else {
    displayMessage = `${averageAge}`;
  }

  return (
    <AverageAgeContainer>
      <img src="/media/birthday-cake-cake-svgrepo-com.svg" alt="" width={150} />
      <Texts>
        <p>Âge moyen des personnes sélectionnées</p>
        <b>{displayMessage}</b>
      </Texts>
    </AverageAgeContainer>
  );
};

export default AverageAge;
