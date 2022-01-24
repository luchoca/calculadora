import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";

const compundInterest = (deposit, contribution, year, rate) => {
  let total = deposit;
  for (let i = 0; i < year; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

function App() {
  const [balance, setBalance] = useState("");
  const handleSubmit = ({ deposit, contribution, year, rate }) => {
    const val = compundInterest(
      Number(deposit),
      Number(contribution),
      Number(year),
      Number(rate)
    );
    setBalance(val);
  };
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            year: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("ESCRIBI ALGO PAPI")
              .typeError("Aca va un numero BOBIIIIS"),
            contribution: Yup.number()
              .required("ESCRIBI ALGO PAPI")
              .typeError("Aca va un numero BOBIIIIS"),
            year: Yup.number()
              .required("ESCRIBI ALGO PAPI")
              .typeError("Aca va un numero BOBIIIIS"),
            rate: Yup.number()
              .required("ESCRIBI ALGO PAPI")
              .typeError("Aca va un numero BOBIIIIS")
              .min(0, "El valor minimo es CERO 0")
              .max(1, "El valor maximo es 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="Deposito Inicial" />
            <Input name="contribution" label="Contribucion Anual" />
            <Input name="year" label="Años" />
            <Input name="rate" label="Interes Estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== "" ? <Balance>Balance final: {balance} </Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
