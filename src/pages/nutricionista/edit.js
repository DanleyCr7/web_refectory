import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import api from "../../services/api";

import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#17871d",
    color: "#fff",
  },
  margin: {
    marginTop: 80,
    paddingLeft: 15,
  },

  textField: {
    width: "90%",
    marginBottom: "20px",
  },
});

export default function Update() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [rg, setRg] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    api.get(`/nutricionista/${id}`).then((data) => {
      console.log(data.data);
      const result = data.data;
      setName(result?.name);
      setEmail(result?.email);
      setCpf(result?.cpf);
      setPhone(result?.phone);
      setPassword(result?.password);
      setCity(result?.city);
      setRg(result?.rg);
      setState(result?.state);
    });
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    let data = event.target;

    api
      .put(`/admin/update/${id}`, {
        name: data?.name?.value,
        email: data?.email?.value,
        password: data?.password?.value,
        cpf: data?.cpf?.value,
        phone: data?.phone?.value,
        rg: data?.rg?.value,
        city: data?.city?.value,
        state: data?.state?.value,
      })
      .then(() => {
        history.push("/nutricionistas");
      });
  };

  return (
    <form onSubmit={submit}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Atualizar nutricionista
          </Typography>
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            name="name"
            label="Nome do nutricionista"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="cpf"
            name="cpf"
            label="CPF"
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="rg"
            name="rg"
            label="rg"
            value={rg}
            required
            onChange={(e) => setRg(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="password"
            name="password"
            label="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="state"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type="submit" className={classes.button}>
            Atualizar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
