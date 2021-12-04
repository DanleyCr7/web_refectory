import React, { useEffect, useState } from "react";
import { Student } from "../students";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/logo.png";
import api from "../../services/api";
import Snackbar from "../../components/snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

var QRCode = require("qrcode.react");
const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    backgroundPosition: "center 12%",
  },
  qrcode: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "4%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typografy: {
    marginTop: 12,
  },
}));

const Check = (_) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [helperText, setHelperText] = useState({
    resp: "",
    message: "",
  });
  const [circular, setCircular] = useState(false);
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [qrcode, setQrcode] = useState(false);
  const [pathCode, setPathCode] = useState("esperando");
  const [menu, setMenu] = useState({});

  useEffect(() => {
    api
      .get("/qrcode")
      .then((response) => {
        console.log(response.data);
        setPathCode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/menu")
      .then((resp) => {
        let menu = resp.data;
        setMenu(menu);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await api.get("/verificar_presenca");
        const data = await localStorage.getItem("ifpi@student");

        const student = JSON.parse(data);
        if (student.name !== response.data.id_student.name) {
          console.log(student.name);
          localStorage.setItem(
            "ifpi@student",
            JSON.stringify(response.data.id_student)
          );
          let name = response.data.id_student.name;
          MySwal.fire({
            title: (
              <p>
                {response.data.message} {name}
              </p>
            ),
            footer: "Controle de refeições",
            timer: 3000,
            didOpen: () => {
              // MySwal.clickConfirm();
            },
          });
          setQrcode(false);
        } else {
          setQrcode(false);
        }
      } catch (error) {
        console.log(error);
      }
      setCount(count + 1);
    }, 1000);
  }, [count]);

  const mensagem = () => {};
  const checkNumber = (value) => {
    if (value.trim() !== "") {
      const rule = /^[0-9]+$/;
      if (value.match(rule)) {
        setErr(false);
      } else {
        setErr(true);
      }
    }
  };

  const confirmReserve = (event) => {
    event.preventDefault();
    setCircular(true);
    const { value } = event.target.matricula;
    console.log(value);
    //essa requisação pega a matricula da API para seta na requisição de fazer a reserva
    api
      .post("/login", { code: value })
      .then((resp) => {
        let student = resp.data;
        console.log(student);
        if (student?.MATRICULA) {
          //faz a reserva do aluno
          api
            .post(`/menu/reserve/${menu?._id}`, { id: student?._id })
            .then(async (resp) => {
              console.log(resp.data);

              let message = resp.data?.message;
              //verifica se existe messagem da api com erro
              if (message) {
                setHelperText({ message: message, resp: "warning" });
                setCircular(false);
                setOpen(true);
              } else {
                //else se caso tiver dado tudo certo.

                setHelperText({
                  message: "Presença confirmada",
                  resp: "success",
                });
                setCircular(false);
                setOpen(true);
              }
            });
        } else {
          //esse else é da requição da matricula caso tenha sido informada errada ou não exista
          setHelperText({ message: "Erro na matricula", resp: "error" });
          setCircular(false);
          setOpen(true);
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        justifyContent="center"
        alignItems="center"
        item
        xs={false}
        sm={4}
        md={7}
        className={qrcode ? classes.qrcode : classes.image}
      ></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* QRCODE */}
          <QRCode renderAs="svg" value={pathCode} size={120} />
          {/* QRCODE */}

          <Typography className={classes.typografy} component="h1" variant="h5">
            Entrar no Refeitório
          </Typography>
          <form className={classes.form} onSubmit={confirmReserve} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricula"
              label="Matricula"
              name="matricula"
              autoComplete="matricula"
              autoFocus
              onKeyDown={(_) => checkNumber(value)}
              error={err}
            />
            {/* faz loading até receber resposta da API */}
            {circular ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirmar Presença
              </Button>
            )}
            <Snackbar
              open={open}
              setOpen={setOpen}
              variant={helperText.resp}
              msg={helperText.message}
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Check;
