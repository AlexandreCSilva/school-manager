import * as Yup from "yup";
import YupPassword from 'yup-password'
YupPassword(Yup)

const signInSchema = Yup.object({
  email: Yup.string().email().required(),
  senha: Yup.string()
    .password()
    .min(8)
    .required(),
});

export { signInSchema };
