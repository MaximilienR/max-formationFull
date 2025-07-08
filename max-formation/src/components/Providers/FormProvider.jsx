import { createContext, useState } from "react";
import { FormContext } from "../../context/formContext";
 

function FormProvider({ children }) {

  const [user, setUser] = useState(null);


  const login = (data) => {
    console.log(data);
    setUser(data);
  }
  const logout = () => {
    setUser(null);
  }
  return (
    <FormContext.Provider value={{ user, login, logout }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider ;