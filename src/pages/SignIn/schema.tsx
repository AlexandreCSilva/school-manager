import * as Yup from "yup";

const signInSchema = Yup.object({
  email: Yup.string().email().required(),
  senha: Yup.string()
    .matches(
    /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required(),
});

export { signInSchema };
