import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { editNote, deleteNote } from '../../api/notesApi';

const Note = ({ note }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); window.location.reload()};
    const handleShow = () => setShow(true);
    const handleSave = async () => {
        try {
            await editNote(note.id, title, content);
            setShow(false);
        } catch (error) {
            alert(error)
        }
    };
    const handleDelete = async () => {
        try {
            await deleteNote(note.id);
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    };

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return (
        <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Заметка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId={`title.${note.id}`}>
                <Form.Label><b>Название:</b></Form.Label>
                <Form.Control as="textarea" defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId={`content.${note.id}`}
                >
                <Form.Label><b>Содержание:</b></Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={content} onChange={e => setContent(e.target.value)} />
                </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="warning" onClick={handleSave}>
           Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
        <li className='list-group-item' key={note.id}>
            <h3>{title.length >= 20 ? `content.slice(0, 50)...` : title}</h3>
            <p>{content.length >= 50 ? `content.slice(0, 50)...` : content}</p>
            <Button variant='warning' onClick={handleShow}>Открыть заметку</Button>
            <Button className='m-2' variant='warning' onClick={handleDelete}>Удалить заметку</Button>
        </li>
        </div>
    );
};

export default Note;