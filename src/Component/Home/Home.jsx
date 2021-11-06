import React , {useEffect , useState} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function Home() {
  // let [title , setUpdateTitle] = useState('');
  // let [desc , setUpdateDesc] = useState('');
  const [allNotes,setAllNotes] = useState([]);
  let[loading,setLoading] = useState(false);
  let baseUrl ='https://route-egypt-api.herokuapp.com/'
  let token = localStorage.getItem('token');
  if(token)
  {
    var decoded = jwt_decode(token);
  }
  async function getAllNotes() 
  {
    // setLoading(true);
    let {data} = await axios.get(baseUrl +'getUserNotes',{
      headers:{
        token,
        userID:decoded._id
      }
    })
    // console.log(data);
    if(data.message== "success"){
      setLoading(false);
      setAllNotes(data.Notes);
      // console.log(allNotes);
    }
    else
    {
      setLoading(false);
      setAllNotes('');
      // console.log(allNotes);
    }
    
  }
  const [note , setNote] = useState({
    title:'',
    desc:'',
    token,
    userID:decoded._id
  });
  function addNote(e) 
  {
    let myNote = {...note};
    myNote[e.target.name] = e.target.value;
    setNote(myNote);
  }
  async function submitAddForm(e) 
  {
    e.preventDefault();
    setLoading(true);
    let {data} = await axios.post(baseUrl +'addNote',note);
    if(data.message=='success')
    {
      setLoading(false);
      getAllNotes();
    }
  }
  async function deleteNote(_id)
  {
    // console.log(_id);
    setLoading(true);
    let {data} = await axios.delete(baseUrl +'deleteNote',{
      data: {
        NoteID:_id,
        token
      }
    });
    if(data.message=='deleted')
    {
      setLoading(false);
      getAllNotes();
    }
  }
  // function getInputValue(updateTitle,updateDesc) 
  // {
  //   title = updateTitle;
  //   desc = updateDesc;
  //   setUpdateTitle(title);
  //   setUpdateDesc(desc);
  //   // console.log(title);
  //   // console.log(desc);
  // }
  // async function submitUpdateForm(e)
  // {
  //   e.preventDefault();
  //   // setLoading(true);
  //   let item = {title,desc,token,userID:decoded._id};
  //   console.log(item);
  //   let {data} = await axios.put(baseUrl +'updateNote',{
  //     headers:{
  //       'Accept':'application/json',
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify(item)
  //   });
  //   console.log(data);
  //   // if(data.message=='success')
  //   // {
  //   //   setLoading(false);
  //   //   getAllNotes();
  //   // }
  // }
  useEffect(()=> {
    getAllNotes();
  }, [])
  return (
    <>
      <div className="container my-5">
          <button className="add d-block ms-auto p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
            ><i className="fas fa-plus-circle"></i> Add New
          </button>
      </div>
      {loading?<div className='w-50 text-center text-white fs-1 fw-bolder m-auto mt-5'>waiting <i className='fas fa-spinner fa-spin'></i></div>:''}

      {/* ======================= Add Modal  ============================= */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={submitAddForm}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={addNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={addNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {loading?<button className="btn btn-info"><i className='fas fa-spinner fa-spin'></i></button>:<button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* =======================  Notes  ============================= */}

      <div className="container">
        <div className="row">
          {allNotes?allNotes.map((note,index)=>{
            return(
              <>
                {/* =================== *** Delete Modal *** ======================= */}
                <div
                key={index}
                className="modal fade"
                id="deleteNote"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                        </button>
                      </div>
                      <div className="modal-body">
                        <h2>Are you need delete this note?</h2>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        {loading?<button type="button" className="btn btn-danger"><i className='fas fa-spinner fa-spin'></i></button>:<button onClick={()=>{deleteNote(note._id)}} type="button" data-bs-dismiss="modal" className="btn btn-danger">Delete</button>}
                      </div>
                    </div>
                  </div>
                </div>
                <div key={index}  className="col-md-4 my-4">
                  <div className="note p-4">
                    <div className='row justify-content-between'>
                      <div className="col-md-3">
                      <h3>{note.title}</h3>
                      </div>
                      <div className="col-md-4">
                      {/* <a onClick={()=>{getInputValue(note.title,note.desc)}} data-bs-toggle="modal" data-bs-target="#updateModal" className='cursor-pointer'><i className="fas fa-edit float-right edit"></i></a> */}
                      <a data-bs-toggle="modal" data-bs-target="#deleteNote" className='cursor-pointer ms-auto'><i className="fas fa-trash-alt float-right px-3 del"></i></a>
                      </div>
                    </div>
                    <p>{note.desc}</p>
                  </div>
                </div>
                {/* =================== *** Update Modal *** ======================= */}
                {/* <div
                key={index}
                className="modal fade"
                id="updateModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                >
                <form onSubmit={submitUpdateForm}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                        </button>
                      </div>
                      <div className="modal-body">
                        <input
                          onChange={(e)=>{setUpdateTitle(e.target.value)}}
                          placeholder="Type Title"
                          name="title"
                          className="form-control"
                          type="text"
                          value={title}
                        />
                        <textarea
                          onChange={(e)=>{setUpdateDesc(e.target.value)}}
                          className="form-control my-2"
                          placeholder="Type your note"
                          name="desc"
                          id=""
                          cols="30"
                          rows="10"
                          value={desc}
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        {loading?<button className="btn btn-info"><i className='fas fa-spinner fa-spin'></i></button>:<button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>}
                      </div>
                    </div>
                  </div>
                </form>
                </div> */}
              </>
            )
          }):<h2 className='text-center text-white fs-1 fw-bolder mt-5'>There are no Notes yet</h2>}
        </div>
      </div>
    </>
  )
}

