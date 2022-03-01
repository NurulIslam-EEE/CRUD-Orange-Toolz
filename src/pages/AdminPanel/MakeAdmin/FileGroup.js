import React ,{useState, useEffect} from 'react';
import {Table,Button,Modal} from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
const FileGroup = () => {
    const [totalFile,setTotalFile]=useState([]);

    useEffect(()=>{
        fetch('https://tranquil-forest-38467.herokuapp.com/uploads')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setTotalFile(data)})
    },[]);
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>File Name</th>
            <th>Total upload</th>
            <th>Total process</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          <tr>
           
            <td>{totalFile[0]?.fileName}</td>
            <td>{totalFile?.length}</td>
            <td>{totalFile?.length}</td>
            <td><button className='bg-info text-white border-0'>
            <Button variant="primary" onClick={() => setModalShow(true)}>
       Group
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                
                
                </button> </td>
          </tr>
         
        </tbody>
      </Table>
    );
};

export default FileGroup;