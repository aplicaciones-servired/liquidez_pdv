import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../interface/usuario.dt";
import { FieldValues } from "react-hook-form";
import { LOGIN_URL } from "../utils/contanst";

export function useLogin(): {
  errorString: string;
  onSubmit: (data: FieldValues) => Promise<void>;
} {
  const { login, setUsernames } = useAuth();
  const [errorString, setErrorString] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    // Retornamos la promesa
    return axios
      //.post("http://localhost:9010/api/v2/login", data)
      .post(`${LOGIN_URL}/login`, data)
      .then((res) => {
        console.log('res', res)
        const proceso = res.data.user.process;
        if (proceso === "Operaciones" || proceso === "Financiero") {
          login();
          setUsernames(res.data.user as unknown as User);
          navigate("/home");
        } else {
          const msg = "No estás autorizado";
          setErrorString(msg);
          throw new Error(msg); // Lanzamos el error con el mensaje
        }
      })
      .catch((error) => {
        // Ensure you're setting a meaningful error message
        const message =
          error.response?.data?.message || error.message || "Error desconocido";
        setErrorString(message);
        throw new Error(message);
      });
  };

  return {
    errorString,
    onSubmit,
  };
}
