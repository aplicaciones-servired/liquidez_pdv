import { z } from "zod";

const formSchema = z.object({
  username: z.string().nonempty("El usuario es requerido"),
  password: z.string().nonempty("La contraseña es requerido"),
});

export default formSchema;
