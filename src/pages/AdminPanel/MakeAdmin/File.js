import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const File = () => {
    const [fileData, setFileData] = useState(null)
    const [name, setName] = useState('');
    const [success, setSuccess] = useState('');
    console.log(name, fileData);
    const time = new Date().toLocaleString();
    console.log(time);
   
    const handleFileData = (e) => {
        e.preventDefault();
        setSuccess('')
        const formData = new FormData();
        formData.append("fileName", fileData);
        formData.append("name", name);
        formData.append("time", time)
        console.log(fileData)
        axios.post('https://tranquil-forest-38467.herokuapp.com/uploads', formData)

e.target.reset();
setName('');
setFileData(null);
Swal.fire({
    position: "middle",
    icon: "success",
    title: "File added successfully",
    showConfirmButton: false,
    timer: 2000,
  });
        setSuccess(' File added successfully')


    }
    return (
        <div style={{width:'90%',height:'70vh'}} className='d-flex align-item-center justify-content-center '>
            <div style={{width:'90%'}}  className='fileAdd'>

                <h3 className='test-center'>Add File</h3>
                <form onSubmit={handleFileData} encType="multipart/form-data" >
                    <input style={{width:'80%'}}  placeholder='name' onChange={(e) => setName(e.target.value)} type="text" /> <br />
                    <input style={{width:'80%'}} onChange={(e) => setFileData(e.target.files[0])} type="file" name="fileName" id="" /> <br />
                    <button style={{width:'80%'}} type="submit">Submit</button>
                </form>
               
            </div>
        </div>
    );
};

export default File;