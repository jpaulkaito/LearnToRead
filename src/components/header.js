import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Header = ({ mytext, onUpdateText, onError }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <header style={{ position: 'fixed', width: '100%', backgroundColor: 'lightblue', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <h1 style={{ margin: 0, flex: 1, textAlign: 'center' }}>Learn To Read</h1>
      <FaPencilAlt onClick={handleModalOpen} style={{ cursor: 'pointer' }} />

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Text Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ editedText: mytext }}
            validationSchema={Yup.object({
              editedText: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              try {
                // Implement save changes logic
                console.log('Save changes:', values.editedText);

                onUpdateText(values.editedText);

                // Close the modal or perform other actions if needed
                handleModalClose();

                setSubmitting(false);
              } catch (error) {
                console.error('Error saving changes:', error);
                // Pass the error to the parent component for handling
                onError('Failed to save changes. Please try again.');
              }
            }}
          >
            <Form>
              <div>
                <label htmlFor="editedText">Update MyText:</label><br />
                <Field
                  as="textarea"
                  id="editedText"
                  name="editedText"
                  className="form-control"
                  style={{ height: '200px' }}
                />
                <ErrorMessage className='text-danger' name="editedText" component="div" />
              </div>

              <div>
                <Button variant="secondary" onClick={handleModalClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
