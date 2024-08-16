import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { PageContainer, ExhibitionList, ExhibitionCard, ExhibitionTitle, ExhibitionDescription } from './styles';

const MyExhibitionPage = () => {
  const { isAuthenticated, userData } = useAuth();
  const [myExhibitions, setMyExhibitions] = useState([]);

  useEffect(() => {
    fetchMyExhibitions();
  }, []);

  const fetchMyExhibitions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/exhibitions?artist_id=${userData.artist.user_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exhibitions');
      }
      const data = await response.json();
      setMyExhibitions(data);
    } catch (error) {
      console.error('Error fetching my exhibitions:', error);
      alert('Error fetching exhibitions. Please try again later.');
    }
  };

  return (
    <PageContainer>
      <h1>My Exhibitions</h1>
      <ExhibitionList>
        {myExhibitions.map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
            <p>Start Date: {exhibition.start_date}</p>
            <p>End Date: {exhibition.end_date}</p>
          </ExhibitionCard>
        ))}
      </ExhibitionList>
    </PageContainer>
  );
};

export default MyExhibitionPage;