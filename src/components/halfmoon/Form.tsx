import React from "react";

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form = (props: FormProps) => <form {...props} />;

export default Form;
