import * as Yup from "yup";
import YupPassword from 'yup-password'
YupPassword(Yup)

const signUpSchema = Yup.object({
  nome: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  senha: Yup.string()
    .matches(
    /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .min(8)
    .required(),
  confirmaSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'Passwords must match').required(),
});

export { signUpSchema };
