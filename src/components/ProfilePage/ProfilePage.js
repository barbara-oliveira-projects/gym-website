// ProfilePage.js

import React from 'react';
import { Container, Card } from 'react-bootstrap'; // Importe os componentes do Bootstrap ou de sua escolha

const ProfilePage = ({ user }) => {
  return (
    <Container>
      <h2>Perfil do Usuário</h2>
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
