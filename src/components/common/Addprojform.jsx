import { useState } from 'react'
import AsyncHandler from '../../utils/AsyncHandler'
import FormSubmit from '../../utils/Formsubmit'
import Fileuploader from './FileUploader'
import PopupCard from './popupCard'
import Cancelbutton from './Cancelbtn'
import { PROJ_SUB_PATH, TAGS} from '../../constants/constants'
import '../../styles/component/addprojform.css'

const Addprojform = ({setState, onProjAdd}) => {

    const[projImage, setprojImage] = useState(null)
    const [projTitle, setprojTitle] = useState('')
    const [projRepo, setprojRepo] = useState('')
    const [loading, setLoading] = useState(false)
    const [cancelState, setCancelState] = useState(true)
    const[popup, setPopup] = useState(false)
    const [msg, setMsg] = useState("")

    const tagOptions = TAGS
    const [tags, setTags] = useState(
        tagOptions.reduce((acc, tag) => ({...acc, [tag]: false}), {})
    )

    const handleSubmit = AsyncHandler(async (e) => {
        e.preventDefault()
        const selectedTags = Object.keys(tags).filter(tag => tags[tag])

        if (!projImage) {
        setPopup(true)
        setMsg("Project image is required 🖼️")
        return
    }

    if(projImage.size > 200*1024){
            setprojImage(null)
            setPopup(true)
            setMsg("Upload Image size must be less than 100Kb 🤏🏻")
            return
        }

    if(!projTitle){
        setPopup(true)
        setMsg("Please enter project title ✒️")
        return
    }

     if(!projRepo){
        setPopup(true)
        setMsg("Please enter repo link 🔗")
        return
    }

    if (selectedTags.length === 0) {
        setPopup(true)
        setMsg("Please select at least one tag 🏷️")
        return
  }
        setLoading(true)
        setCancelState(false)
        const payload = new FormData()

        payload.append("projImage", projImage)
        payload.append("projTitle", projTitle)
        payload.append("projRepo", projRepo)
        payload.append("selectedTags", JSON.stringify(selectedTags))

        const res = await FormSubmit(PROJ_SUB_PATH, payload, true)
        setLoading(false)
        setState(false)
        setCancelState(true)
        onProjAdd(res.ok)
        setprojImage(null)
        setprojTitle('')
        setprojRepo('')
        setTags( tagOptions.reduce((acc, tag) => ({...acc, [tag]: false}), {}))
})
    return (
        <>
        {
            popup && <PopupCard
            message={msg}
            setpopupState={setPopup}
            popupState={popup}
            failure={true}
            />
        }
        <div className='projformdiv'>
        <form className='addprojform' onSubmit={handleSubmit}>
            {!loading ? (
                <>
    <Cancelbutton
    setState={setState}
    booltype={true}
    className='close-btn'/>
        <div className='projcoverimg'>
        <Fileuploader
        submitState={cancelState}
        setState={setprojImage}
        inputId="imgInput"
        />
        </div>
        <div className='textfield-title'>
            <label>Title</label>
            <input
            type='text'
            placeholder='Enter project title'
            value={projTitle}
            onChange={(e) => setprojTitle(e.target.value)}
            />
        </div>
        <div className='textfield-repo'>
            <label>Repo</label>
            <input
            type='text'
            placeholder='Enter project Repo'
            value={projRepo}
            onChange={(e) => setprojRepo(e.target.value)}
            />
        </div>
        <div className='tagdiv'>
        <label>Choose tags:</label>
        <div className='tags'>
            {
                tagOptions.map(
                    (elem) => (
                        <div key={elem}>
                        <div
                        className={`tag ${tags[elem] ? 'active' : ''}`}
                        onClick={() => document.getElementById(elem).click()}
                        >
                        {elem}
                        <span className={`icon ${tags[elem] ? 'active' : ''}`}></span>
                        </div>
                        <input
                            type="checkbox"
                            className='checkbox'
                            id={elem}
                            checked={tags[elem]}
                            onChange={(e) =>
                            setTags({ ...tags, [elem]: e.target.checked })
                            }
                        />
                        </div>
                    ))}
        </div>
    </div>
        <button className='sub-btn'
        onClick={()=>{if(popup) setPopup(false)}}
    >Submit</button>
    </>
    ): (
        <div className='addprojbuff'>Adding project
        <div className="spinner"></div>
        </div>
    )}
    </form>
    </div>
        </>
    )}

export default Addprojform