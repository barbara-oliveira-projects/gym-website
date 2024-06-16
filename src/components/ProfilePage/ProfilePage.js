import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../../services/aws';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = () => {
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) {
            console.error('Error getting session:', err);
            return;
          }

          user.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting user attributes:', err);
              return;
            }

            const data = {};
            attributes.forEach(attribute => {
              data[attribute.Name] = attribute.Value;
            });

            setUserData(data);
          });
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container className="profile-page">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Perfil do Usuário</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {userData.preferred_username || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userData.email || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Data de Entrada:</strong> {userData.joined || 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
