import * as Yup from "yup";
import YupPassword from 'yup-password'
YupPassword(Yup)

const signUpSchema = Yup.object({
  nome: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  senha: Yup.string()
    .password()
    .min(8)
    .required(),
  confirmaSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'Passwords must match').required(),
});

export { signUpSchema };
