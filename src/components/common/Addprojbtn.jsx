import '../../styles/component/addprojbtn.css'

const Addprojbtn = ({state, setState}) => {
    return(
        <button className="addprojbtn"
        onClick={() =>{setState(!state)}}
        onKeyDown={(e) =>{ if(e.key === "Enter"){e.preventDefault()}}}
        >
            + Add project
        </button>
    )

}

export default Addprojbtn