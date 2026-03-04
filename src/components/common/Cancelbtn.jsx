const Cancelbutton = ({
  setState,
  booltype = false,
  make_elem_null = false,
  elem_id="",
  className=""}) =>{

    const handleCancel = ()=>{
      booltype ? (setState(false)) : (setState(null))
      if(make_elem_null){
        document.getElementById(elem_id).value = ""
      }
    }
    return (
        <button type="button"
        className={`${className}`}
      onClick={handleCancel}
    >
      ✕
    </button>
    )
}

export default Cancelbutton

