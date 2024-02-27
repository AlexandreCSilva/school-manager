import * as Yup from "yup";

const signUpSchema = Yup.object({
  nome: Yup.string().min(3).required(),
  email: Yup.string().email(),
  senha: Yup.string()
    .matches(
    /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required(),
  confirmaSenha: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export { signUpSchema };
